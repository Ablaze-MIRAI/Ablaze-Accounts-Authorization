import { z } from "zod";
import { EmailSigninSchema } from "@a3/common/schemas/signin-email";
import { Result } from "@/typings/server";


const Delay = async (time: number): Promise<void> => await new Promise((r, _) => setTimeout(() => r(), time));

export const EmailSigninVerify = async (data: z.infer<typeof EmailSigninSchema>): Promise<Result> =>{
  console.log("[Backend]", JSON.stringify(data));
  await Delay(2000);
  return { success: true, code: 1001 }
};
