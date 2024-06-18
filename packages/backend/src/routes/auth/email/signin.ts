import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { EmailSigninVerifySchema } from "@/schema/AuthEmailSignin";
import { ResultFaild } from "@/utility/ResultService";
import * as Service from "@/services/auth/EmailSigninService";

export const AuthEmailSigninRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.post("/verify", {
    schema: {
      body: EmailSigninVerifySchema,
      tags: ["Auth/Email"]
    }
  }, async (request, _response) =>{
    try{
      return await Service.Verify(app, request, request.body)
    }catch(e){
      console.log(e);
      return ResultFaild(2001);
    }
  });
}
