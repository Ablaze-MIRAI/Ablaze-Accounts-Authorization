"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignTitle } from "@/components/props/SignTitle";
import { Separate } from "@/components/props/Separate";
import { withContinueQuery } from "@/library/utils";
import { SignMethods } from "../signmethods";

export default function SignupPage(){
  const query = useSearchParams();

  return (
    <>
      <SignTitle title="アカウントを作成"/>
      <SignMethods type="signup">
        <Separate text="または"/>
        <Button variant="secondary" asChild>
          <Link href={{ pathname: "/signin", query: withContinueQuery(query) }} scroll={false}>ログインする</Link>
        </Button>
      </SignMethods>
    </>
  );
}
