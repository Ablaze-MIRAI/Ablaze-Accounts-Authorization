import { FastifyInstance } from "fastify";
import { ResultFaild, ResultSuccess, ResultSuccessWithData } from "@/utility/ResultService";
import ResultCode from "@/ResultCode";
import * as OAuth2Service from "@/utility/OAuth2Service";
import * as KeygenService from "@/utility/KeygenService";
import type { Result } from "@/typings/result";
import { DaysAgo } from "@/utility/Props";
import env from "@/env";


export const OAuth2Application = (client_id: string, redirect_uri: string): Result =>{
  const application = OAuth2Service.GetApplication(client_id, redirect_uri);
  if(!application) return ResultFaild(ResultCode.OAUTH2_INCORRECT_REQUEST);

  return ResultSuccessWithData(ResultCode.SUCCESS, {
    name: application.name
  });
}

export const OAuth2Accept = async (app: FastifyInstance, uid: string, client_id: string, redirect_uri: string, state: string): Promise<Result> =>{
  const application = OAuth2Service.GetApplication(client_id, redirect_uri);
  if(!application) return ResultFaild(ResultCode.OAUTH2_INCORRECT_REQUEST);

  const code = KeygenService.OAuth2CodeGenerate();
  await OAuth2Service.CreateArCode(app, uid, client_id, code);
  const uri = OAuth2Service.RedicretURIBuilder(redirect_uri, state, code);

  return ResultSuccessWithData(ResultCode.SUCCESS, {
    redirect: uri
  });
}

export const OAuth2Token = async (app: FastifyInstance, code: string, clientid: string): Promise<object> =>{
  const authcode = await OAuth2Service.getAuthCodeInfo(app, code);
  if(!authcode) return ResultFaild(ResultCode.OAUTH2_INCORRECT_REQUEST);
  if(authcode.client_id !== clientid) return ResultFaild(ResultCode.OAUTH2_INCORRECT_REQUEST);

  const refresh_expiration = DaysAgo(env.OAUTH2_REFRESH_TOKEN_EXP_DAYS);
  const refresh_token = await OAuth2Service.RefreshTokenGenerator(app, refresh_expiration, authcode.user.uid, authcode.client_id);
  const access_token = OAuth2Service.AccessTokenGenerator(
    authcode.client_id,
    authcode.user.uid,
    authcode.scope,
    authcode.user.account_type,
    authcode.user.screen_name,
    authcode.user.avatar
  );

  return OAuth2Service.TokenResponseBuilder(access_token, refresh_token, refresh_expiration);
}
