import Link from "next/link";
import { Button } from "@/components/ui/button";

export const BadRequest = () =>{
  return (
    <div className="space-y-3">
      <h1 className="text-2xl">不正なリクエスト</h1>
      <Button variant="outline" asChild>
        <Link href="/">トップページへ</Link>
      </Button>
    </div>
  );
};
