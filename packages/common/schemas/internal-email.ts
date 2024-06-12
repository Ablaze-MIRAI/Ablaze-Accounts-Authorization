import { z } from "zod";

export const SendVerifySchema = z.object({
  email: z.string().min(6).max(255).email()
});
