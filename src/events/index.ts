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
    const evName = ev.name;
    if (ev.once) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-misused-promises
      client.once<any>(evName, ev.execute);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-misused-promises
      client.on<any>(evName, ev.execute);
    }
  });
};
