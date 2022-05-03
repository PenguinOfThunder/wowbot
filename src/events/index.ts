import { Client } from "discord.js";
import type { Logger } from "pino";
import { commands } from "../commands";
import error from "./error";
import interactionCreate from "./interactionCreate";
import ready from "./ready";
import warn from "./warn";

export const registerEvents = ({
  logger,
  client
}: {
  logger: Logger;
  client: Client<boolean>;
}): void => {
  [
    ready({ logger }),
    warn({ logger }),
    error({ logger }),
    interactionCreate({ logger, commands })
  ].forEach((ev) => {
    if (ev.once) {
      client.once(ev.name, ev.execute);
    } else {
      client.on(ev.name, ev.execute);
    }
  });
};
