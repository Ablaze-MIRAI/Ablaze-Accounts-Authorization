import { z } from "zod"

export const EmailSignupRegister = z.object({
  email: z.string().min(6).max(255).email(),
  password: z.string().min(8).max(100)
});
