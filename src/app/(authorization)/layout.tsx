import type { ReactNode } from "react";
import { AuthorizationContainer } from "@/components/containers/AuthorizationContainer";

export default async function AuthorizationLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AuthorizationContainer>
      {children}
    </AuthorizationContainer>
  );
}
