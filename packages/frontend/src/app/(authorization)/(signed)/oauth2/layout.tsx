// React/Next
import { ReactNode } from "react";
import { cookies } from "next/headers";

export default async function OAuth2RootLayout({ children }: Readonly<{ children: ReactNode }>){
  const signed = true

  return (
    <>
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
