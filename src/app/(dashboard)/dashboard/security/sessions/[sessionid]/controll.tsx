"use client";

import { SubmitButton } from "@/components/props/SubmitButton";
import { deleteSession } from "./action";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export function DeleteSession({ sessionid }: { sessionid: string }){
  const { toast } = useToast();
  const [lastResult, action] = useFormState(async () => await deleteSession(sessionid), undefined);

  useEffect(() =>{
    if(!lastResult) return;

    toast({
      title: "セッションを削除しました"
    });
  }, [lastResult, toast]);

  return (
    <form action={action}>
      <SubmitButton variant="destructive">このセッションを削除</SubmitButton>
    </form>
  );
}
