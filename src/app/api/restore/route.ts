import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getRestoreToken, updateRestoreToken } from "@/data/session";
import { createHashWithExpire } from "@/library/kv";
import environment from "@/environment";
import { UserSession } from "@/typings/session";

const generateSessionId = () => randomBytes(32).toString("hex");
const generateRestoreToken = () => randomBytes(64).toString("hex");
const DefaultResWithCode = (status: number) =>({ status: status, headers: { "Content-Type": "application/json" } });

export const GET = async (request: NextRequest) =>{
  const restore_token = request.nextUrl.searchParams.get("token");
  if(!restore_token) return NextResponse.json({ code: 451 }, { status: 400 });

  const user = await getRestoreToken(restore_token);
  if(!user) return NextResponse.json({ code: 452 }, { status: 400 });

  const newrestore_token = generateRestoreToken();
  const newsession_id = generateSessionId();

  const newsession: UserSession = {
    uid: user.uid,
    name: user.user.screen_name,
    avatar: user.user.avatar,
    role: user.user.account_type
  };

  const updateresult = await updateRestoreToken(restore_token, newrestore_token);
  if(!updateresult) return;
  await createHashWithExpire(
    environment.REDIS_SESSION_PREFIX,
    newsession_id,
    environment.REDIS_SESSION_EXPIRES,
    newsession
  );

  const response = NextResponse.json({ restore: newrestore_token, session: newsession_id, user: newsession }, { status: 200 });

  return response;



  /*const sessionid = request.cookies.get(environment.COOKIE_SESSION_NAME)?.value;
  if(sessionid) return NextResponse.json({ code: "R0" }, { status: 480 });

  const restore_token = request.cookies.get(environment.COOKIE_RESTORE_NAME)?.value;
  if(!restore_token) return NextResponse.json({ code: "R1" }, { status: 481 });

  const user = await getRestoreToken(restore_token);
  if(!user) return NextResponse.json({ code: "R2" }, { status: 482 });

  const newrestore_token = generateRestoreToken();
  const newsession_id = generateSessionId();

  const newsession: UserSession = {
    uid: user.uid,
    name: user.user.screen_name,
    avatar: user.user.avatar,
    role: user.user.account_type
  };

  await updateRestoreToken(restore_token, newrestore_token);
  await createHashWithExpire(
    environment.REDIS_SESSION_PREFIX,
    newsession_id,
    environment.REDIS_SESSION_EXPIRES,
    newsession
  );

  const response = NextResponse.json({ code: "R3" }, { status: 200 });
  response.cookies.set(environment.COOKIE_RESTORE_NAME, newrestore_token, {
    path: "/",
    httpOnly: true,
    maxAge: environment.COOKIE_RESTORE_EXPIRES
  });
  response.cookies.set(environment.COOKIE_SESSION_NAME, newsession_id, {
    path: "/",
    httpOnly: true,
    maxAge: environment.COOKIE_SESSION_EXPIRES
  });

  return response;*/
};
