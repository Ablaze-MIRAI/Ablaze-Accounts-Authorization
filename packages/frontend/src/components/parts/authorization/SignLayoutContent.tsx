"use client";

// React/Next
import { useEffect } from "react";
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

export const PleaseSignin = () =>{
  useEffect(() =>{
    const url = window.location.href;
    sessionStorage.setItem("callback", url);
    sessionStorage.setItem("callback_limit", (new Date().getTime()+1000*60*20).toString());
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl">アカウントにログインしましょう!</h1>
      <Button className="w-full" asChild>
        <Link href="/signin">ログイン</Link>
      </Button>
    </div>
  )
}

export const Fallback = () =>{
  return (
    <div>
      <h1 className="text-2xl">読み込み中...</h1>
    </div>
  )
};
