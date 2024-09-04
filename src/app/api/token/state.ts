import { NextResponse } from "next/server";
import { getRefreshTokenByToken } from "@/data/oauth2";
import environment from "@/environment";

export const TokenState = async (form: FormData) =>{
  const refresh_token = form.get("refresh_token") as string | null;
  if(!refresh_token) return NextResponse.json({ error: "invalid_request", state: "no", message: "! refresh" }, { status: 400 });

  const refreshtoken_info = await getRefreshTokenByToken(refresh_token);
  console.log(refreshtoken_info);
  if(!refreshtoken_info) return NextResponse.json({ error: "invalid_grant", state: "no", message: "? refresh" }, { status: 400 });
  if(refreshtoken_info.updatedAt.getTime()+environment.OIDC_REFRESH_EXPIRES*1000 < new Date().getTime()) return NextResponse.json({ error: "invalid_grant", state: "no", message: "! time" }, { status: 400 });

  return NextResponse.json({
    state: "ok"
  }, { status: 200 });
};
