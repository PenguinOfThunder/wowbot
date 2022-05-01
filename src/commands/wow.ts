import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { joinUpTo } from "../lib/joinUpTo";
import { getRandom, Wow } from "../wowapi";

export const data = new SlashCommandBuilder()
  .setName("wow")
  .setDescription("Replies with wow!")
  .addStringOption((option) =>
    option
      .setName("director")
      .setDescription("Pick from movies by a specific director")
  )
  .addStringOption((option) =>
    option.setName("movie").setDescription("Pick from a specific movie")
  )
  .addIntegerOption((option) =>
    option
      .setName("occurrence")
      .setDescription("The number of the occurrence in the movie")
      .setMinValue(1)
      .setMaxValue(10)
  )
  .addIntegerOption((option) =>
    option
      .setName("results")
      .setDescription("Number of wows to return")
      .setMinValue(1)
      .setMaxValue(100)
  )
  .addIntegerOption((option) =>
    option
      .setName("year")
      .setDescription("Pick from a specific year")
      .setMinValue(1996)
  ) as SlashCommandBuilder;

export async function execute(interaction: CommandInteraction<CacheType>) {
  const opts = interaction.options;
  const wows = await getRandom({
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
    const content = joinUpTo(
      wows.map((wow) => wowToMarkdown(wow)),
      "\n\n",
      2000 // max number of characters Discord allows in a reply
    );
    await interaction.reply(content);
  }
}

/**
 * Format a Wow suitable to send in a reply
 * @param wow The Wow data
 * @returns message formatted in Discord Markdown
 */
export function wowToMarkdown(wow: Wow): string {
  // Pick first format listed
  const videoUrl: string =
    wow.video["1080p"] ||
    wow.video["720p"] ||
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
}
