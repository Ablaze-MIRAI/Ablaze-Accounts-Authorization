import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OAuth2GoogleError(){
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-red-400">エラー / ERROR</h1>
      <Button variant="outline">
        <Link href="/">トップページ / Top Page</Link>
      </Button>
    </div>
  );
}
