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

import { EmailSignupSchema } from "@a3/common/schemas/signup-email";
import { SubmitClientHandler } from "@/library/submitclienthandler";
import { RegisterAndEmailVerify } from "@/library/server/signup-email";

export const SignupEmailForm = () =>{
  const router = useRouter();
  const toast = useToast();
  const [ sending, setSending ] = useState(false);

  type SchemaType = z.infer<typeof EmailSignupSchema>;
  const form = useForm<SchemaType>({
    resolver: zodResolver(EmailSignupSchema),
    defaultValues: { email: "", password: "", retype: "" },
    mode: "onChange"
  });


  const onSubmit = async (data: SchemaType) =>{
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField onSubmit={form.handleSubmit(onSubmit)} control={form.control} name="email" render={({ field }) =>(
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
                <Input type="password" autoComplete="new-password" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
          <FormField control={form.control} name="retype" render={({ field }) =>(
            <FormItem>
              <FormLabel>再度入力</FormLabel>
              <FormControl>
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
