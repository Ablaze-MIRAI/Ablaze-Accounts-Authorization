import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ResultFaild, ResultSuccess } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";
import { Result } from "@/typings/result";

export const AuthSessionRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.delete("/signout", {
    schema: {
      tags: ["Auth/Session"]
    }
  }, async (request, _response): Promise<Result> =>{
    try{
      request.session.destroy();
      return ResultSuccess(ResultCode.SUCCESS);
    }catch(e){
      return ResultFaild(ResultCode.ERROR);
    }
  });
};
