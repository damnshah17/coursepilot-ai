import { Worker } from "bullmq";

import { createRedisConnection, QUEUE_NAMES } from "@coursepilot/queue";

import { env } from "./config/env.js";
import { logger } from "./logger.js";

const redisConnection = createRedisConnection(env.REDIS_URL);

const documentWorker = new Worker(
  QUEUE_NAMES.DOCUMENT_INGESTION,
  (job) => {
    logger.info(
      {
        jobId: job.id,
        jobName: job.name,
      },
      "Received document-ingestion job.",
    );

    return Promise.resolve({
      processed: true,
      processedAt: new Date().toISOString(),
    });
  },
  {
    connection: redisConnection,
    concurrency: env.WORKER_CONCURRENCY,
  },
);

documentWorker.on("completed", (job) => {
  logger.info(
    {
      jobId: job.id,
      jobName: job.name,
    },
    "Background job completed.",
  );
});

documentWorker.on("failed", (job, error) => {
  logger.error(
    {
      jobId: job?.id,
      jobName: job?.name,
      err: error,
    },
    "Background job failed.",
  );
});

documentWorker.on("error", (error) => {
  logger.error(
    {
      err: error,
    },
    "Worker connection error.",
  );
});

async function start(): Promise<void> {
  try {
    await documentWorker.waitUntilReady();

    logger.info(
      {
        queue: QUEUE_NAMES.DOCUMENT_INGESTION,
        concurrency: env.WORKER_CONCURRENCY,
      },
      "CoursePilot worker is ready.",
    );
  } catch (error) {
    logger.fatal(
      {
        err: error,
      },
      "Failed to start CoursePilot worker.",
    );

    process.exit(1);
  }
}

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  logger.info(
    {
      signal,
    },
    "Worker shutdown signal received.",
  );

  try {
    await documentWorker.close();
    await redisConnection.quit();

    logger.info("Worker stopped successfully.");
    process.exit(0);
  } catch (error) {
    logger.error(
      {
        err: error,
      },
      "Worker shutdown failed.",
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
    "Uncaught worker exception.",
  );

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.fatal(
    {
      reason,
    },
    "Unhandled worker promise rejection.",
  );

  process.exit(1);
});

await start();