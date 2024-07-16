import "./globals.css";
import "remixicon/fonts/remixicon.css";

import { M_PLUS_2 } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/app/providers";

const mplus2 = M_PLUS_2({
  weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
  preload: false
});

export const metadata: Metadata = {
  title: "Ablaze Accounts - すべてのAblazeサービスをこれひとつで",
  description: "これひとつでAblazeサービスを利用できるアカウントサービスです",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>){
  return (
    <html lang="ja">
      <body className={mplus2.className}>
        <Providers>
          {children}
          <Toaster/>
        </Providers>
      </body>
    </html>
  );
}
