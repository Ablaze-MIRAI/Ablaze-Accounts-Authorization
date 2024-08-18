import { NextRequest, NextResponse } from "next/server";
import { o2google_setup_cookie, o2google_state_cookie } from "@/store/cookie/oauth2_google";
import { createGoogleOAuth2Client } from "@/library/connection/googleapis";
import * as jwt from "jsonwebtoken";
import { getUserByGoogleUid } from "@/data/googleoauth2";
import { createSession } from "@/library/session";

export const POST = async (request: NextRequest) =>{
  const body = await request.json();
  const code = body["code"];
  const state = body["state"];
  const saved_state = o2google_state_cookie.get();

  if([code, state, saved_state].every(p => !p)) return NextResponse.json({ msg: "e:query-state" }, { status: 400 });
  if(state !== saved_state) return NextResponse.json({ msg: "state" }, { status: 400 });
  o2google_state_cookie.delete();

  const google = createGoogleOAuth2Client();
  const { tokens } = await google.getToken(code);
  if(!tokens.id_token) return NextResponse.json({ msg: "token" }, { status: 400 });
  const payload = jwt.decode(tokens.id_token) as { email: string, sub: string };
  if(!payload) return NextResponse.json({ msg: "id_token" }, { status: 400 });

  const googleuser = await getUserByGoogleUid(payload.sub);
  if(!googleuser){
    o2google_setup_cookie.set({
      email: payload.email,
      guid: payload.sub
    });

    return NextResponse.json({ msg: "ok_new" });
  }

  await createSession(googleuser.user.uid);

  return NextResponse.redirect("/dashboard");
};
