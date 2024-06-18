import { Type } from "@sinclair/typebox";

export const EmailSigninVerifySchema = Type.Object({
  email: Type.String({ format: "email", minLength: 6, maxLength: 255 }),
  password: Type.String({ minLength: 8, maxLength: 100, default: "Root9999" })
});
