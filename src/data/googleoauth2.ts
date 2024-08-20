import { prisma } from "@/library/prisma";

export const getUserByGoogleUid = async (uid: string) =>{
  return await prisma.idpGoogle.findUnique({
    where: { googleid: uid },
    select: {
      user: {
        select: {
          uid: true
        }
      }
    }
  });
};
