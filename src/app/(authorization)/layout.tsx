import type { ReactNode } from "react";
import { AuthorizationContainer } from "@/components/containers/AuthorizationContainer";

export default async function AuthorizationLayout({ children }: Readonly<{ children: ReactNode }>) {
  /*const session = await getSession(false);
  if(session) redirect("/account");*/

  return (
    <AuthorizationContainer>
      {children}
    </AuthorizationContainer>
  );
}
