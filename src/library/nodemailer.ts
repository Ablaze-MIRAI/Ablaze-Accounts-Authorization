import nodemailer, { Transporter } from "nodemailer";
import environment from "@/environment";

/* eslint no-undef: off */
const globalForMailer = globalThis as unknown as {
  mailer: Transporter | undefined;
};

export const mailer = globalForMailer.mailer ?? nodemailer.createTransport({
  host: "m33.coreserver.jp",
  port: 465,
  secure: true,
  from: "noreply@mirairo.dev",
  auth: {
    user: "noreply@mirairo.dev",
    pass: "iy7IUju6zTAN"
  },
  tls: {
    maxVersion: "TLSv1.3",
    minVersion: "TLSv1.2",
    ciphers: "TLS_AES_128_GCM_SHA256"
  }
});

if(environment.NODE_ENV === "production") globalForMailer.mailer = mailer;
