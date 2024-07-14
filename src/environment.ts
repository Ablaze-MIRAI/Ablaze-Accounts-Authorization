/* eslint import/no-anonymous-default-export: off */
export default {
  NODE_ENV: process.env.NODE_ENV,

  // Cookie
  COOKIE_SESSION_NAME: "_next_session_id",
  COOKIE_SESSION_EXPIRES: 60*60*2, // 2 hours
  COOKIE_RESTORE_NAME: "_next_restore_token",
  COOKIE_RESTORE_EXPIRES: 60*60*24*60, // 60 days

  // Redis
  REDIS_SESSION_PREFIX: "_session",
  REDIS_SESSION_EXPIRES: 60*60*2, // 2 hours

  // OAuth2 / Open ID Connect
  OAUTH2_STORE_PREFIX: "_oauth2",
  OAUTH2_CODE_EXPIRES: 60*10, // 10 minutes
  OIDC_REFRESH_EXPIRES: 60*60*24*60, // 60 days
  OIDC_JWS_EXPIRES: 60*30, // 30 minutes
  OIDC_JWS_PRIVATE_KEY_PATH: process.env.OIDC_JWS_PRIVATE_KEY_PATH,
  OIDC_JWS_PUBLIC_KEY_PATH: process.env.OIDC_JWS_PUBLIC_KEY_PATH,
  OIDC_JWT_SUBJECT_PREFIX: "uid.v1",
  OIDC_JWT_ISSUER: "one.ablaze.accounts.v1",
};
