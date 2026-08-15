import "./config/env.js";

import type { Server } from "node:http";

import { disconnectDatabase } from "@coursepilot/database";

import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { connectRedis, disconnectRedis } from "./lib/redis.js";

let server: Server | undefined;
let shuttingDown = false;

async function startServer(): Promise<void> {
  await connectRedis();

  server = app.listen(env.PORT, () => {
    logger.info(
      {
        port: env.PORT,
        environment: env.NODE_ENV,
        apiPrefix: env.API_PREFIX,
      },
      `CoursePilot API is running at http://localhost:${env.PORT}${env.API_PREFIX}`,
    );
  });
}

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  logger.info(
    {
      signal,
    },
    "Shutdown signal received.",
  );

  const forceShutdownTimer = setTimeout(() => {
    logger.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10_000);

  forceShutdownTimer.unref();

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server?.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }

    await Promise.all([disconnectDatabase(), disconnectRedis()]);

    clearTimeout(forceShutdownTimer);

    logger.info("API server stopped successfully.");
    process.exit(0);
  } catch (error) {
    logger.error(
      {
        err: error,
      },
      "API server shutdown failed.",
    );

    process.exit(1);
  }
}

process.on("SIGINT", (signal) => {
  void shutdown(signal);
});

process.on("SIGTERM", (signal) => {
  void shutdown(signal);
});

process.on("uncaughtException", (error) => {
  logger.fatal(
    {
      err: error,
    },
    "Uncaught exception.",
  );

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.fatal(
    {
      reason,
    },
    "Unhandled promise rejection.",
  );

  process.exit(1);
});

void startServer().catch((error: unknown) => {
  logger.fatal(
    {
      err: error,
    },
    "API startup failed.",
  );

  process.exit(1);
});
