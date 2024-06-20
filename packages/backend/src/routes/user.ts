import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ResultFaild, ResultSuccessWithData } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";

export const UserRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.get("/info", {
    schema: {
      tags: ["User"]
    }
  }, async (request, _response) =>{
    const user = request.session.get("signed");
    if(!user) return ResultFaild(ResultCode.SESSION_ERROR);

    const { name, avator } = user;
    return ResultSuccessWithData(ResultCode.SUCCESS, {
      name: name,
      avator: avator
    });
  });
};
