import type { SlashCommandBuilder } from "@discordjs/builders";
import type {
  Awaitable,
  CacheType,
  ClientEvents,
  CommandInteraction
} from "discord.js";
import type { Logger, LoggerOptions } from "pino";

export type BotConfig = {
  DISCORD_CLIENT_ID?: string;
  DISCORD_GUILD_ID?: string;
  DISCORD_TOKEN: string;
};

export interface BotCommand {
  data: SlashCommandBuilder;
  execute: (
    interaction: CommandInteraction<CacheType>,
    logger: Logger<LoggerOptions>
  ) => Promise<void>;
}

export interface BotEvent<K extends keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute: (...args: ClientEvents[K]) => Awaitable<void>;
}

export type BotEvents = Array<BotEvent<never>>;