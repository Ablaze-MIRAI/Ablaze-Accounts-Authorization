// React/Next
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const cookie = cookies().getAll();

  if(!cookie.find(v => v.name === "backendsession") && cookie.find(v => v.name === "hukkatunojyumon")) return redirect(`/account`);

  const response = await fetch("http://localhost:3000/api/user/info", {
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie.map(v => `${v.name}=${v.value}`).join(";")
    }
  }).then(response => response.json());

  if(response.success) redirect("/account");

  return (
    <>
      {children}
    </>
  );
}

const Fallback = () =>{

};
