"use client";

import { ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SelfXSSWarning } from "@/components/modules/self-xss-warning";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <JotaiProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
      <ProgressBar height="2px" options={{ showSpinner: false }} shallowRouting/>
      <SelfXSSWarning/>
    </JotaiProvider>
  );
};
