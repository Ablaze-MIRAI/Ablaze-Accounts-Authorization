import { randomBytes } from "crypto";
import { createGoogleOAuth2Client } from "@/library/connection/googleapis";
import { o2google_state_cookie } from "@/store/cookie/oauth2_google";
import { NextResponse } from "next/server";

export async function GET(){
  const state = randomBytes(32).toString("hex");
  const client = createGoogleOAuth2Client();

  const url = client.generateAuthUrl({
    scope: ["https://www.googleapis.com/auth/userinfo.email"],
    state: state
  });

  o2google_state_cookie.set(state);

  return NextResponse.redirect(url);
}
