import { checkDatabaseHealth } from "@coursepilot/database";
import type { RequestHandler } from "express";

import { checkRedisHealth } from "../../lib/redis.js";
import { createSuccessResponse } from "../../utils/api-response.js";

const serviceStartedAt = new Date();

export const getHealth: RequestHandler = (_request, response) => {
  response.status(200).json(
    createSuccessResponse({
      status: "ok",
      service: "coursepilot-api",
      uptimeSeconds: Math.floor(process.uptime()),
      startedAt: serviceStartedAt.toISOString(),
      timestamp: new Date().toISOString(),
    }),
  );
};

export const getReadiness: RequestHandler = async (_request, response) => {
  const [databaseHealth, redisHealth] = await Promise.all([
    checkDatabaseHealth(),
    checkRedisHealth(),
  ]);

  const ready = databaseHealth.healthy && redisHealth.healthy;

  response.status(ready ? 200 : 503).json(
    createSuccessResponse({
      status: ready ? "ready" : "not_ready",

      checks: {
        api: {
          healthy: true,
        },

        database: databaseHealth,

        redis: redisHealth,
      },

      timestamp: new Date().toISOString(),
    }),
  );
};
