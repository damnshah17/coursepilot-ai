import { createRedisConnection } from "@coursepilot/queue";

import { env } from "../config/env.js";
import { logger } from "./logger.js";

export const redis = createRedisConnection(env.REDIS_URL, {
  connectionName: "coursepilot-api",
  maxRetriesPerRequest: 1,
});

redis.on("error", (error) => {
  logger.error(
    {
      err: error,
    },
    "API Redis connection error.",
  );
});

export async function connectRedis(): Promise<void> {
  if (redis.status === "wait") {
    await redis.connect();
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redis.status === "end") {
    return;
  }

  await redis.quit();
}

export interface RedisHealthResult {
  healthy: boolean;
  latencyMs: number;
  error?: string;
}

export async function checkRedisHealth(): Promise<RedisHealthResult> {
  const startedAt = performance.now();

  try {
    await connectRedis();
    const response = String(await redis.ping());

    if (response !== "PONG") {
      throw new Error(`Unexpected Redis response: ${response}`);
    }

    return {
      healthy: true,
      latencyMs: Math.round(performance.now() - startedAt),
    };
  } catch (error) {
    return {
      healthy: false,
      latencyMs: Math.round(performance.now() - startedAt),
      error:
        error instanceof Error
          ? error.message
          : "Unknown Redis health-check error.",
    };
  }
}
