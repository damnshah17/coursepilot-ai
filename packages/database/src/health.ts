import { database } from "./client.js";

export interface DatabaseHealthResult {
  healthy: boolean;
  latencyMs: number;
  error?: string;
}

export async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  const startedAt = performance.now();

  try {
    await database.$queryRaw`SELECT 1`;

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
          : "Unknown database health-check error.",
    };
  }
}

export async function disconnectDatabase(): Promise<void> {
  await database.$disconnect();
}
