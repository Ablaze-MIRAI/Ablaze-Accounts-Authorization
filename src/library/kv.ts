import { redis } from "./redis";

export const createHashWithExpire = async (prefix: string, key: string, expire: number, hash: object): Promise<string> =>{
  const r1 = await redis.hmset(`${prefix}_${key}`, hash);
  const r2 = await redis.expire(`${prefix}_${key}`, expire);
  return `${r1}/${r2}`;
};

export const createHash = async (prefix: string, key: string, hash: object) =>{
  return await redis.hmset(`${prefix}_${key}`, hash);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHash = async (prefix: string, key: string): Promise<any | undefined> =>{
  const result = await redis.hgetall(`${prefix}_${key}`);
  if(Object.keys(result).length === 0) return undefined;
  return result;
};

export const deleteKey = async (prefix: string, key: string) =>{
  return await redis.del(`${prefix}_${key}`);
};
