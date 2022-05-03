import { SlashCommandBuilder } from "@discordjs/builders";
import { BotCommand } from ".";
import { getDirectors } from "../wowapi";

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("directors")
    .setDescription("Return a list of directors who made movies with wows"),
  execute: async function (interaction, logger) {
    logger.debug("Getting list of directors");
    const list = await getDirectors();
    await interaction.reply(
      `Directors:\n${list
        .sort((a, b) => a.localeCompare(b))
        .map((director) => `- ${director}`)
        .join("\n")}`
    );
  },
};

export default command;
