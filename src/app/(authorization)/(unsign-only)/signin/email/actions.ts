"use server";

import { getUserWithEmail } from "@/data/email";
import { createSession } from "@/library/session";
import { compareSync } from "bcrypt";

type SubmitActionResultType = "notexist" | "ok";
export const onSubmitAction = async (email: string, hashed_password: string): Promise<SubmitActionResultType> =>{
  const user = await getUserWithEmail(email);
  if(!user) return "notexist";
  if(!compareSync(hashed_password, user.password)) return "notexist";

  await createSession(user.uid);

  return "ok";
};
