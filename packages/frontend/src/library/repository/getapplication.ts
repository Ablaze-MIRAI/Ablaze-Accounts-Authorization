"use server";

import { cookies } from "next/headers";
import { Result } from "@/typings/common";
import { FetchWithCookie, NextAdapter } from "../fetch-with-cookie";
import { ResultFailure, ResultSuccess } from "../result";
import ResultCode from "../ResultCode";

export const getApplication = async (client_id: string, redirect_uri: string) =>{
  const cookie = cookies().getAll();

  const response = await fetch("http://localhost:3000/api/oauth2/verifyapplication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie.map(v => `${v.name}=${v.value}`).join(";")
    },
    body: JSON.stringify({
      client_id: client_id,
      redirect_uri: redirect_uri
    })
  }).then(response => response.json());

  return response;
}
