"use client";

// React/Next
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { SignContainer } from "@/components/layouts/SignContainer";
import { SignMethodLinksContainer, SignMethodLinks, SignSeparate } from "@/components/layouts/SignMethods";

// Typings
import { PageProps } from "@/typings/page";
import { useEffect } from "react";

export default function SigninRoot(){
  useEffect(() =>{
    const callback = sessionStorage.getItem("callback");
    if(!callback){
      sessionStorage.setItem("callback", "/myaccounts");
      sessionStorage.setItem("callback_limit", (new Date().getTime()+1000*60*20).toString());
    };
  })

  return (
    <SignContainer title="アカウントにログイン">
      <SignMethodLinksContainer>
        <SignMethodLinks type="signin"/>
        <SignSeparate or="または"/>
        <Button variant="secondary" asChild>
          <Link href={`/signup`}>登録する</Link>
        </Button>
      </SignMethodLinksContainer>
    </SignContainer>
  );
}
