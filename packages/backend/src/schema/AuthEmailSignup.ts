import { Type } from "@sinclair/typebox";

export const EmailSignupRegisterSchema = Type.Object({
  email: Type.String({ format: "email", maxLength: 255, minLength: 6 }),
  password: Type.String({ minLength: 8, maxLength: 100, default: "Root9999" }),
  lang: Type.String({ minLength: 2, maxLength: 5, default: "en" })
});

export const EmailSignupVerifypinSchema = Type.Object({
  pin: Type.Number({ minimum: 1, maximum: 999999 })
})
