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
  description: "すべてのAblazeサービスが利用できるアカウントサービスです",
  openGraph: {
    title: "Ablaze Accounts",
    description: "すべてのAblazeアプリをこれひとつで",
    type: "website",
    url: "https://accounts.ablaze.one",
    images: "https://cdn.ablaze.one/ogp/ablazeaccounts.png",
    siteName: "Ablaze Accounts"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ablaze Accounts",
    description: "すべてのAblazeアプリをこれひとつで",
    images: "https://cdn.ablaze.one/ogp/ablazeaccounts.png"
  }
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
