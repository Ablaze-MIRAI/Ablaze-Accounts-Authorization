"use client";

import { SubmitButton } from "@/components/props/SubmitButton";
import { deleteSession } from "./action";
import { toast } from "sonner";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export function DeleteSession({ sessionid }: { sessionid: string }){
  const [lastResult, action] = useFormState(async () => await deleteSession(sessionid), undefined);

  useEffect(() =>{
    if(!lastResult) return;

    toast("セッションを削除しました");
  }, [lastResult]);

  return (
    <form action={action}>
      <SubmitButton variant="destructive">このセッションを削除</SubmitButton>
    </form>
  );
}
