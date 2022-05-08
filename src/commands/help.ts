import { SlashCommandBuilder } from "@discordjs/builders";
import type { BotCommand } from "../types/global";
import { commands } from "."; // yes, it works
import { joinUpTo } from "../lib/joinUpTo";

const helpCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show help on all bot commands"),

  execute: async function (interaction, logger) {
    logger.debug("Help command issued");
    const reply = joinUpTo(
      commands.map((c) => `**/${c.data.name}:** ${c.data.description}`),
      "\n",
      2000
    );
    await interaction.reply(reply);
  }
};

export default helpCommand;
