"use client";

import { TitleAuth } from "@/components/elements/TitleAuth";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailResetSchema } from "@/schema/auth/email";
import { onSubmit } from "@/logic/auth/email/reset";

export function EmailResetView(){
  const form = useForm<z.infer<typeof EmailResetSchema>>({
    resolver: zodResolver(EmailResetSchema),
    defaultValues: { email: "" },
    mode: "onChange"
  });

  return (
    <>
      <TitleAuth>Eメール - パスワードをリセット</TitleAuth>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        </form>
      </Form>
    </>
  );
}
