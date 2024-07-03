// React/Next
import React, { Suspense } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

// Library
import { PleaseSignin, Fallback } from "@/components/parts/authorization/SignLayoutContent";

export default function AuthorizationRootLayout({ children }: Readonly<{ children: React.ReactNode }>){
  return (
    <Suspense fallback={<Fallback/>}>
      <AuthorizationContainer>
        {children}
      </AuthorizationContainer>
    </Suspense>
  );
}

const AuthorizationContainer = async ({ children }: Readonly<{ children: React.ReactNode }>) =>{
  const requesturl = headers().get("middleware-request-url");
  console.log(requesturl);
  const cookie = cookies().getAll();

  if(!cookie.find(v => v.name === "backendsession") && cookie.find(v => v.name === "hukkatunojyumon")) return redirect(`/pending?callback=${requesturl}`);

  const response = await fetch("http://localhost:3000/api/user/info", {
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie.map(v => `${v.name}=${v.value}`).join(";")
    }
  }).then(response => response.json());

  if(!response.success) return <PleaseSignin/>;

  return (
    <>
      {children}
    </>
  );
}
