import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Static } from "@sinclair/typebox";
import { ResultFaild, ResultSuccess } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";
import * as AccountManageService from "@/utility/AccountManageService";
import { EmailSigninVerifySchema } from "@/schema/AuthEmailSignin";
import { issueRevivalToken } from "@/utility/SessionService";
import { DaysAgo } from "@/utility/Props";

export const Verify = async (app: FastifyInstance, request: FastifyRequest, body: Static<typeof EmailSigninVerifySchema>, reply: FastifyReply) =>{
  const result = await AccountManageService.VerifyByEmail(app, body.email, body.password);
  if(!result) return ResultFaild(ResultCode.EMAIL_OR_PASS_ERROR);

  const revival_token = await issueRevivalToken(app, result.user.uid);
  reply.setCookie("hukkatunojyumon", revival_token, {
    httpOnly: true,
    expires: DaysAgo(120),
    path: "/"
  });

  AccountManageService.Signin(request, {
    uid: result.user.uid,
    iid: result.user.iid,
    type: result.user.account_type,
    avatar: result.user.avatar,
    name: result.user.screen_name
  });

  return ResultSuccess(ResultCode.SUCCESS);
}
