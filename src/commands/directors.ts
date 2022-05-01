import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { getDirectors } from "../wowapi";

export const data = new SlashCommandBuilder()
  .setName("directors")
  .setDescription("Return a list of directors who made movies with wows");

export async function execute(interaction: CommandInteraction<CacheType>) {
  const list = await getDirectors();
  await interaction.reply(
    `Directors:\n${list.map((director) => `- ${director}`).join("\n")}`
  );
}
