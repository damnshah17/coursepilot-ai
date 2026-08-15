import { z } from "zod";

export const nodeEnvironmentSchema = z
  .enum(["development", "test", "production"])
  .default("development");

export const logLevelSchema = z
  .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
  .default("info");

export const redisUrlSchema = z
  .string()
  .trim()
  .url()
  .default("redis://localhost:6379");

export function formatEnvironmentError(error: z.ZodError): string {
  return JSON.stringify(z.treeifyError(error), null, 2);
}
