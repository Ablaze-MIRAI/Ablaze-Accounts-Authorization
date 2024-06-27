"use server";

// React/Next
import { ReactNode } from "react";
import { cookies } from "next/headers";

export default async function OAuth2RootLayout({ children }: Readonly<{ children: ReactNode }>){
  //console.log("[OAuth2Layout]", result);
  const signed = true

  return (
    <>
      {/*<p>{result.status}</p>*/}
      {signed ? children : <UnsignedFallback/>}
    </>
  );
}

const UnsignedFallback = () =>{
  return (
    <>
      <p>Please signin</p>
    </>
  )
};
