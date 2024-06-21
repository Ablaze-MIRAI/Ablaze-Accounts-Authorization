import { FastifyInstance, FastifyRequest } from "fastify";
import { Static } from "@sinclair/typebox";
import { ResultFaild, ResultSuccess } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";
import * as AccountManageService from "@/utility/AccountManageService";
import { EmailSigninVerifySchema } from "@/schema/AuthEmailSignin";

export const Verify = async (app: FastifyInstance, request: FastifyRequest, body: Static<typeof EmailSigninVerifySchema>) =>{
  const result = await AccountManageService.VerifyByEmail(app, body.email, body.password);
  if(!result) return ResultFaild(ResultCode.EMAIL_OR_PASS_ERROR);

  AccountManageService.Signin(request, {
    iid: result.user.iid,
    type: result.user.account_type,
    avatar: result.user.avatar,
    name: result.user.screen_name
  });

  return ResultSuccess(ResultCode.SUCCESS);
}
