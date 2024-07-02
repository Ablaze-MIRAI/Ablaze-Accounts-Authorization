import { NextResponse, type NextRequest } from "next/server";
import { parse as cookieParser } from "set-cookie-parser";

export const middleware = async (request: NextRequest) =>{
  const response = NextResponse.next();

  console.log("[MIDDLEWARE RUNNING]");


  const backendsession = request.cookies.get("backendsession")?.value;
  if(backendsession) return;

  const hukkatunojyumon = request.cookies.get("hukkatunojyumon")?.value;
  if(!hukkatunojyumon) return;

  const resp = await fetch("http://localhost:3000/api/user/revival", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: hukkatunojyumon })
  });

  const revival = await resp.json();
  if(!revival.success) return;

  console.log(resp.headers)

  const setcookie = resp.headers.getSetCookie();

  //response.headers.set("Set-Cookie")
  console.log("[MIDDLEWARE RESPONSE]");
  return response;
}

export const config = {
  matcher: [
    "/signin/:path*",
    "/signup/:path*"
  ]
}
