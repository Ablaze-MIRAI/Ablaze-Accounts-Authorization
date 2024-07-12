import { NextRequest, NextResponse } from "next/server";
import { parse as SetCookieParse } from "set-cookie-parser";
import environment from "@/environment";

const NEXT_API_RESTORE = "http://localhost:3000/api/restore";

const getRestoreSession = async (request: NextRequest) =>{
  const cookies = request.cookies.getAll();
  const response = await fetch(NEXT_API_RESTORE, {
    method: "GET",
    headers: {
      "Cookie": cookies.map(v => `${v.name}=${v.value}`).join(";")
    }
  });

  console.log(await response.text());

  return SetCookieParse(response.headers.getSetCookie());
};

export const SessionMiddleware = async (request: NextRequest, response: NextResponse) =>{
  console.log("MIDDLEWARE");
  const session_cookie = request.cookies.get(environment.COOKIE_SESSION_NAME);
  if(session_cookie) return response.cookies.set(session_cookie.name, session_cookie.value, {
    path: "/",
    maxAge: environment.COOKIE_SESSION_EXPIRES,
    httpOnly: true
  });

  const restore_token = request.cookies.get(environment.COOKIE_RESTORE_NAME);
  if(!restore_token) return;

  return await getRestoreSession(request);
};
