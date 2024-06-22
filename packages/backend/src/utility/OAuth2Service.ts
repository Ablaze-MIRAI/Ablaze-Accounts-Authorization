import { FastifyInstance } from "fastify";
import ClientApplications from "@/ClientApplications";
import * as JwtService from "@/utility/JwtService";
import * as KeygenService from "@/utility/KeygenService";
import { MinAgo } from "@/utility/Props";
import env from "@/env";

export const GetApplication = (clientid: string, redirect_uri: string) =>{
  const application = ClientApplications[clientid];
  if(!application) return false;
  if(!application.callback.includes(redirect_uri)) return false;
  return application;
}

export const CreateArCode = async (app: FastifyInstance, uid: string, clientid: string, code: string) =>{
  return await app.prisma.oAuth2AuthorizationCode.create({
    data: {
      uid: uid,
      client_id: clientid,
      scope: "user",
      expiration: MinAgo(10),
      code: code
    }
  });

}

export const RedicretURIBuilder = (redirect: string, state: string, code: string) =>{
  return `${redirect}?state=${state}&code=${code}`
}

export const getAuthCodeInfo = async (app: FastifyInstance, code: string) =>{
  return await app.prisma.oAuth2AuthorizationCode.findUnique({
    select: {
      expiration: true,
      client_id: true,
      scope: true,
      user: {
        select: {
          uid: true,
          screen_name: true,
          avatar: true,
          account_type: true
        }
      }
    },
    where: {
      code: code
    }
  });
}

export const AccessTokenGenerator = (clientid: string, uid: string, scope:string, account_type: string, name: string, avatar: string) =>{
  return JwtService.sign({
    uid: uid,
    sco: scope,
    aty: account_type,
    nam: name,
    ava: avatar
  }, clientid);
}

export const RefreshTokenGenerator = async (app: FastifyInstance, expiration: Date, uid: string, clientid: string) =>{
  const token = KeygenService.OAuth2RefreshTokenGenerate();

  await app.prisma.refreshToken.create({
    data: {
      token: token,
      expiration: expiration,
      client_id: clientid,
      uid: uid
    }
  });

  return token;
}

export const TokenResponseBuilder = (token: string, refresh: string, expiration: Date) =>{
  const refresh_exp_sec = Math.round(expiration.getTime()/1000);

  return {
    access_token: token,
    token_type: "jws",
    expires_in: env.OAUTH2_ACCESS_TOKEN_EXP_SECONDS,
    refresh_token: refresh,
    refresh_expires: refresh_exp_sec,
    scope: "user"
  }
}
