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

