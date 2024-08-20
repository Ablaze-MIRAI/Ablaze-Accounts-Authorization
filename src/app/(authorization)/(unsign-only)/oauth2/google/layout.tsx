"use client";

import { ErrorState } from "@/store/state/error";
import { useAtomValue } from "jotai";
import { ReactNode } from "react";
import { UnknownError } from "@/components/props/Error";

export default function OAuth2GoogleLayout({ children }: { children: ReactNode }){
  const error_state = useAtomValue(ErrorState);

  if(error_state) return (<UnknownError/>);
  return children;
};
