// React/Next
import React, { Suspense } from "react";
import Image from "next/image";

// Library

// UI
import { Toaster } from "@/components/ui/toaster";

// Assets
import AblazeLogoBlack from "@/images/logo/black.svg";
import { cookies } from "next/headers";

export default function AuthorizationRootLayout({ children }: Readonly<{ children: React.ReactNode }>){
  return (
    <Suspense fallback={<h1 className="text-3xl">Loading App...</h1>}>
      <AuthorizationContainer>
        {children}
      </AuthorizationContainer>
    </Suspense>
  );
}

const AuthorizationContainer = async ({ children }: Readonly<{ children: React.ReactNode }>) =>{
  const name = cookies().get("name");
  console.log(name);

  return (
    <>
      <header className="fixed top-0 left-0 z-30 w-full h-[10svh] px-4 sm:px-16 flex justify-between items-center">
        <div className="h-1/2">
          <a href="/" title="Ablaze Accounts">
            <Image src={AblazeLogoBlack} width={0} height={0} alt="Ablaze Logo" className="h-full w-auto" priority={true}/>
          </a>
        </div>
        <div>
          <h1 className="text-xl">{name?.value??"Not Value"}</h1>
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
