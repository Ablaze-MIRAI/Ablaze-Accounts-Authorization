import { z } from "zod";

export const EmailSignupSchema = z.object({
  email: z.string().min(6).max(255).email(),
  // 記号,半角英数を許可。大文字小文字数字必須のパスワード
  password: z.string().min(8).max(48).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!-/:-@[-`{-~]+$/),
  retype: z.string().min(8).max(48)
}).superRefine(({ password, retype }, ctx) =>{
  if(password !== retype) ctx.addIssue({
    path: ["retype"],
    code: "custom",
    message: "パスワードが一致しません"
  });
});

export const EmailSignupVerifySchema = z.object({
  pin: z.string().min(6).max(6).regex(/[0-9]{6}/)
});
