import "dotenv/config";

import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().max(65535).default(4000),

  API_PREFIX: z.string().trim().startsWith("/").default("/api"),

  WEB_ORIGIN: z.string().trim().url().default("http://localhost:5173"),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),

  DATABASE_URL: z.string().trim().min(1, "DATABASE_URL is required."),

  REDIS_URL: z.string().trim().url().default("redis://127.0.0.1:6379"),
});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  console.error("Invalid API environment configuration:");
  console.error(z.treeifyError(parsedEnvironment.error));

  throw new Error("API environment validation failed.");
}

export const env = parsedEnvironment.data;
