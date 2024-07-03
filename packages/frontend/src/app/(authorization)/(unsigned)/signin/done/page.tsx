"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SigninDone(){
  useEffect(() =>{
    const callback = sessionStorage.getItem("callback");
    const limit = sessionStorage.getItem("callback_limit");
    sessionStorage.removeItem("callback");
    if(callback && Number(limit ?? 0) > new Date().getTime()) window.location.href = callback;
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-xl">リダイレクトしています</h1>
      <Button asChild>
        <Link href="/account">再ロード</Link>
      </Button>
    </div>
  );
}
