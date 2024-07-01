import { join } from "path";
import { readFileSync } from "fs";

const WorkspaceFolder = process.env.DEVELOP_WORKSPACE_FOLDER ?? process.cwd();

export default {
  ISDEVELOP: process.env.NODE_ENV === "development",

  // Redis Server
  REDIS_SERVER_CONNECTION: "redis://default:AbWKAAIncDE3MmQxMzVmODY5Zjk0ZGZmOGY1YzZkMjA2NTgwNWZiMnAxNDY0NzQ@intent-joey-46474.upstash.io:6379",

  // SMTP Server
  SMTP_HOST: process.env.SMTP_HOST ?? "localhost",
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 587),
  SMTP_SECURE: process.env.SMTP_SECURE === "yes",
  SMTP_USER: process.env.SMTP_USER ?? "root",
  SMTP_PASS: process.env.SMTP_PASS ?? "root",
  SMTP_SENDER_ADDR: process.env.SMTP_SENDER_ADDR ?? "noreply@localhost",
  SMTP_SENDER_NAME: process.env.SMTP_SENDER_NAME ?? "Ablaze Accounts",

  // OAuth2
  OAUTH2_ACCESS_TOKEN_EXP_SECONDS: 60*30,
  OAUTH2_REFRESH_TOKEN_EXP_DAYS: 30*4,

  // JWT/JWS
  //JWS_SIGN_SLGORITHM: "RS256",
  JWS_PRIVATE_KEY: readFileSync(join(WorkspaceFolder, process.env.JWS_PRIVATE_KEY_PATH ?? "")).toString(),
  JWS_PUBLIC_KEY: readFileSync(join(WorkspaceFolder, process.env.JWS_PUBLIC_KEY_PATH ?? "")).toString(),
  JWS_ISSUER: "one.ablaze.accounts",
  JWS_SUBJECT: "one.ablaze.accounts.v1",
}
