"use server";

import { redirect } from "next/navigation";
import { generateOAuth2ClientState } from "@/library/keygenerator";
import { cookies } from "next/headers";
import environment from "@/environment";

const GITHUB_AUTHORIZE_URI = "https://github.com/login/oauth/authorize";

export const startAuthorize = () =>{
  const state = generateOAuth2ClientState();
  cookies().set(environment.COOKIE_GITHUB_STATE, state, {
    maxAge: 60*10,
    path: "/"
  });
  redirect(`${GITHUB_AUTHORIZE_URI}?client_id=${environment.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(environment.GITHUB_REDIRECT_URI)}&state=${state}&scope=${encodeURIComponent("user:email")}`);
};
