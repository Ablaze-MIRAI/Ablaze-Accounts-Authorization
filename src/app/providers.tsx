"use client";

import { ReactNode } from "react";
import { Provider } from "jotai";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </Provider>
  );
};
