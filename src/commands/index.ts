import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { Logger, LoggerOptions } from "pino";
import directorsCommand from "./directors";
import moviesCommand from "./movies";
import wowCommand from "./wow";

export interface BotCommand {
  data: SlashCommandBuilder;
  execute: (
    interaction: CommandInteraction<CacheType>,
    logger: Logger<LoggerOptions>
  ) => void;
}

export const commands: BotCommand[] = [
  wowCommand,
  directorsCommand,
  moviesCommand,
];
