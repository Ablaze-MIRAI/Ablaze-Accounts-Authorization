"use client";

import { SignTitle } from "@/components/elements/SignTitle";
import { SigninEmailForm } from "./form";

export default function SignupEmail(){
  return (
    <>
      <SignTitle title="アカウントにログイン - Eメール"/>
      <SigninEmailForm/>
    </>
  );
}
