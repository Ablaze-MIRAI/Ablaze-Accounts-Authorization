import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import environment from "@/environment";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";
import { createGoogleOAuth2Client } from "@/library/connection/googleapis";

export async function GET(){
  const state = randomBytes(32).toString("hex");
  const client = createGoogleOAuth2Client();

  const url = client.generateAuthUrl({
    scope: ["https://www.googleapis.com/auth/userinfo.email"],
    state: state
  });

  cookies().set(environment.COOKIE_OAUTH2_STATE, state, {
    maxAge: 60*10
  });

  redirect(url);
}
