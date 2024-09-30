import { z } from "zod";

export const EmailResetSchema = z.object({
  email: z.string().min(6).max(255).email()
});
