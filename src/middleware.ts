import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import environment from "./environment";

export const middleware = async (request: NextRequest) =>{
  console.log("@", request.nextUrl.pathname);
  if(request.nextUrl.pathname.startsWith("/_next")) return;
  if(request.nextUrl.pathname.startsWith("/api")) return;
  if(request.nextUrl.pathname.startsWith("/.well-known")) return;
  if(request.nextUrl.pathname.endsWith(".png")) return;
  if(request.nextUrl.pathname.endsWith(".jpg")) return;
  if(request.nextUrl.pathname.endsWith(".svg")) return;

  const response = NextResponse.next();
  response.headers.set("x-next-request-uri", request.nextUrl.href);

  await (async () =>{
    // ToDo: ログ削除
    const sessionid = request.cookies.get(environment.COOKIE_SESSION_NAME)?.value;
    if(!!sessionid){
      response.cookies.set(environment.COOKIE_SESSION_NAME, sessionid, {
        path: "/",
        httpOnly: true,
        maxAge: environment.COOKIE_SESSION_EXPIRES
      });
      return console.log("# SESSION REFRESH [SKIP]");
    }
    console.log("# SESSION NOTFOUND [START]");

    const restoretoken = request.cookies.get(environment.COOKIE_RESTORE_NAME)?.value;
    if(!restoretoken) return console.log("# RESTORE NOT FOUND [SKIP]");
    console.log("# RESTORE FOUND [PASS]");

    const resp = await fetch(`http://localhost:3000/api/restore?token=${restoretoken}`);
    if(!resp.ok){
      response.cookies.delete(environment.COOKIE_RESTORE_NAME);
      return console.log("# RESTORE SESSION FEILD [SKIP]");
    }

    const keys = await resp.json();

    response.cookies.set(environment.COOKIE_SESSION_NAME, keys.session, {
      httpOnly: true,
      path: "/",
      maxAge: environment.COOKIE_SESSION_EXPIRES
    });

    response.cookies.set(environment.COOKIE_RESTORE_NAME, keys.restore, {
      httpOnly: true,
      path: "/",
      maxAge: environment.COOKIE_RESTORE_EXPIRES
    });

    response.headers.set("x-session-restore", JSON.stringify(keys.user));

    console.log("# !!!!! RESTORE DONE !!!!!");
  })();

  return response;
};

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    "/:path*",
  ]
};
