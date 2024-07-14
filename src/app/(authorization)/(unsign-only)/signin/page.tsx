"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignTitle } from "@/components/props/SignTitle";
import { Separate } from "@/components/props/Separate";
import { withContinueQuery } from "@/library/utils";
import { SignMethods } from "../signmethods";

export default function SigninPage(){
  const query = useSearchParams();

  return (
    <>
      <SignTitle title="アカウントにログイン"/>
      <SignMethods type="signin">
        <Separate text="または"/>
        <Button variant="secondary" asChild>
          <Link href={{ pathname: "/signup", query: withContinueQuery(query) }} scroll={false}>アカウントを作成する</Link>
        </Button>
      </SignMethods>
    </>
  );
}
