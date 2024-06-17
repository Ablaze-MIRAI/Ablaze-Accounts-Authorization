import { EmailSignupRegister } from "@/schema/AuthEmailSignup";
import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const EmailSignupRouter: FastifyPluginAsyncZod = async (app) =>{
  app.post<{
    body: z.infer<typeof EmailSignupRegister>
  }>("/register", { schema: { body: EmailSignupRegister } }, async (request, response) =>{

  });
};
