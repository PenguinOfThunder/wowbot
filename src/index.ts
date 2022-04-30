// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";
import "dotenv/config";
import * as wowApi from "./wowapi";

const { DISCORD_TOKEN: token } = process.env;

const wowToMarkdown = (wow: wowApi.Wow) => {
  // Pick first listed
  const videoUrl: string =
    wow.video["1080p"] ||
    wow.video["760p"] ||
    wow.video["480p"] ||
    wow.video["360p"] ||
    "";
  return (
    `> ${wow.full_line}` +
    `\n>\n> \u2015 Owen Wilson as *${wow.character}*` +
    ` in "${wow.movie}" (${wow.year})` +
    ` directed by ${wow.director}` +
    ` (${wow.timestamp}` +
    `, #${wow.current_wow_in_movie} of ${wow.total_wows_in_movie} wows in the movie` +
    `)\n` +
    `${videoUrl}`
  );
};

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "wow") {
    const wows = await wowApi.getRandom();
    await interaction.reply(wowToMarkdown(wows[0]));
  }
});

// Login to Discord with your client's token
client.login(token);
