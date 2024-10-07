"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { SignoutAction } from "./actions";
import { useState } from "react";
import { Loader } from "@/components/elements/Loader";

// ToDo: ログアウトにローディングをつける
export const DialogNavigation = () =>{
  const [loading, setLoading] = useState(false);

  const onclick = async () =>{
    setLoading(true);
    await SignoutAction();
  };

  return (
    <div className="flex space-x-3 justify-end">
      <Button variant="destructive" onClick={onclick} disabled={loading}>
        <Loader loading={loading}/>
        続行
      </Button>
      <DialogClose asChild><Button variant="outline">戻る</Button></DialogClose>
    </div>
  );
};
