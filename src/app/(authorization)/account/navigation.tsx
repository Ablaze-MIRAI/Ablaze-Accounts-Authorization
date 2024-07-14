"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { SignoutAction } from "./actions";

// ToDo: ログアウトにローディングをつける
export const DialogNavigation = () =>{
  const onclick = async () => await SignoutAction();

  return (
    <div className="flex space-x-3 justify-end">
      <Button variant="destructive" onClick={onclick}>続行</Button>
      <DialogClose asChild><Button variant="outline">戻る</Button></DialogClose>
    </div>
  );
};
