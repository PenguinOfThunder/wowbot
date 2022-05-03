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
  ) => void;
}

export interface BotEvent<K extends keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute: (...args: ClientEvents[K]) => Awaitable<void>;
}

export interface BotEvents extends Array<BotEvent<any>> {}
