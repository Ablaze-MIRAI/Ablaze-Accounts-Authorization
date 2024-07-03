"use client";

// React/Next
import { useEffect } from "react";
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { SignContainer } from "@/components/layouts/SignContainer";
import { SigninEmailVerifyForm } from "@/components/parts/SigninEmailForm";
import { PageProps } from "@/typings/page";

export default function SigninEmail(){
  return (
    <SignContainer title="アカウントにログイン - Eメール">
      <div className="space-y-2">
        <SigninEmailVerifyForm/>
        <Button variant="secondary" className="w-full" asChild>
          <Link href="/signin">戻る</Link>
        </Button>
      </div>
    </SignContainer>
  );
}
