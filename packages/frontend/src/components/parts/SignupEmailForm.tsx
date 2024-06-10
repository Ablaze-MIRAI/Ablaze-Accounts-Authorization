"use client";

// React/Next
import { useState } from "react";
import { useRouter } from "next/navigation";

// Library
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Utility
import { SubmitClientHandler } from "@/library/submitclienthandler";
import { RegisterAndEmailVerify } from "@/library/server/signup-email";

// Schema
import { EmailSignupSchema } from "@a3/common/schemas/signup-email";

export const SignupEmailForm = () =>{
  const router = useRouter();
  const { toast } = useToast();
  const [ sending, setSending ] = useState(false);

  type SchemaType = z.infer<typeof EmailSignupSchema>;
  const form = useForm<SchemaType>({
    resolver: zodResolver(EmailSignupSchema),
    defaultValues: { email: "", password: "", retype: "" },
    mode: "onChange"
  });

  const onSubmit = async (data: SchemaType) => SubmitClientHandler<SchemaType>(
    data,
    async (data) =>  await RegisterAndEmailVerify(data),
    () => setSending(true),
    () => router.push("/signup/email/verify"),
    (code) =>{
      toast({
        title: `エラー (${code})`,
        description: `しばらくしてからお試しください`
      });
      router.push("/signup/");
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="email" render={({ field }) =>(
          <FormItem>
            <FormLabel>Eメール</FormLabel>
            <FormControl suppressHydrationWarning={true}>
              <Input type="email" autoComplete="email" autoFocus={true} placeholder="user@example.com" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}/>
        <FormField control={form.control} name="password" render={({ field }) =>(
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl suppressHydrationWarning={true}>
                <Input type="password" autoComplete="new-password" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
          <FormField control={form.control} name="retype" render={({ field }) =>(
            <FormItem>
              <FormLabel>再度入力</FormLabel>
              <FormControl suppressHydrationWarning={true}>
                <Input type="password" autoComplete="new-password" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
          <Button type="submit" className="w-full" disabled={sending}>登録</Button>
      </form>
    </Form>
  )
};
