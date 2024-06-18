import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import * as Service from "@/services/auth/EmailSignupService";
import { Result } from "@/typings/result";
import { ResultFaild } from "@/utility/ResultService";
import { EmailSignupRegisterSchema, EmailSignupVerifypinSchema } from "@/schema/AuthEmailSignup";

export const AuthEmailSignupRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.post("/register", {
    schema: {
      body: EmailSignupRegisterSchema,
      tags: ["Auth/Email"]
    }
  }, async (request, _response): Promise<Result> =>{
    try{
      return await Service.Register(app, request);
    }catch(e){
      console.log(e);
      return ResultFaild(2001);
    }
  });

  app.post("/verifypin", {
    schema: {
      body: EmailSignupVerifypinSchema,
      tags: ["Auth/Email"]
    }
  }, async (request, _response): Promise<Result> =>{
    try{
      return await Service.Verifypin(app, request, request.body.pin);
    }catch(e){
      console.log(e);
      return ResultFaild(2001);
    }
  })
};
