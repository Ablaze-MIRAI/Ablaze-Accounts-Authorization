"use server";

import { createSession, getSession } from "@/library/session";
import { updateUserProfile } from "@/data/dashboard";

export const saveProfileAction = async (username: string) =>{
  const session = await getSession();
  if(!session) throw new Error("Not signed");

  const result = await updateUserProfile(session.uid, username);
  await createSession(session.uid);

  return result;
};
