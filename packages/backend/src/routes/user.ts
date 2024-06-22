import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ResultFaild, ResultSuccessWithData } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";

export const UserRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.addHook("onRoute", (options) =>{
    const schema = options.schema;
    if(!schema) return;
    if(!schema.tags) schema.tags = [];
    schema.tags = [...schema.tags, "User"]
  });

  app.get("/info", { schema: {} }, async (request, _response) =>{
    const user = request.session.get("signed");
    if(!user) return ResultFaild(ResultCode.SESSION_ERROR);

    const { name, avatar } = user;
    return ResultSuccessWithData(ResultCode.SUCCESS, {
      name: name,
      avatar: avatar
    });
  });
};
