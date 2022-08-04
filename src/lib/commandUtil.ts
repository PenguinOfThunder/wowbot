import {
  CacheType,
  CommandInteraction,
  CommandInteractionOption
} from "discord.js";

export function getOptionValue<
  T extends CommandInteractionOption<CacheType>["value"] | null
>(
  options: CommandInteraction<CacheType>["options"],
  name: string,
  required = false
): T {
  return options.get(name, required)?.value as T;
}
