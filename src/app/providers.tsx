"use client";

import { ReactNode } from "react";
import { Provider } from "jotai";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      {children}
    </Provider>
  );
};
