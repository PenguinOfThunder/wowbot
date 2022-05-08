import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { Logger, LoggerOptions } from "pino";

export interface BotCommand {
  data: SlashCommandBuilder;
  execute: (
    interaction: CommandInteraction<CacheType>,
    logger: Logger<LoggerOptions>
  ) => Promise<void>;
}
