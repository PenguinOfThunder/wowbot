// Require the necessary discord.js classes
import { CacheType, Client, CommandInteraction, Intents } from "discord.js";
import "dotenv/config";
import * as wowApi from "./wowapi";

const { DISCORD_TOKEN: token } = process.env;

const wowToMarkdown = (wow: wowApi.Wow): string => {
  // Pick first listed
  const videoUrl: string =
    wow.video["1080p"] ||
    wow.video["760p"] ||
    wow.video["480p"] ||
    wow.video["360p"] ||
    "";
  return (
    `> ${wow.full_line}` +
    `\n> \n> \u2015 Owen Wilson as *${wow.character}*` +
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
  try {
    const { commandName, user } = interaction;
    console.log(`${commandName} command issued by ${user.username}`);
    if (commandName === "wow") {
      await handleWowCommand(interaction);
    } else if (commandName === "movies") {
      await handleMoviesCommand(interaction);
    } else if (commandName === "directors") {
      await handleDirectorsCommand(interaction);
    } else {
      interaction.reply("What?");
    }
  } catch (err) {
    console.error(err);
    await interaction.reply("Oof. Something went wrong. Try again later.");
  }
});

// Login to Discord with your client's token
client.login(token);

async function handleDirectorsCommand(
  interaction: CommandInteraction<CacheType>
) {
  const list = await wowApi.getDirectors();
  await interaction.reply(
    `Directors:\n${list.map((director) => `- ${director}`).join("\n")}`
  );
}

async function handleMoviesCommand(interaction: CommandInteraction<CacheType>) {
  const list = await wowApi.getMovies();
  await interaction.reply(
    `Movies:\n${list.map((movie) => `- ${movie}`).join("\n")}`
  );
}

async function handleWowCommand(interaction: CommandInteraction<CacheType>) {
  const opts = interaction.options;
  const wows = await wowApi.getRandom({
    director: opts.getString("director"),
    movie: opts.getString("movie"),
    year: opts.getInteger("year"),
    results: opts.getInteger("results"),
    wow_in_movie: opts.getInteger("occurrence"),
    sort: "release_date",
    direction: "asc",
  });
  if (!wows || wows.length === 0) {
    await interaction.reply(
      "Sorry, I couldn't find anything that matched those criteria."
    );
  } else {
    const content = wows.map((wow) => wowToMarkdown(wow)).join("\n\n");
    await interaction.reply(content);
  }
}
