import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { OAuth2AcceptSchema, OAuth2ApplicationSchema, OAuth2TokenSchema } from "@/schema/OAuth2";
import { ResultFaild } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";
import * as O2ES from "@/services/OAuth2EndpointService";
import * as Guard from "@/utility/GuardService";

export const OAuth2Router: FastifyPluginAsyncTypebox = async (app) =>{
  app.addHook("onRoute", (options) =>{
    const schema = options.schema;
    if(!schema) return;
    if(!schema.tags) schema.tags = [];
    schema.tags = [...schema.tags, "OAuth2"]
  });


  app.post("/verifyapplication", {
    schema: {
      body: OAuth2ApplicationSchema
    },
    preHandler: [Guard.isSigned]
  }, async (request, _response) =>{
    const { client_id, redirect_uri } = request.body;
    return O2ES.OAuth2Application(app, request.guard.uid, client_id, redirect_uri);
  });

  app.post("/accept", {
    schema: {
      body: OAuth2AcceptSchema
    },
    preHandler: [Guard.isSigned]
  }, async (request, _response) =>{
    const { client_id, redirect_uri, state, raw } = request.body;

    try{
      const { uid } = request.guard;
      return await O2ES.OAuth2Accept(app, uid, client_id, redirect_uri, state, raw);
    }catch(e){
      return ResultFaild(ResultCode.ERROR);
    }
  });

  app.post("/token", {
    schema: {
      body: OAuth2TokenSchema
    }
  }, async (request, reply) =>{
    const { code, client_id } = request.body;
    try{
      return await O2ES.OAuth2Token(app, code, client_id);
    }catch(e){
      return ResultFaild(ResultCode.ERROR);
    }
  })
}
