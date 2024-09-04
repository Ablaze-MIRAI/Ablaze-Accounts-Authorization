import { NextRequest, NextResponse } from "next/server";
import environment from "@/environment";
import { generateRestoreToken, generateSessionId } from "@/library/keygenerator";
import { createHashWithExpire } from "@/library/kv";
import { getRestoreToken, updateRestoreToken } from "@/data/session";
import type { UserSession } from "@/typings/session";
import { TokenHash } from "@/library/safety";

export const GET = async (request: NextRequest) =>{
  const restore_token = request.nextUrl.searchParams.get("token");
  if(!restore_token) return NextResponse.json({ code: 451 }, { status: 400 });

  const user = await getRestoreToken(restore_token);
  if(!user) return NextResponse.json({ code: 452 }, { status: 400 });

  const newrestore_token = generateRestoreToken();
  const newsession_id = generateSessionId();
  const hashed_nsid = TokenHash(newsession_id);

  const updateresult = await updateRestoreToken(restore_token, newrestore_token);
  if(!updateresult) return;

  const newsession: UserSession = {
    id: updateresult.id,
    uid: user.uid,
    name: user.user.screen_name,
    avatar: user.user.avatar,
    role: user.user.account_type
  };

  await createHashWithExpire(
    environment.REDIS_SESSION_PREFIX,
    hashed_nsid,
    environment.REDIS_SESSION_EXPIRES,
    newsession
  );

  const response = NextResponse.json({ restore: newrestore_token, session: newsession_id, user: newsession }, { status: 200 });

  return response;


  // TODO:消す
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
