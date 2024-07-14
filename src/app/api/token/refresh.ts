import { NextResponse } from "next/server";
import environment from "@/environment";
import { signToken } from "@/library/jwt";
import { generateOAuth2Refresh } from "@/library/keygenerator";
import { getRefreshTokenByToken, updateOAuth2Refresh } from "@/data/oauth2";

export const RefreshToken = async (form: FormData) =>{
  const refresh_token = form.get("refresh_token") as string | null;
  if(!refresh_token) return NextResponse.json({ error: "invalid_request", message: "! refresh" }, { status: 400 });

  const refreshtoken_info = await getRefreshTokenByToken(refresh_token);
  if(!refreshtoken_info) return NextResponse.json({ error: "invalid_grant", message: "? refresh" }, { status: 400 });
  if(refreshtoken_info.updatedAt.getTime()+environment.OIDC_REFRESH_EXPIRES*1000 < new Date().getTime()) return NextResponse.json({ error: "invalid_grant", message: "! time" }, { status: 400 });

  const newtoken = generateOAuth2Refresh();
  await updateOAuth2Refresh(refresh_token, newtoken);

  const user = refreshtoken_info.user;
  const jws_token = signToken({
    name: user.screen_name,
    avatar: user.avatar,
    role: user.account_type
  }, user.uid, [environment.OIDC_JWT_ISSUER, refreshtoken_info.client_id]);

  return NextResponse.json({
    access_token: jws_token,
    token_type: "Bearer",
    expires_in: environment.OIDC_JWS_EXPIRES,
    refresh_token: newtoken,
    refresh_expires_in: environment.OIDC_REFRESH_EXPIRES,
    scope: refreshtoken_info.scope
  });
};
