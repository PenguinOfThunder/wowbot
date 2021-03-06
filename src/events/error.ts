import type { Logger } from "pino";
import type { BotEvent } from "../types/BotEvent";

export default ({ logger }: { logger: Logger }): BotEvent<"error"> => ({
  name: "error",
  execute: (err) => {
    logger.error(err, "Discord error");
  }
});
