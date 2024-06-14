import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { EmailRouter } from "./email";

export const InternalRouter: FastifyPluginAsyncZod = async (app) =>{
  app.register(EmailRouter, { prefix: "/email" });
};
