import { z } from "zod";

export const EmailSignupSchema = z.object({
  email: z.string().min(6).max(255).email(),
  password: z.string().min(8).max(48).regex(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9\\W]{8,48}$/),
  retype: z.string().min(8).max(48).regex(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9\\W]{8,48}$/)
}).superRefine(({ password, retype }, ctx) =>{
  if(password !== retype) ctx.addIssue({
    path: ["retype"],
    code: "custom",
    message: "パスワードが一致しません"
  });
});
