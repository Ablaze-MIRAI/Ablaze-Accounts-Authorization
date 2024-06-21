"use client";

// React/Next
import { useRouter } from "next/navigation";

// UI
import { Button } from "@/components/ui/button";

export default function AccountNavs(){
  const router = useRouter();

  return (
    <div className="space-y-1">
      <Button variant="destructive" className="w-full">ログアウト</Button>
      <Button variant="default" className="w-full" onClick={() => router.back()}>戻る</Button>
    </div>
  )
}
