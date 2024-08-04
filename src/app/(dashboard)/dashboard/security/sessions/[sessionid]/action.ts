"use server";

import { deleteSessionDto } from "@/data/dashboard";
import { getSession } from "@/library/session";

export const deleteSession = async (sessionid: string) =>{
  const user = await getSession(false);
  if(!user) throw new Error("Not signed");

  await deleteSessionDto(user.uid, sessionid);

  return "ok";
};
