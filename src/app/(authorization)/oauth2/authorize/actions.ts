"use server";

import { createAcceptApp, createOAuth2Code } from "@/data/oauth2";
import { deleteSession, getSession } from "@/library/session";
import type { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";

// ToDo: 余分な引数の削除
export const doAcceptApp = async (_uid: string, cid: string, scope: string, client_type: $Enums.ClientType) =>{
  const session = await getSession();
  if(!session) throw new Error("Not signed");

  await createAcceptApp(session.uid, cid);
  return await createOAuth2Code(session.uid, cid, scope, client_type);
};

export const SignoutAction = async () =>{
  await deleteSession();
  redirect("/");
};
