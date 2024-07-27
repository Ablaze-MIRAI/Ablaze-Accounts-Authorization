"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignTitle } from "@/components/props/SignTitle";
import { ContinueCreateAccounts } from "@/components/modules/continue-create-accounts";
import { withContinuePage } from "@/library/utils";
import { startAuthorize } from "./actions";

export default function SignupEmail({ searchParams }: { searchParams: { continue: string } }){
  return (
    <div className="space-y-4">
      <SignTitle title="アカウントを作成 - GitHub"/>
      <ContinueCreateAccounts/>
      <div className="space-y-2">
        <Button onClick={() => startAuthorize()} variant="default" className="w-full mt-2">
          続行する
        </Button>
        <Button variant="secondary" className="w-full mt-2" asChild>
          <Link href={{ pathname: "/signup", query: withContinuePage(searchParams.continue) }}>戻る</Link>
        </Button>
      </div>
    </div>
  );
}
