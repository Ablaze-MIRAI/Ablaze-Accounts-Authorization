import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { EmailSigninVerifySchema } from "@/schema/AuthEmailSignin";
import { ResultFaild } from "@/utility/ResultService";
import * as Service from "@/services/auth/EmailSigninService";

export const AuthEmailSigninRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.addHook("onRoute", (options) =>{
    const schema = options.schema;
    if(!schema) return;
    if(!schema.tags) schema.tags = [];
    schema.tags = [...schema.tags, "Auth/Email"]
  });

  app.post("/verify", {
    schema: {
      body: EmailSigninVerifySchema
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
