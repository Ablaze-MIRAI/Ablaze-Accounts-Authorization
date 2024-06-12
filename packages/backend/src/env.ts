export default {
  ISDEVELOP: process.env.NODE_ENV === "development",

  // SMTP Server
  SMTP_HOST: process.env.SMTP_HOST ?? "localhost",
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 587),
  SMTP_SECURE: process.env.SMTP_SECURE === "secure",
  SMTP_USER: process.env.SMTP_USER ?? "root",
  SMTP_PASS: process.env.SMTP_PASS ?? "root",
  SMTP_SENDER_ADDR: process.env.SMTP_SENDER_ADDR ?? "noreply@localhost",
  SMTP_SENDER_NAME: process.env.SMTP_SENDER_NAME ?? "Ablaze Accounts"
}
