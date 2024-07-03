"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Signout(){
  const router = useRouter();

  const onSignout = async () =>{
    console.log("Running")
    const response = await fetch("/api/auth/session/signout", { method: "DELETE" });
    const result = await response.json();

    router.push("/");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">ログアウトします。よろしいですか?</h1>
      <div className="space-y-2">
        <Button variant="default" className="w-full" onClick={() => router.back()}>戻る</Button>
        <Button variant="destructive" className="w-full" onClick={onSignout}>ログアウトする</Button>
      </div>
    </div>
  )
}
