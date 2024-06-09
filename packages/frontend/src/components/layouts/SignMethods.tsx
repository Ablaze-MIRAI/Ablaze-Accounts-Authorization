// React/Next
import React from "react";
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

const MethodLink = ({ href, children }: { href: string, children: React.ReactNode }) =>{
  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export const SignMethodLinksContainer = ({ children }: { children: React.ReactNode }) =>{
  return <div className="mt-5 w-full flex flex-col space-y-2">{children}</div>;
}

export const SignMethodLinks = ({ type }: { type: "signup" | "signin" }) =>{
  return (
    <>
      <MethodLink href={`/${type}/email`}><i className="ri-mail-fill text-xl mr-1"></i>Eメール</MethodLink>
      <MethodLink href={`/${type}/github`}><i className="ri-github-fill text-xl mr-1"></i>GitHub</MethodLink>
      <MethodLink href={`/${type}/google`}><i className="ri-google-fill text-xl mr-1"></i>Google</MethodLink>
      <MethodLink href={`/${type}/twitter`}><i className="ri-twitter-fill text-xl mr-1"></i>Twitter</MethodLink>
      <MethodLink href={`/${type}/discord`}><i className="ri-discord-fill text-xl mr-1"></i>discord</MethodLink>
    </>
  )
}

export const SignSeparate = () =>{
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">または</span>
      </div>
    </div>
  );
}
