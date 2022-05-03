// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";
import "dotenv/config";
import { registerEvents } from "./events";
import { logger } from "./logger";

/***
 * This is the main entry point for the bot
 ***/

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Add shutdown handler
process.once("exit", (code) => {
  if (code === 0) {
    logger.info("Shutting down cleanly with exit code=%d", code);
  } else {
    logger.fatal("Shutting down due to error with exit code=%d", code);
  }
  client.destroy();
});

// Configure Discord events
registerEvents({ logger, client });

// Login to Discord with your client's token
const { DISCORD_TOKEN: token } = process.env;
if (!token) {
  throw new Error("Missing DISCORD_TOKEN!");
}
client.login(token);
