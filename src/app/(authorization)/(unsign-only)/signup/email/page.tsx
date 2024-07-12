"use client";

import { useState } from "react";
import { SignTitle } from "@/components/props/SignTitle";
import { SignupEmailForm, SignupEmailVerifyForm } from "./form";
import { Done } from "../done";

export default function SignupEmail(){
  const [signupstate, setSignupState] = useState("input");

  return (
    <>
      <SignTitle title="アカウントを作成 - Eメール"/>
      {signupstate === "input" && <SignupEmailForm setSignupState={setSignupState}/>}
      {signupstate === "pin" && <SignupEmailVerifyForm setSignupState={setSignupState}/>}
      {signupstate === "done" && <Done/>}
    </>
  );
}
