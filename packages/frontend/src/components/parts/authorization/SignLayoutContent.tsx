"use client";

// React/Next
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

export const PleaseSignin = () =>{
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
