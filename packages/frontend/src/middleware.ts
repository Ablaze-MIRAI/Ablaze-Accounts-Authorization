import { NextResponse, type NextRequest } from "next/server";
import { parse as cookieParser } from "set-cookie-parser";

export const middleware = async (request: NextRequest) =>{
  const response = NextResponse.next();

  const proxysession = request.cookies.get("proxysession")?.value;
  if(proxysession) return;

  const keepsign = request.cookies.get("keepsign")?.value;
  if(!keepsign) return;

  const resp = await fetch("https://jsonplaceholder.typicode.com/users/2");
  const user = await resp.json();
  const setcookie = resp.headers.getSetCookie();

  const cookie = cookieParser(setcookie);

  console.log(request.nextUrl.href);
  response.cookies.set("aqua", "kawaii");
  response.cookies.set("name", user.name);

  return response;
}

export const config = {
  matcher: [
    "/signin/:path*",
    "/signup/:path*"
  ]
}
