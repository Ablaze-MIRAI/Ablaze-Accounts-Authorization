"use server";

import { z } from "zod";
import { EmailSignupSchema, EmailSignupVerifySchema } from "@a3/common/schemas/signup-email";
import { Result } from "@/typings/server";

const Delay = async (time: number): Promise<void> => await new Promise((r, _) => setTimeout(() => r(), time));

export const RegisterAndEmailVerify = async (data: z.infer<typeof EmailSignupSchema>): Promise<Result> =>{
  console.log("[Backend]", JSON.stringify(data));
  await Delay(2000);
  return { success: true, code: 1001 }
};

export const VerifyEmail = async (data: z.infer<typeof EmailSignupVerifySchema>): Promise<Result> =>{
  console.log("[Backend]", JSON.stringify(data))
  await Delay(1500);
  return { success: false, code: 1001 }
}
