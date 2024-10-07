"use server";

import { redirect } from "next/navigation";
import { deleteSession, getSession } from "@/library/session";
import { getUserConnectedApplicationByRestoreID } from "@/data/session";
import { signToken } from "@/library/jwt";
import oauth2application from "@/oauth2application";

type LogoutUrlsPayload = {
  logout: string[]
}

export const SignoutAction = async () =>{
  const user = await getSession(false);
  if(!user) redirect("/");

  const activesessions = await getUserConnectedApplicationByRestoreID(user.id);
  if(!activesessions || activesessions.length < 1){
    await deleteSession();
    redirect("/signout");
  }

  // ToDo: Fix oauth2apllications type (logout nullable)
  const activeclients = activesessions.map(v => v.client_id);
  const haslogout_activeclient = activeclients.filter(v => !!oauth2application[v].logout);
  const payload: LogoutUrlsPayload = {
    logout: haslogout_activeclient.map(v => oauth2application[v].logout ?? "")
  };

  const signed_urls = signToken(payload, user.uid, activeclients);

  await deleteSession();

  if(payload.logout.length <= 0){
    redirect("/signout");
  }

  redirect(`${payload.logout[0]}?urls=${signed_urls}`);
};
