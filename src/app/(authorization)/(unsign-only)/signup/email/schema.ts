import { z } from "zod";

export const EmailSignupSchema = z.object({
  email: z.string().min(6).max(255).email(),
  // 記号,半角英数を許可。大文字小文字数字必須のパスワード
  password: z.string().min(8, "8文字以上で設定してください").max(48, "48文字以下で設定してください").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!-/:-@[-`{-~]+$/, "大文字小文字数字を含む半角英数記号にしてください"),
  retype: z.string()
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
