import "server-only";

/* eslint import/no-anonymous-default-export: off */
export default {
  NODE_ENV: process.env.NODE_ENV,

  // IdP / GitHub
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? "",
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? "",
  GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI ?? "",

  // IdP / Google
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  GOOGLE_OAUTH2_SCOPE: "",

  // Cookie
  COOKIE_SESSION_NAME: "_next_session_id",
  COOKIE_SESSION_EXPIRES: 60*60*2, // 2 hours
  COOKIE_RESTORE_NAME: "_next_restore_token",
  COOKIE_RESTORE_EXPIRES: 60*60*24*60, // 60 days
  COOKIE_GITHUB_STATE: "_next_github_state",
  COOKIE_OAUTH2_STATE: "_oauth2_state",

  // SMTP
  SMTP_HOST: process.env.SMTP_HOST ?? "localhost",
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 465),
  SMTP_SECURE: true,
  SMTP_FROM: process.env.SMTP_FROM ?? "noreply@localhost",
  SMTP_USER: process.env.SMTP_USER ?? "root",
  SMTP_PASS: process.env.SMTP_PASS ?? "root",

  // Redis
  REDIS_CONNECTION: process.env.REDIS_CONNECTION ?? "",
  REDIS_SESSION_PREFIX: "_session",
  REDIS_SESSION_EXPIRES: 60*60*2, // 2 hours

  // OAuth2 / Open ID Connect
  OAUTH2_STORE_PREFIX: "_oauth2",
  OAUTH2_CODE_EXPIRES: 60*10, // 10 minutes
  OIDC_REFRESH_EXPIRES: 60*60*24*60, // 60 days
  OIDC_JWS_EXPIRES: 60*30, // 30 minutes
  OIDC_JWS_PRIVATE_KEY_PATH: process.env.OIDC_JWS_PRIVATE_KEY_PATH ?? "",
  OIDC_JWS_PUBLIC_KEY_PATH: process.env.OIDC_JWS_PUBLIC_KEY_PATH ?? "",
  OIDC_JWT_SUBJECT_PREFIX: "uid.v1",
  OIDC_JWT_ISSUER: "one.ablaze.accounts.v1",

  // NextJS
  HEADER_NEXT_REQUEST_URI: "x-next-request-uri"
};
