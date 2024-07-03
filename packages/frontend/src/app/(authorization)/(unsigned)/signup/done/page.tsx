import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupDone(){
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">すべて完了しました!</h1>
        <p>ようこそAblaze Accountsへ</p>
      </div>
      <Button className="w-full" asChild>
        <Link href="/signin">ログインする</Link>
      </Button>
    </div>
  );
}
