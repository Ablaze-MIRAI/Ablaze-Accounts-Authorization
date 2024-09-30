"use client";

import { z } from "zod";
import { EmailResetSchema } from "@/schema/auth/email";

export const onSubmit = async (data: z.infer<typeof EmailResetSchema>) =>{
  console.log(data);
};
