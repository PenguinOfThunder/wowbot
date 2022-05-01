// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";
import "dotenv/config";
import { commands } from "./commands";
import pino from "pino";

/***
 * This is the main entry point for the bot
 ***/

const { DISCORD_TOKEN: token, LOG_LEVEL: log_level } = process.env;

const logger = pino({
  name: "wowbot",
  level: log_level,
  crlf: process.platform === "win32",
});

// Flush logs at least every 10 seconds
setInterval(() => {
  logger.flush();
}, 10000).unref();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

process.once("exit", (code) => {
  if (code === 0) {
    logger.info("Shutting down cleanly with exit code=%d", code);
  } else {
    logger.fatal("Shutting down due to error with exit code=%d", code);
  }
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  logger.info("Ready");
});

client.on("error", (err) => {
  logger.error(err, "Discord error");
});

client.on("warn", (msg) => {
  logger.warn(msg, "Discord warning");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  try {
    const { commandName, user } = interaction;
    logger.info(
      `'%s' command used by '%s#%s' on guild '%s' (id: %s)`,
      commandName,
      user.username,
      user.discriminator,
      interaction.guild?.name,
      interaction.guildId
    );
    const cmd = commands.find((c) => c.data.name === commandName);
    if (cmd) {
      const childLogger = logger.child({
        commandName: commandName,
        userName: user.username,
        userDiscriminator: user.discriminator,
      });
      await cmd.execute(interaction, childLogger);
    } else {
      logger.error(
        "Command '%s' was not found. Do you need to redeploy the commands?",
        commandName
      );
    }
  } catch (err) {
    logger.error(err, "An unexpected error occurred");
    await interaction.reply("Oof. Something went wrong. Try again later.");
  } finally {
    logger.flush();
  }
});

// Login to Discord with your client's token
client.login(token);
