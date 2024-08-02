"use server";

import { getSession } from "@/library/session";
import { deleteAllSessionDto } from "@/data/dashboard";

export const deleteAllSession = async () =>{
  const nowsession = await getSession();
  if(!nowsession) throw new Error("Not signed");

  await deleteAllSessionDto(nowsession.uid, nowsession.id);

  return "ok";
};
