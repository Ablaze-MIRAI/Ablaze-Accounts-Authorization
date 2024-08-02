import { prisma } from "@/library/prisma";

export const updateUserProfile = async (uid:string, username: string) =>{
  await prisma.user.update({
    where: { uid: uid },
    data: { screen_name: username }
  });

  return "success";
};

export const getActiveSession = async (uid: string, limit: number) =>{
  return await prisma.restoreToken.findMany({
    where: { uid: uid },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      updatedAt: true,
      createdAt: true,
      ip: true,
      device: true,
      browser: true
    }
  });
};

export const getSessionInfoById = async (uid: string, sessionid: string) =>{
  return await prisma.restoreToken.findUnique({
    where: { uid: uid, id: sessionid },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      ip: true,
      device: true,
      browser: true
    }
  });
};

export const deleteAllSessionDto = async (uid: string, nowsession: string) =>{
  return await prisma.restoreToken.deleteMany({
    where: {
      AND: {
        uid: uid,
        id: {
          not: nowsession
        }
      }
    }
  });
};
