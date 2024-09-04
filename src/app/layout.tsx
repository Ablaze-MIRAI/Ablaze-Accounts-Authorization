import "remixicon/fonts/remixicon.css";
import "./globals.css";

import { M_PLUS_2 } from "next/font/google";
import { type ReactNode } from "react";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/app/providers";
import { general } from "@/constants";

const mplus2 = M_PLUS_2({
  weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
  preload: false
});

export const metadata: Metadata = {
  title: general.APP_COMMON_TITLE,
  description: general.APP_SHORT_DESCRIPTION,
  openGraph: {
    title: general.APP_NAME,
    description: general.APP_SUBTITLE,
    type: "website",
    url: general.APP_URL,
    images: general.OGP_IMAGE_URI,
    siteName: general.APP_NAME
  },
  twitter: {
    card: "summary_large_image",
    title: general.APP_NAME,
    description: general.APP_SUBTITLE,
    images: general.OGP_IMAGE_URI
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
