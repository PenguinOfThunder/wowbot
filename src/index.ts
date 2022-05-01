// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";
import "dotenv/config";
import { commands } from "./commands";

/***
 * This is the main entry point for the bot
 ***/

const { DISCORD_TOKEN: token } = process.env;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  try {
    const { commandName, user } = interaction;
    console.log(`${commandName} command issued by ${user.username}`);
    for (const cmd of commands) {
      if (cmd.data.name === commandName) {
        await cmd.execute(interaction);
        break;
      }
    }
  } catch (err) {
    console.error(err);
    await interaction.reply("Oof. Something went wrong. Try again later.");
  }
});

// Login to Discord with your client's token
client.login(token);
