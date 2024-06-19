import { z } from "zod";
import { EmailSignupSchema, EmailSignupVerifySchema } from "@a3/common/schemas/signup-email";
import { Result } from "@/typings/server";
import env from "@/library/env";

const Delay = async (time: number): Promise<void> => await new Promise((r, _) => setTimeout(() => r(), time));

export const RegisterAndEmailVerify = async (data: z.infer<typeof EmailSignupSchema>, lang: string): Promise<Result> =>{
  const result = await fetch(`${env.API_ENDPOINT}/auth/email/signup/register`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      lang: lang
    })
  });
  const response = await result.json() as Result;
  if(!response.success) throw Error(`RequestError: ${response.code}`);
  return response
};

export const VerifyEmail = async (data: z.infer<typeof EmailSignupVerifySchema>): Promise<Result> =>{
  console.log("[Backend]", JSON.stringify(data))
  await Delay(1500);
  return { success: true, code: 1001 }
}
