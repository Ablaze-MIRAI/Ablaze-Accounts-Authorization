import { z } from "zod";
import { EmailSignupSchema, EmailSignupVerifySchema } from "@a3/common/schemas/signup-email";
import { Result } from "@/typings/server";
import env from "@/library/env";

export const RegisterAndEmailVerify = async (data: z.infer<typeof EmailSignupSchema>, lang: string): Promise<Result> =>{
  const result = await fetch(`/api/auth/email/signup/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      lang: lang
    })
  });
  const response = await result.json() as Result;
  return response;
};

export const VerifyEmail = async (data: z.infer<typeof EmailSignupVerifySchema>): Promise<Result> =>{
  const result = await fetch(`/api/auth/email/signup/verifypin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      pin: data.pin
    })
  });
  const response = await result.json() as Result;
  return response;
}
