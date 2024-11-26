import { SlashCommandBuilder } from "@discordjs/builders";
import { getOptionValue } from "../lib/commandUtil";
import { joinUpTo } from "../lib/joinUpTo";
import type { BotCommand } from "../types";
import type { Wow, WowApiRequest } from "../wowapi";
import { getRandom } from "../wowapi";
/**
 * Format a Wow suitable to send in a reply
 * @param wow The Wow data
 * @returns message formatted in Discord Markdown
 */
export function wowToMarkdown(wow: Wow): string {
  // Pick first format listed
  const videoUrl: string =
    wow.video?.["1080p"] ||
    wow.video?.["720p"] ||
    wow.video?.["480p"] ||
    wow.video?.["360p"] ||
    "";
  return (
    (wow.full_line ? `> ${wow.full_line}` : "") +
    `\n> \n> \u2015 Owen Wilson` +
    (wow.character ? ` as *${wow.character}*` : "") +
    (wow.movie ? ` in "${wow.movie}"` : "") +
    (wow.year ? ` (${wow.year})` : "") +
    (wow.director ? ` directed by ${wow.director}` : "") +
    (wow.timestamp || wow.current_wow_in_movie
      ? " (" +
        (wow.timestamp ? `${wow.timestamp}, ` : "") +
        (wow.current_wow_in_movie && wow.total_wows_in_movie
          ? `#${wow.current_wow_in_movie} of ${wow.total_wows_in_movie} wows in the movie`
          : "") +
        `)`
      : "") +
    `\n${videoUrl}`
  );
}

const command: BotCommand = {
  data: new SlashCommandBuilder()
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
    )
    .addStringOption((option) =>
      option
        .setName("sort_field")
        .setDescription("order results by this field")
        .addChoices(
          { name: "Movie", value: "movie" },
          { name: "Release date", value: "release_date" },
          { name: "Year", value: "year" },
          { name: "Director", value: "director" },
          { name: "Occurrence", value: "number_current_wow" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("sort_direction")
        .setDescription("order results ascending or descending")
        .addChoices(
          { name: "Ascending", value: "asc" },
          { name: "Descending", value: "desc" }
        )
    ) as SlashCommandBuilder,
  execute: async function (interaction, logger) {
    const opts = interaction.options;

    const requestParams: WowApiRequest = {
      director: getOptionValue(opts, "director"),
      movie: getOptionValue(opts, "movie"),
      year: getOptionValue(opts, "year"),
      results: getOptionValue(opts, "results"),
      wow_in_movie: getOptionValue(opts, "occurrence"),
      sort: (getOptionValue(opts, "sort_field") ||
        "year"),
      direction:
        getOptionValue(opts, "sort_direction") === "desc" ? "desc" : "asc"
    };
    logger.debug(requestParams, "Executing request for random wow");
    const wows = await getRandom(requestParams);
    if (!wows || wows.length === 0) {
      logger.debug("Found no results, informing user");
      await interaction.reply({
        content: "Sorry, I couldn't find anything that matched those criteria.",
        ephemeral: true
      });
    } else {
      // Send text reply
      const content = joinUpTo(
        wows.map((wow) => wowToMarkdown(wow)),
        "\n\n",
        2000 // max number of characters Discord allows in a reply
      );
      logger.debug("Sending reply to user", content);
      await interaction.reply(content);
    }
  }
};

export default command;
