import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/library/session";

export default async function AuthorizationLayout({ children }: Readonly<{ children: ReactNode }>) {
  const session = await getSession(false);
  if(session) return redirect("/account");

  return (
    <>
      {children}
    </>
  );
}
