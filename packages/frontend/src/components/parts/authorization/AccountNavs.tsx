"use client";

// React/Next
import { useRouter } from "next/navigation";
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

export const AccountAuthorizeNavs = () =>{
  const router = useRouter();

  return (
    <div className="space-y-1">
      <Button variant="destructive" className="w-full" asChild>
        <Link href="/signout">ログアウト</Link>
      </Button>
      <Button variant="default" className="w-full" onClick={() => router.back()}>戻る</Button>
    </div>
  )
}

export const AccountNavs = () =>{
  return (
    <div className="space-y-1">
      <Button variant="default" className="w-full" asChild>
        <Link href="/myaccounts">アカウントダッシュボードを開く</Link>
      </Button>
      <Button variant="destructive" className="w-full" asChild>
        <Link href="/signout">ログアウト</Link>
      </Button>
    </div>
  )
}
