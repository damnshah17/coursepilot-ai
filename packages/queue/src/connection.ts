import { Redis, type RedisOptions } from "ioredis";

const defaultRedisOptions: RedisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  lazyConnect: true,
};

export function createRedisConnection(
  redisUrl: string,
  options: RedisOptions = {},
): Redis {
  return new Redis(redisUrl, {
    ...defaultRedisOptions,
    ...options,
  });
}
