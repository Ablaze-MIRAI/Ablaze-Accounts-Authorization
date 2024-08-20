"use server";

import { randomBytes } from "crypto";
import { prisma } from "@/library/prisma";
import { o2google_setup_cookie } from "@/store/cookie/oauth2_google";

export const CreateAccountAction = async () =>{
  const payload = o2google_setup_cookie.verify();
  if(!payload?.email || !payload.guid) throw new Error("Payload Error");
  const username = "ユーザー";
  const iconname = randomBytes(16).toString("hex");
  const avatar_uri = `https://prettyavatars.com/api/beam/128/${iconname}?square`;

  try{
    await prisma.user.create({
      data: {
        screen_name: username,
        avatar: avatar_uri,
        idp_google: {
          create: {
            googleid: payload.guid,
            email: payload.guid
          }
        }
      }
    });
  }catch(e){
    return "error";
  }
};
