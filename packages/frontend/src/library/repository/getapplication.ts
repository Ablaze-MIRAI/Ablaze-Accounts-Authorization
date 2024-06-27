"use server";

import { cookies } from "next/headers";
import { Result } from "@/typings/common";
import { FetchWithCookie, NextAdapter } from "../fetch-with-cookie";
import { ResultFailure, ResultSuccess } from "../result";
import ResultCode from "../ResultCode";

export const getApplication = async (client_id: string, redirect_uri: string): Promise<Result<{ name: string }>> =>{
  "use server";
  try{
    const response = await FetchWithCookie("http://localhost:3000/api/oauth2/verifyapplication", {
      cookieAdapter: NextAdapter(cookies()),
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        redirect_uri: redirect_uri
      })
    });
    const data = await response.json();

    return ResultSuccess(ResultCode.SUCCESS, { name: data.name });
  }catch(e){
    console.error(e);
    return ResultFailure(ResultCode.HTTPFAIL)
  }
}
