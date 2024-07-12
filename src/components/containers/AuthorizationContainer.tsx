import type { ReactNode } from "react";
import Image from "next/image";
import AblazeLogoBlack from "@/assets/logo/black.svg";

export const AuthorizationContainer = ({ children }: Readonly<{ children: ReactNode }>) =>{
  return (
    <>
      <header className="fixed top-0 left-0 z-30 w-full h-[10svh] px-4 sm:px-16 flex justify-between items-center">
        <div className="h-1/2">
          <a href="/" title="Ablaze Accounts">
            <Image src={AblazeLogoBlack} width={0} height={0} alt="Ablaze Logo" className="h-full w-auto" priority={true}/>
          </a>
        </div>
      </header>
      <div className="h-[100svh] flex justify-center items-center">
        <main className="border border-zinc-300 rounded-md p-8 w-full max-w-96 mx-3">
          {children}
        </main>
      </div>
    </>
  );
};
