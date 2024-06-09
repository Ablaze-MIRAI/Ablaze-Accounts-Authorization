// React/Next
import Image from "next/image";

// Library

// UI
import { Toaster } from "@/components/ui/toaster";

// Assets
import AblazeLogoBlack from "@/images/logo/black.svg";

export default function AuthorizationRootLayout({ children }: Readonly<{ children: React.ReactNode }>){
  return (
    <>
      <header className="fixed top-0 left-0 z-30 w-full h-[10svh] px-4 sm:px-16 flex justify-between items-center">
        <div className="h-1/2">
          <a href="/">
            <Image src={AblazeLogoBlack} width={165} height={38} alt="Ablaze Logo" className="h-full" priority={true}/>
          </a>
        </div>
      </header>
      <div className="h-[100svh] flex justify-center items-center">
        <main className="border border-zinc-300 rounded-md p-8 w-full max-w-96 mx-3">
          {children}
        </main>
      </div>
      <Toaster/>
    </>
  );
}
