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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Utility
import { SubmitClientHandler } from "@/library/submitclienthandler";
import { EmailSigninVerify } from "@/library/repository/signin-email";

// Schema
import { EmailSigninSchema } from "@a3/common/schemas/signin-email";

export const SigninEmailVerifyForm = () =>{
  const router = useRouter();
  const { toast } = useToast();
  const [ sending, setSending ] = useState(false);

  type SchemaType = z.infer<typeof EmailSigninSchema>;
  const form = useForm<SchemaType>({
    resolver: zodResolver(EmailSigninSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange"
  });

  const onSubmit = (data: SchemaType) => SubmitClientHandler(
    data,
    async (data) => await EmailSigninVerify(data),
    () => setSending(true),
    () => router.push("/signin/done"),
    (code) =>{
      switch(code){
        case 2012:
          toast({
            title: `ログインに失敗 (${code})`,
            description: `Eメールまたはパスワードが間違っています`
          });
          setSending(false);
          break;
        default:
          toast({
            title: `エラー (${code})`,
            description: `しばらくしてからお試しください`
          });
          router.push("/signin/");
      }
    }
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="email" render={({ field }) =>(
          <FormItem>
            <FormLabel>Eメール</FormLabel>
            <FormControl>
              <Input type="email" autoComplete="email" autoFocus={true} placeholder="user@example.com" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}/>
        <FormField control={form.control} name="password" render={({ field }) =>(
          <FormItem>
            <FormLabel>パスワード</FormLabel>
            <FormControl>
              <Input type="password" autoComplete="current-password" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}/>
        <Button type="submit" className="w-full" disabled={sending}>ログインする</Button>
      </form>
    </Form>
  )
};
