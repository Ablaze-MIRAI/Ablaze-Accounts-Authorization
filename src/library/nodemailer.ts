import nodemailer, { Transporter } from "nodemailer";
import environment from "@/environment";

/* eslint no-undef: off */
const globalForMailer = globalThis as unknown as {
  mailer: Transporter | undefined;
};

export const mailer = globalForMailer.mailer ?? nodemailer.createTransport({
  host: environment.SMTP_HOST,
  port: environment.SMTP_PORT,
  secure: true,
  from: environment.SMTP_FROM,
  auth: {
    user: environment.SMTP_USER,
    pass: environment.SMTP_PASS
  },
  tls: {
    maxVersion: "TLSv1.3",
    minVersion: "TLSv1.2",
    ciphers: "TLS_AES_128_GCM_SHA256"
  }
});

if(environment.NODE_ENV === "production") globalForMailer.mailer = mailer;
