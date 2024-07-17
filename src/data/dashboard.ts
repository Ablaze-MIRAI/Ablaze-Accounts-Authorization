import { prisma } from "@/library/prisma";

export const updateUserProfile = async (uid:string, username: string) =>{
  await prisma.user.update({
    where: { uid: uid },
    data: { screen_name: username }
  });

  return "success";
};
