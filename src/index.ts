// Require the necessary discord.js classes
import { Client, IntentsBitField } from "discord.js";
import "dotenv/config";
import { registerEvents } from "./events";
import { logger } from "./logger";

/***
 * This is the main entry point for the bot
 ***/

// Create a new client instance
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildVoiceStates // REQUIRED for voice function
  ]
});

// Add shutdown handler
process.once("exit", (code) => {
  if (code === 0) {
    logger.info("Shutting down cleanly with exit code=%d", code);
  } else {
    logger.fatal("Shutting down due to error with exit code=%d", code);
  }
  void client.destroy();
});

// Configure Discord events
registerEvents({ logger, client });

// Login to Discord with your client's token
const { DISCORD_TOKEN: token } = process.env;
if (!token) {
  throw new Error("Missing DISCORD_TOKEN!");
}

// Top-level await needs wrapped in an immediately invoked function expression (IIFE)
void (async () => {
  try {
    logger.info("Attempting login");
    // login returns immediately, but other promises are pending that keep the process alive
    await client.login(token);
  } catch (err) {
    logger.error(err, "Login error");
    throw err; // rethrow
  }
})();
