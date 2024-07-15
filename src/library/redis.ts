import RedisClient from "ioredis";
import environment from "@/environment";

// eslint-disable-next-line no-undef
const globalForRedis = globalThis as unknown as {
  redis: RedisClient | undefined;
};

export const redis = globalForRedis.redis ?? new RedisClient(environment.REDIS_CONNECTION);

if(environment.NODE_ENV) globalForRedis.redis = redis;
