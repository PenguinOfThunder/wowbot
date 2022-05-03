import { SlashCommandBuilder } from "@discordjs/builders";
import { BotCommand } from ".";
import { getMovies } from "../wowapi";

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("movies")
    .setDescription("Return a list of movies with wows"),
  execute: async function (interaction, logger) {
    logger.debug("Getting list of movies");
    const list = await getMovies();
    await interaction.reply(
      `Movies:\n${list
        .sort((a, b) => a.localeCompare(b))
        .map((movie) => `- ${movie}`)
        .join("\n")}`
    );
  },
};

export default command;
