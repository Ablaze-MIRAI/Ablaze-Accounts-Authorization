import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { EmailSignupRegister } from "@/schema/AuthEmailSignup";
import * as Service from "@/services/auth/EmailSignupService";

export const AuthEmailSignupRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.post("/register", {
    schema: {
      body: EmailSignupRegister
    }
  }, async (request, response) =>{
    return await Service.Register()
  });
};
