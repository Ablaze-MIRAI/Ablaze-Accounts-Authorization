"use client";

import { ReactNode, useEffect } from "react";
import { Provider as JotaiProvider } from "jotai";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() =>{
    console.log(
      "%c警告/Warning",
      "color: red; font-size: 2rem; background-color: yellow;");
    console.log(
      "%cここを操作したり何かを貼り付けることは、Self-XSSと呼ばれる攻撃を受ける可能性があります。",
      "color: red; font-size: 1.5rem; background-color: yellow;");
  });

  return (
    <JotaiProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
      <ProgressBar height="2px" options={{ showSpinner: false }} shallowRouting/>
    </JotaiProvider>
  );
};
