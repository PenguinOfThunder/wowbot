import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { Logger, LoggerOptions } from "pino";

export interface BotCommand {
  data: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction<CacheType>,
    logger: Logger<LoggerOptions>
  ) => Promise<void>;
}
