import { Suspense } from "react";
import type { ReactNode } from "react";

export default function GitHubCallbackLayout({ children }: { children: ReactNode }){
  return (
    <Suspense>
      {children}
    </Suspense>
  );
}
