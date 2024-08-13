import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import environment from "@/environment";
import { createGoogleOAuth2Client } from "@/library/connection/googleapis";
import { redirect } from "next/navigation";
import { google } from "googleapis";

export async function GET(request: NextRequest){
  const query = request.nextUrl.searchParams;

  const code = query.get("code");
  const state = query.get("state");
  if(!code || !state) redirect("/");

  const saved_state = cookies().get(environment.COOKIE_OAUTH2_STATE);
  if(!saved_state) redirect("/");
  if(saved_state.value !== state) redirect("/");

  const client = createGoogleOAuth2Client();
  const token = await client.getToken(code);
  client.setCredentials({
    access_token: token.tokens.access_token
  });

  const people = google.people({
    "version": "v1",
    auth: client
  });

  const res = await people.people.get({
    resourceName: "people/me",
    personFields: "names,emailAddresses"
  });



  return NextResponse.json(res.data);
}
