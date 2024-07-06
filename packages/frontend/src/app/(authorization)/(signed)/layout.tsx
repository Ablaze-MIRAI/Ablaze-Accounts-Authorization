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
  if(headers().get("middleware-session-revived") === "1"){
    const requesturl = headers().get("middleware-request-url");
    if(!requesturl) throw Error("Error Middleware");
    redirect(requesturl);
  };

  const cookie = cookies().getAll();

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
