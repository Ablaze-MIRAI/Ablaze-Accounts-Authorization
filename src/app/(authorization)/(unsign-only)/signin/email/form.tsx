"use client";

// React/Next
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Library
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader } from "@/components/elements/Loader";

import { onSubmitAction } from "./actions";
import { EmailSigninSchema } from "./schema";
import { withContinue, withContinueQuery } from "@/library/utils";
import { SafetyURI } from "@/library/safety";

export const SigninEmailForm = () =>{
  const router = useRouter();
  const query = useSearchParams();
  const continue_uri = query.get("continue");
  const [submitting, setSubmit] = useState(false);

  type SchemaType = z.infer<typeof EmailSigninSchema>;
  const form = useForm<SchemaType>({
    resolver: zodResolver(EmailSigninSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange"
  });

  const onSubmit = async (data: SchemaType) =>{
    setSubmit(true);
    try{
      const result = await onSubmitAction(data.email, data.password);

      if(result === "notexist"){
        setSubmit(false);
        toast("メールアドレスまたはパスワードが異なります");

        return;
      }

      return router.push(continue_uri?SafetyURI(continue_uri):"/dashboard");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
      console.error(e);
      toast("予期しないエラーが発生しました", { description: e.message });
      return router.push(withContinue("/signin", continue_uri));
    }
  };

  return (
    <>
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
                <Input type="password" autoComplete="current-password" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
          <Button type="submit" className="w-full" disabled={submitting}><Loader loading={submitting}/>ログインする</Button>
        </form>
      </Form>
      {/*<Button variant="secondary" className={`w-full mt-2 ${submitting?"pointer-events-none":""}`} asChild>
        <Link href={{ pathname: "/signin/email/reset", query: withContinueQuery(query)}}>パスワードのリセット</Link>
      </Button>*/}
      <Button variant="secondary" className={`w-full mt-2 ${submitting?"pointer-events-none":""}`} asChild>
        <Link href={{ pathname: "/signin", query: withContinueQuery(query)}}>戻る</Link>
      </Button>
    </>
  );
};
