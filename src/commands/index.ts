import type { BotCommand } from "../types/global";
import directorsCommand from "./directors";
import moviesCommand from "./movies";
import wowCommand from "./wow";

export const commands: BotCommand[] = [
  wowCommand,
  directorsCommand,
  moviesCommand
];
