import { NextResponse } from "next/server";
import environment from "@/environment";
import OAuth2Application from "@/oauth2application";
import { generateOAuth2Refresh } from "@/library/keygenerator";
import { signToken } from "@/library/jwt";
import { createOAuth2Refresh, getOAuth2Code, getUserUid } from "@/data/oauth2";

export const IssueToken = async (form: FormData) =>{
  const client_id = form.get("client_id") as string | null;
  const redirect_uri = form.get("redirect_uri") as string | null;
  const code = form.get("code") as string | null;
  if(!client_id || !redirect_uri || !code) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const application = OAuth2Application[client_id];
  if(!application) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const codeinfo = await getOAuth2Code(code);
  if(!codeinfo) return NextResponse.json({ error: "invalid_grant" }, { status: 400 });

  if(application.client === "CONFIDENTIAL"){
    const client_secret = form.get("client_secret");
    if(!client_secret) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    if(application.client_secret !== client_secret) return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
  }

  const refresh_token = generateOAuth2Refresh();
  await createOAuth2Refresh(refresh_token, codeinfo);

  const user = await getUserUid(codeinfo.uid);
  if(!user) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const jws_token = signToken({
    name: user.screen_name,
    avatar: user.avatar,
    role: user.account_type
  }, codeinfo.uid, [environment.OIDC_JWT_ISSUER, codeinfo.client_id]);

  return NextResponse.json({
    access_token: jws_token,
    token_type: "Bearer",
    expires_in: environment.OIDC_JWS_EXPIRES,
    refresh_token: refresh_token,
    refresh_expires_in: environment.OIDC_REFRESH_EXPIRES,
    scope: codeinfo.scope
  });
};
