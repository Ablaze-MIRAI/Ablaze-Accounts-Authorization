// React/Next
import Image from "next/image";
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Utility
import { getSession } from "@/library/session";
import { DialogNavigation } from "./navigation";

export default async function AccountRoot(){
  const user = await getSession();
  if(!user) return;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <div className="block relative h-24 w-24">
          <Image className="rounded-full" src={user.avatar} alt="[avatar]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill priority/>
        </div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
      </div>
      <div className="space-y-1">
        <Button variant="default" className="w-full" asChild>
          <Link href="/dashboard">アカウントダッシュボードを開く</Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full">ログアウト</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ログアウトを続行しますか?</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DialogNavigation/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
