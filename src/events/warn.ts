import type { Logger } from "pino";
import type { BotEvent } from "../types";

export default ({ logger }: { logger: Logger }): BotEvent<"warn"> => ({
  name: "warn",
  execute: (err) => {
    logger.warn(err, "Discord error");
  }
});
