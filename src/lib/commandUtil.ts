import { CacheType, CommandInteraction } from "discord.js";

export function getOptionValue<T extends string | boolean | number | undefined>(
  options: CommandInteraction<CacheType>["options"],
  name: string,
  required: boolean = false
): T {
  return options.get(name, required)?.value as T;
}
