"use server";

import { hashSync } from "bcrypt";
import { prisma } from "@/library/prisma";
import { generatePasswordPlaceFolder } from "@/library/keygenerator";
import { createSession } from "@/library/session";
import { redirect } from "next/navigation";

export const createAccount = async (github: { id: string, name: string, login: string, email: string, notification_email: string, avatar_url: string }) =>{
  const hashed_password = hashSync(generatePasswordPlaceFolder(), 15);

  const _user = await prisma.user.create({
    select: { uid: true },
    data: {
      screen_name: github.name,
      avatar: github.avatar_url,
      idp_email: {
        create: {
          email: github.notification_email,
          password: hashed_password,
          nopassword: true
        }
      },
      idp_github: {
        create: {
          githubid: String(github.id),
          username: github.name,
          userlogin: github.login
        }
      }
    }
  });

  redirect("/oauth2/github/done");
};

export const connectAccount = async (github: { id: string, name: string, login: string, email: string, avatar_url: string }) =>{
  const result = await prisma.$transaction(async (p) =>{
    const emailuser = await p.idpEmail.findUniqueOrThrow({ where: { email: github.email } });
    return await p.idpGitHub.create({
      data: {
        uid: emailuser.uid,
        githubid: String(github.id),
        username: github.name,
        userlogin: github.login
      }
    });
  });

  createSession(result.uid);

  redirect("/dashboard");
};

export const createSessionBySilentAction = async (uid: string) =>{
  console.log("###############Hello Action########################");
  await createSession(uid);
  redirect("/dashboard");
};
