import environment from "@/environment";
import { CookieStore, CookieSafeStore } from "@/library/cookiestore";
import { readFileSync } from "fs";

const PrivateKey = readFileSync(environment.OIDC_JWS_PRIVATE_KEY_PATH).toString();

export const o2google_state_cookie = new CookieStore<string>("_oauth2_google_state", {
  maxAge: 60 * 10,
  path: "/"
});

export const o2google_setup_cookie = new CookieSafeStore<{
  email: string,
  guid: string
}>(PrivateKey, {
  algorithm: "RS256",
  expiresIn: 60 * 10
}, "_oauth2_google_state", {
  maxAge: 60 * 10,
  path: "/"
});
