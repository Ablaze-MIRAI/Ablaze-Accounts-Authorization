import { NextResponse, type NextRequest } from "next/server";
import cookieParser from "set-cookie-parser";

export const middleware = async (request: NextRequest) =>{
  const response = NextResponse.next();

  response.headers.set("middleware-request-url", request.nextUrl.href);
  response.headers.set("middleware-request-search", request.nextUrl.search);

  const backendsession = request.cookies.get("backendsession")?.value;
  if(backendsession) return response;

  const hukkatunojyumon = request.cookies.get("hukkatunojyumon")?.value;
  if(!hukkatunojyumon) return response;

  const resp = await fetch("http://localhost:3000/api/user/revival", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: hukkatunojyumon })
  });

  const revival = await resp.json();
  if(!revival.success){
    response.cookies.delete("hukkatunojyumon");
    return response;
  };

  const combinedcookie = resp.headers.get("set-cookie");
  if(!combinedcookie) return response;

  const splitCookieHeaders = cookieParser.splitCookiesString(combinedcookie);
  const setcookies = cookieParser.parse(splitCookieHeaders);

  setcookies.map(v =>{
    response.cookies.set(v.name, v.value, {
      httpOnly: v.httpOnly,
      expires: v.expires,
      path: "/",
      maxAge: v.maxAge
    });
  });

  return response;
}

export const config = {
  matcher: [
    "/:path*"
  ]
}
