import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ResultFaild, ResultSuccess } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";
import { Result } from "@/typings/result";

export const AuthSessionRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.addHook("onRoute", (options) =>{
    const schema = options.schema;
    if(!schema) return;
    if(!schema.tags) schema.tags = [];
    schema.tags = [...schema.tags, "Auth/Session"]
  });

  app.delete("/signout", { schema: {} }, async (request, _response): Promise<Result> =>{
    try{
      request.session.destroy();
      return ResultSuccess(ResultCode.SUCCESS);
    }catch(e){
      return ResultFaild(ResultCode.ERROR);
    }
  });
};
