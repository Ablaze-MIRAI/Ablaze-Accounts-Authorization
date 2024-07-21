import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";
import UAParserJS from "ua-parser-js";
import environment from "@/environment";
import { prisma } from "@/library/prisma";
import { createHashWithExpire, deleteKey } from "@/library/kv";
import { getUserSession } from "@/data/session";
import { withContinue } from "./utils";
import type { $Enums } from "@prisma/client";

const session_cookie_key = "_next_session_id";
const restore_cookie_key = "_next_restore_token";
const session_store_prefix = "_session";
const session_expires = 60*60*3;
const restore_expires = 60*60*24*60;

type Session = {
  uid: string,
  name: string,
  avatar: string,
  role: $Enums.AccountType
}

const generateSessionId = () => randomBytes(32).toString("hex");
const generateRestoreToken = () => randomBytes(64).toString("hex");

/* ServerComponents = Readonly cookie */
export const getSession = cache(async (autoredirect: boolean = true): Promise<Session | undefined> =>{
  const continue_uri = headers().get("x-next-request-uri");
  const session_restore = headers().get("x-session-restore");
  // ToDo: コメントアウト削除
  //console.log(session_restore ? "[CP] RESTORED": "[CP] NOT FOUND RESTORE");
  //console.log(session_restore);
  if(session_restore) return JSON.parse(session_restore);

  const sessionid = cookies().get(environment.COOKIE_SESSION_NAME)?.value;
  if(!sessionid){
    if(!autoredirect) return undefined;
    return redirect(withContinue("/signin", continue_uri));
  }

  const session = await getUserSession(sessionid);
  if(!session){
    if(!autoredirect) return undefined;
    return redirect(withContinue("/signin", continue_uri));
  }

  return session;
});

/* ServerAction = Writable cookies */
export const createSession = async (uid: string) =>{
  const user = await prisma.user.findUnique({ select: { screen_name: true, avatar: true, account_type: true }, where: { uid: uid } });
  if(!user) throw new Error("Not found user");

  const ip = headers().get("x-forwarded-for");
  const ua = headers().get("User-Agent");
  const parsedua = new UAParserJS(ua ?? "");
  const os = parsedua.getOS();
  const browser = parsedua.getBrowser();

  const restore_token = generateRestoreToken();
  await prisma.restoreToken.create({
    data: {
      token: restore_token,
      uid: uid,
      ip: ip,
      device: (os.name && os.version) ? `${os.name} ${os.version}` : undefined,
      browser: (browser.name && browser.version) ? `${browser.name}/${browser.version}` : undefined
    }
  });

  const session: Session = {
    uid: uid,
    name: user.screen_name,
    avatar: user.avatar,
    role: user.account_type
  };

  const sessionid = generateSessionId();
  await createHashWithExpire(session_store_prefix, sessionid, session_expires, session);

  cookies().set(restore_cookie_key, restore_token, {
    path: "/",
    httpOnly: true,
    maxAge: restore_expires
  });

  cookies().set(session_cookie_key, sessionid, {
    path: "/",
    httpOnly: true,
    maxAge: environment.COOKIE_SESSION_EXPIRES
  });

  return session;
};

/* ServerAction = Writable cookies */
export const deleteSession = async (): Promise<void> =>{
  const sessionid = cookies().get(session_cookie_key)?.value;
  if(!sessionid) return;
  deleteKey(session_store_prefix, sessionid);
  cookies().delete(session_cookie_key);

  const restoreid = cookies().get(restore_cookie_key)?.value;
  if(!restoreid) return;
  await prisma.restoreToken.delete({
    where: { token: restoreid }
  });
  cookies().delete(restore_cookie_key);
};
