import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import environment from "@/environment";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";
import { createGoogleOAuth2Client } from "@/library/connection/googleapis";

export async function GET(){
  const client = createGoogleOAuth2Client();

  const url = client.generateAuthUrl

  const state = randomBytes(32).toString("hex");

  cookies().set(environment.COOKIE_OAUTH2_STATE, state);

  redirect("");
}
