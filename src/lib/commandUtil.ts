import {
  CacheType,
  ChatInputCommandInteraction,
  CommandInteractionOption
} from "discord.js";

export function getOptionValue<
  T extends CommandInteractionOption<CacheType>["value"] | null
>(
  options: ChatInputCommandInteraction<CacheType>["options"],
  name: string,
  required = false
): T {
  return options.get(name, required)?.value as T;
}
