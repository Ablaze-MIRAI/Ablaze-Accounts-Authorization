"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignTitle } from "@/components/elements/SignTitle";
import { Separate } from "@/components/elements/Separate";
import { withContinueQuery } from "@/library/utils";
import { SignMethods } from "../signmethods";
import { CanaryAlert } from "../../../../components/modules/beta-alert";

export default function SigninPage(){
  const query = useSearchParams();

  return (
    <>
      <SignTitle title="アカウントにログイン"/>
      <CanaryAlert/>
      <SignMethods type="signin">
        <Separate text="または"/>
        <Button variant="secondary" asChild>
          <Link href={{ pathname: "/signup", query: withContinueQuery(query) }} scroll={false}>アカウントを作成する</Link>
        </Button>
      </SignMethods>
    </>
  );
}
