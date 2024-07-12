"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { SignTitle } from "@/components/props/SignTitle";
import { Separate } from "@/components/props/Separate";
import { SignMethods } from "../../signmethods";
import { continueAtom } from "../state";

export default function SignupPage(){
  const query = useSearchParams();
  const [, setContinue] = useAtom(continueAtom);
  const continueuri = query.get("continue");
  if(continueuri) setContinue(continueuri);

  return (
    <>
      <SignTitle title="アカウントを作成"/>
      <SignMethods type="signup">
        <Separate text="または"/>
        <Button variant="secondary" asChild>
          <Link href="/signin" scroll={false}>ログインする</Link>
        </Button>
      </SignMethods>
    </>
  );
}
