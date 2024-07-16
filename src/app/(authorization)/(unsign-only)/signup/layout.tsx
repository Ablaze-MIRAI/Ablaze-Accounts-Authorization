import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アカウントを作成 - Ablaze Accounts"
};

export default function SignupLayout({ children }: { children: ReactNode }){
  return children;
}
