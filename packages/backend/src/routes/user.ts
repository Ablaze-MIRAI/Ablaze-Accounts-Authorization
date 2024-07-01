import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ResultFaild, ResultSuccess, ResultSuccessWithData } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";
import { UserRefrain } from "@/schema/User";

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

  app.get("/refrain", { schema: { body: UserRefrain } }, async (request, _response) =>{
    const user = await app.redis.get(`refrainv1-${request.body.token}`);
    if(!user) return ResultFaild(2301);
    request.session.set("signed", JSON.parse(user));
    return ResultSuccess(ResultCode.SUCCESS);
  });
};
