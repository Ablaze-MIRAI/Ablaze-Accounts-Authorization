import { prisma } from "@/library/prisma";
import { redis } from "@/library/redis";
import { TokenHash } from "@/library/safety";
import type { UserSession } from "@/typings/session";

const session_store_prefix = "_session";
const session_expires = 60*60*2;

export const getUserSession = async (key: string): Promise<UserSession | undefined> =>{
  const hashed_key = TokenHash(key);
  const user = await redis.hgetall(`${session_store_prefix}_${hashed_key}`);
  if(Object.keys(user).length === 0) return undefined;
  await redis.expire(`${session_store_prefix}_${hashed_key}`, session_expires);

  return user as UserSession;
};

export const createSessionDTO = async () =>{

};

export const getRestoreToken = async (restore_token: string) =>{
  return await prisma.restoreToken.findUnique({
    where: { token: restore_token },
    select: {
      id: true,
      updatedAt: true,
      uid: true,
      user: {
        select: {
          screen_name: true,
          avatar: true,
          account_type: true
        }
      }
    }
  });
};

export const updateRestoreToken = async (token: string, newtoken: string) =>{
  try{
    return await prisma.restoreToken.update({
      where: { token: token },
      data: { token: newtoken }
    });
  }catch(e){
    return undefined;
  }
};

export const getUserByUid = async (uid: string) =>{
  return await prisma.user.findUnique({
    where: { uid: uid }
  });
};
