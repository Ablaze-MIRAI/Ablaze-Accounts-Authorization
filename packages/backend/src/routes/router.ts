import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

// Routes
import { EmailSignupRouter } from "./auth/email/signup";

export const RootRouter: FastifyPluginAsyncZod = async (app) =>{
  app.register(EmailSignupRouter, { prefix: "/auth/email/signup" });
};
