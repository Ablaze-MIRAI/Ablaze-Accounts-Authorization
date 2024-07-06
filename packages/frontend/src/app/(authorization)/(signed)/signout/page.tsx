"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/parts/prop/Loader";

export default function Signout(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSignout = async () =>{
    setLoading(true);
    const response = await fetch("/api/auth/session/signout", { method: "DELETE" });
    const _result = await response.json();

    router.push("/");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">ログアウトします。よろしいですか?</h1>
      <div className="space-y-2">
        <Button variant="default" className="w-full" onClick={() => router.back()}>戻る</Button>
        <Button variant="destructive" className="w-full" onClick={onSignout}><Loader view={loading}/>ログアウトする</Button>
      </div>
    </div>
  )
}
