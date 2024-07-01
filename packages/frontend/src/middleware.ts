import { NextResponse, type NextRequest } from "next/server";
import { parse as cookieParser } from "set-cookie-parser";

export const middleware = async (request: NextRequest) =>{
  const response = NextResponse.next();

  console.log("[M1]", request.nextUrl.href);


  const backendsession = request.cookies.get("backendsession")?.value;
  if(backendsession) return;

  console.log("[M2]", backendsession);

  console.log(backendsession);

  const hukkatunojyumon = request.cookies.get("hukkatunojyumon")?.value;
  if(!hukkatunojyumon) return;

  console.log(hukkatunojyumon);

  const resp = await fetch("http://localhost:3000/api/user/revival", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: hukkatunojyumon })
  });

  const revival = await resp.json();
  console.log(revival)
  if(!revival.success) return;

  const setcookie = resp.headers.getSetCookie();
  const cookie = cookieParser(setcookie);
  //@ts-ignore
  console.log("[PARSED COOKIE]", cookie[0]);

  const backendsession_cookie = cookie.find(v => v.name === "backendsession");
  console.log("[M3b]", backendsession_cookie);
  if(!backendsession_cookie) return;
  console.log("[M3]", backendsession_cookie.value)
  response.cookies.set({
    name: "backendsession",
    value: backendsession_cookie.value,
    path: "/"
  })

  return response;
}

export const config = {
  matcher: [
    "/signin/:path*",
    "/signup/:path*"
  ]
}
