import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { getMovies } from "../wowapi";

export const data = new SlashCommandBuilder()
  .setName("movies")
  .setDescription("Return a list of movies with wows");

export async function execute(interaction: CommandInteraction<CacheType>) {
  const list = await getMovies();
  await interaction.reply(
    `Movies:\n${list.map((movie) => `- ${movie}`).join("\n")}`
  );
}
