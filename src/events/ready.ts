import type { Logger } from "pino";
import { getRandom } from "../wowapi";
import type { BotEvent } from "../types/global";
import { Client } from "discord.js";

/**
 * Pick a random movie to watch and set the status to that.
 */
const watchRandomMovie = async ({
  client,
  logger
}: {
  client: Client<boolean>;
  logger: Logger;
}) => {
  const randomMovie = (await getRandom({}))[0].movie;
  client.user.setPresence({
    status: "online",
    activities: [{ name: randomMovie, type: "WATCHING" }]
  });
  logger.debug("Set presence to 'watching %s'", randomMovie);
};

export default ({ logger }: { logger: Logger }): BotEvent<"ready"> => ({
  name: "ready",
  once: true,
  execute: async (client) => {
    logger.info("Ready");
    try {
      watchRandomMovie({ client, logger });
      // switch movies every two hours
      setInterval(() => {
        watchRandomMovie({ client, logger });
      }, 2 * 60 * 60 * 1000);
    } catch (err) {
      logger.warn(err, "Failed to set set presence");
    }
  }
});
