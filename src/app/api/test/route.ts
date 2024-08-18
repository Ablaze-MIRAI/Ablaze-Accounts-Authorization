// TODO: 削除する

import { o2google_setup_cookie } from "@/store/cookie/oauth2_google";
import { NextResponse } from "next/server";

export function GET(){
  o2google_setup_cookie.set({
    step: "1",
    name: "hello"
  });

  return NextResponse.json({ msg: "hello" });
}
