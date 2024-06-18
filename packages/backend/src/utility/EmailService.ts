import { FastifyInstance } from "fastify";

export const EmailSend = async (app: FastifyInstance, to: string, subject: string, html: string) =>{
  return await app.mailer.sendMail({
    to: to,
    subject: subject,
    html: html
  });
};
