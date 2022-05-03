import pino from "pino";

const { LOG_LEVEL: log_level } = process.env;

export const logger = pino(
  {
    name: "wowbot",
    level: log_level || "debug",
    crlf: process.platform === "win32"
  },
  pino.destination({
    sync: false,
    minLength: 4096
  })
);

// Flush logs at least every 10 seconds
setInterval(() => {
  logger.flush();
}, 10000).unref();
