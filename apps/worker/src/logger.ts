import pino, { type LoggerOptions } from "pino";

import { env } from "./config/env.js";

const baseOptions: LoggerOptions = {
  level: env.LOG_LEVEL,
  base: {
    service: "coursepilot-worker",
  },
  redact: {
    paths: ["password", "refreshToken", "accessToken", "apiKey"],
    censor: "[REDACTED]",
  },
};

const developmentOptions: LoggerOptions =
  env.NODE_ENV === "development"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      }
    : {};

export const logger = pino({
  ...baseOptions,
  ...developmentOptions,
});
