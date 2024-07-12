"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "@/library/session";

export const SignoutAction = async () =>{
  await deleteSession();
  redirect("/");
};
