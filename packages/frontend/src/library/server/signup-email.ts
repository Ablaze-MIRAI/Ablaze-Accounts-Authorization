import { z } from "zod";
import { EmailSignupSchema } from "@a3/common/schemas/signup-email";
import { Result } from "@/typings/server";

const Delay = async (time: number): Promise<void> => await new Promise((r, _) => setTimeout(() => r(), time));

export const RegisterAndEmailVerify = async (data: z.infer<typeof EmailSignupSchema>): Promise<Result> =>{
  await Delay(2000);
  return { success: true, code: 1001 }
};
