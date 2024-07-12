/* eslint import/no-anonymous-default-export: off */
export default {
  NODE_ENV: "development",
  COOKIE_SESSION_NAME: "_next_session_id",
  COOKIE_SESSION_EXPIRES: 60*60*2,
  COOKIE_RESTORE_NAME: "_next_restore_token",
  COOKIE_RESTORE_EXPIRES: 60*60*24*60,
  REDIS_SESSION_PREFIX: "_session",
  REDIS_SESSION_EXPIRES: 60*60*2,
};
