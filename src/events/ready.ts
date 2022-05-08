import type { Logger } from "pino";
import { getRandom } from "../wowapi";
import type { BotEvent } from "../types/global";
import { Client } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import { PresenceUpdateStatus } from "discord-api-types/v10";
import { generateDependencyReport } from "@discordjs/voice";

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
  const randomMovie = (await getRandom({}))[0];
  client.user?.setPresence({
    status: PresenceUpdateStatus.Online,
    activities: [
      {
        name: randomMovie.movie,
        type: ActivityTypes.WATCHING
      }
    ]
  });
  logger.debug(
    "Set presence to %s. Activity: %s %s",
    client.user?.presence.status,
    client.user?.presence.activities[0].type,
    client.user?.presence.activities[0].name
  );
};

export default ({ logger }: { logger: Logger }): BotEvent<"ready"> => ({
  name: "ready",
  once: true,
  execute: async (client) => {
    logger.info("Ready on %d guilds", client.guilds.cache.size);
    logger.debug(generateDependencyReport());
    try {
      await watchRandomMovie({ client, logger });
      // switch movies every two hours
      setInterval(() => {
        void watchRandomMovie({ client, logger });
      }, 2 * 60 * 60 * 1000);
    } catch (err) {
      logger.warn(err, "Failed to set set presence");
    }
  }
});
