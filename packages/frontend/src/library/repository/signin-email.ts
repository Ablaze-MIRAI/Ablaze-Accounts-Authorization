import { z } from "zod";
import { EmailSigninSchema } from "@a3/common/schemas/signin-email";
import { ResultServer } from "@/typings/server";

export const EmailSigninVerify = async (data: z.infer<typeof EmailSigninSchema>): Promise<ResultServer> =>{
  const result = await fetch(`/api/auth/email/signin/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  });
  const response = await result.json() as ResultServer;
  return response
};
