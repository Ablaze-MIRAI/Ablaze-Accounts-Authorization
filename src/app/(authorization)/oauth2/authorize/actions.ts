"use server";

import { createAcceptApp, createOAuth2Code } from "@/data/oauth2";
import { deleteSession } from "@/library/session";
import type { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";

export const doAcceptApp = async (uid: string, cid: string, scope: string, client_type: $Enums.ClientType) =>{
  await createAcceptApp(uid, cid);
  return await createOAuth2Code(uid, cid, scope, client_type);
};

export const SignoutAction = async () =>{
  await deleteSession();
  redirect("/");
};
