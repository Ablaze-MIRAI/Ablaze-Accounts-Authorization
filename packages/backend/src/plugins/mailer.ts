import FastifyPlugin from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import nodemailer, { type Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import env from "@/env";

declare module "fastify" {
  interface FastifyInstance {
    mailer: Transporter<SMTPTransport.SentMessageInfo>
  }
}

const MailerPlugin: FastifyPluginAsync = FastifyPlugin(async (server, _options) =>{
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS
    },
    envelope: {
      from: `${env.SMTP_SENDER_NAME} <${env.SMTP_SENDER_ADDR}>`
    }
  });
  server.decorate("mailer", transport);
  server.addHook("onClose", (server) => server.mailer.close())
});

export default MailerPlugin;
