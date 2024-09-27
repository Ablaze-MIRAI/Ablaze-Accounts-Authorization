"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignTitle } from "@/components/elements/SignTitle";
import { Separate } from "@/components/elements/Separate";
import { withContinueQuery } from "@/library/utils";
import { SignMethods } from "../signmethods";
import { CanaryAlert } from "../beta-alert";

export default function SignupPage(){
  const query = useSearchParams();

  return (
    <>
      <SignTitle title="アカウントを作成"/>
      <CanaryAlert/>
      <SignMethods type="signup">
        <Separate text="または"/>
        <Button variant="secondary" asChild>
          <Link href={{ pathname: "/signin", query: withContinueQuery(query) }} scroll={false}>ログインする</Link>
        </Button>
      </SignMethods>
    </>
  );
}
