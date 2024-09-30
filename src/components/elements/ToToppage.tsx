import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ToTopage(){
  return (
    <Button variant="outline" asChild>
      <Link href="/">トップページへ</Link>
    </Button>
  );
}
