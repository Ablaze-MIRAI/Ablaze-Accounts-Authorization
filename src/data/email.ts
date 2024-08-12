import { prisma } from "@/library/prisma";

export const checkExistsUser = async (email: string): Promise<boolean> =>{
  const isExist = !!await prisma.idpEmail.findUnique({
    select: { id: true },
    where: { email: email }
  });

  return isExist;
};

export const createUserWithEmail = async (email: string, hashed_password: string) =>{
  const name = email.split("@")[0];
  const avatar = `https://prettyavatars.com/api/beam/128/${name}?square`;

  return await prisma.user.create({
    data: {
      screen_name: "ユーザー",
      avatar: avatar,
      idp_email: {
        create: {
          email: email,
          password: hashed_password
        }
      }
    }
  });
};

export const getUserWithEmail = async (email: string) =>{
  return await prisma.idpEmail.findUnique({
    where: { email: email },
    select: {
      password: true,
      uid: true
    }
  });
};
