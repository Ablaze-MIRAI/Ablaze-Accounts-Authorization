import RedisClient from "ioredis";
import environment from "@/environment";

// eslint-disable-next-line no-undef
const globalForRedis = globalThis as unknown as {
  redis: RedisClient | undefined;
};

export const redis = globalForRedis.redis ?? new RedisClient("rediss://default:AbWKAAIncDE3MmQxMzVmODY5Zjk0ZGZmOGY1YzZkMjA2NTgwNWZiMnAxNDY0NzQ@intent-joey-46474.upstash.io:6379");

if(environment.NODE_ENV) globalForRedis.redis = redis;
