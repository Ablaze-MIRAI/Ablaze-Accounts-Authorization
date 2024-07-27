import { z } from "zod";

export const EditProfileSchema = z.object({
  username: z.string().min(1, "1文字以上で入力してください").max(50, "50文字以下で入力してください")
});
