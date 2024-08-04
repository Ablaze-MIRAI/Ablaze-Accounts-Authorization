"use client";

import { SubmitButton } from "@/components/props/SubmitButton";
import { deleteAllSession } from "./actions";
import { useActionState, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";

export const DeleteAllSession = () =>{
  const { toast } = useToast();
  const [lastResult, action] = useFormState(deleteAllSession, undefined);

  useEffect(() =>{
    if(!lastResult) return;
    toast({
      title: "すべてのセッションを削除しました"
    });
  }, [toast, lastResult]);

  return (
    <form action={action}>
      <SubmitButton variant="destructive">
        すべてのセッションを削除
      </SubmitButton>
    </form>
  );
};
