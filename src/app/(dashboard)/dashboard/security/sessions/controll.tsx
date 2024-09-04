"use client";

import { SubmitButton } from "@/components/props/SubmitButton";
import { deleteAllSession } from "./actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export const DeleteAllSession = () =>{
  const [lastResult, action] = useFormState(deleteAllSession, undefined);

  useEffect(() =>{
    if(!lastResult) return;
    toast("すべてのセッションを削除しました");
  }, [lastResult]);

  return (
    <form action={action}>
      <SubmitButton variant="destructive">
        すべてのセッションを削除
      </SubmitButton>
    </form>
  );
};
