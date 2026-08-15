import "dotenv/config";

import {
  formatEnvironmentError,
  logLevelSchema,
  nodeEnvironmentSchema,
  redisUrlSchema,
} from "@coursepilot/config";
import { z } from "zod";

const workerEnvironmentSchema = z.object({
  NODE_ENV: nodeEnvironmentSchema,
  LOG_LEVEL: logLevelSchema,
  REDIS_URL: redisUrlSchema,
  WORKER_CONCURRENCY: z.coerce.number().int().positive().max(20).default(2),
});

const parsedEnvironment = workerEnvironmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  console.error("Invalid worker environment configuration:");
  console.error(formatEnvironmentError(parsedEnvironment.error));

  throw new Error("Worker environment validation failed.");
}

export const env = parsedEnvironment.data;
