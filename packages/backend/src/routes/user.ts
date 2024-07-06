import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ResultFaild, ResultSuccess, ResultSuccessWithData } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";
import { UserRevival } from "@/schema/User";
import { SessionRevivalGenerate } from "@/utility/KeygenService";
import { DaysAgo } from "@/utility/Props";

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

  // @TODO
  app.post("/revival", { schema: { body: UserRevival } }, async (request, response) =>{
    if(request.session.signed) return ResultFaild(ResultCode.REVIVAL_ALREADY_SIGNED);

    const newtoken = SessionRevivalGenerate();

    const revival = await app.prisma.revivalToken.findUnique({
      select: {
        updatedAt: true,
        user: {
          select: {
            uid: true,
            iid: true,
            account_type: true,
            avatar: true,
            screen_name: true
          }
        }
      },
      where: {
        token: request.body.token
      }
    });
    if(!revival || revival.updatedAt.getTime()+1000*60*60*24*120 < new Date().getTime()) return ResultFaild(ResultCode.REVIVAL_NOTFOUND);

    await app.prisma.revivalToken.update({
      data: {
        token: newtoken
      },
      where: {
        token: request.body.token
      }
    });

    request.session.set("signed", {
      iid: revival.user.iid,
      uid: revival.user.uid,
      name: revival.user.screen_name,
      type: revival.user.account_type,
      avatar: revival.user.avatar
    });

    response.setCookie("hukkatunojyumon", newtoken, {
      httpOnly: true,
      path: "/",
      expires: DaysAgo(120)
    });

    return ResultSuccess(ResultCode.SUCCESS);
  });
};
