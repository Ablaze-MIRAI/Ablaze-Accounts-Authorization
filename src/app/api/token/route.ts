import { NextResponse, type NextRequest } from "next/server";
import { IssueToken } from "./issue";
import { RefreshToken } from "./refresh";

export const POST = async (request: NextRequest) =>{
  const form = await request.formData();

  const grant_type = form.get("grant_type");
  if(!grant_type) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  if(grant_type === "authorization_code"){
    return await IssueToken(form);
  }else if(grant_type === "refresh_token"){
    return await RefreshToken(form);
  }else{
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
};
