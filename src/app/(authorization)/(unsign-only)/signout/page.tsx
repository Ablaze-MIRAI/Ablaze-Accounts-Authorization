import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AccountSignout(){
  return (
    <section className="space-y-8">
      <h1 className="text-3xl">
        <i className="ri-checkbox-circle-line text-green-400 mr-1"></i>
        ログアウトが完了しました！
      </h1>
      <Button variant="default" className="w-full" asChild>
        <Link href="/dashboard">トップページへ</Link>
      </Button>
    </section>
  );
}
