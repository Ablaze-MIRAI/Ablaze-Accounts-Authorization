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
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader } from "@/components/props/Loader";
import { ContinueCreateAccounts } from "@/components/modules/continue-create-accounts";

import { withContinue, withContinueQuery } from "@/library/utils";
import { onSubmitAction, onVerifyAction } from "./actions";
import { EmailSignupSchema, EmailSignupVerifySchema } from "./schema";

export const SignupEmailForm = ({ setSignupState }: { setSignupState: Function }) =>{
  const query = useSearchParams();
  const router = useRouter();
  const continue_uri = query.get("continue");
  const [ submitting, setSubmit ] = useState(false);

  type SchemaType = z.infer<typeof EmailSignupSchema>;
  const form = useForm<SchemaType>({
    resolver: zodResolver(EmailSignupSchema),
    defaultValues: { email: "", password: "", retype: "" },
    mode: "onChange"
  });

  const onSubmit = async (data: SchemaType) =>{
    setSubmit(true);
    try{
      const lang = window.navigator.language;
      const result = await onSubmitAction(data, lang);

      if(result === "exist"){
        setSubmit(false);
        return toast("このメールアドレスは既に使用されています");
      }

      if(result === "ok") return setSignupState("pin");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
      console.error(e);
      toast("予期しないエラーが発生しました", { description: e.message });
      return router.push(withContinue("/signup", continue_uri));
    }
    setSubmit(false);
    return;
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
                <Input type="password" autoComplete="new-password" {...field}/>
              </FormControl>
              <FormDescription>
                大文字,小文字,数字を含む半角英数８文字以上
              </FormDescription>
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
          <ContinueCreateAccounts/>
          <Button type="submit" className="w-full" disabled={submitting}><Loader loading={submitting}/> 作成する</Button>
        </form>
      </Form>
      <Button variant="secondary" className={`w-full mt-2 ${submitting?"pointer-events-none":""}`} asChild>
        <Link href={{ pathname: "/signup", query: withContinueQuery(query) }}>戻る</Link>
      </Button>
    </>
  );
};

export const SignupEmailVerifyForm = ({ setSignupState }: { setSignupState: Function }) =>{
  const router = useRouter();
  const query = useSearchParams();
  const continue_uri = query.get("continue");
  const [ submitting, setSubmit ] = useState(false);

  type SchemaType = z.infer<typeof EmailSignupVerifySchema>;
  const form = useForm<SchemaType>({
    resolver: zodResolver(EmailSignupVerifySchema),
    defaultValues: { pin: "" },
    mode: "onChange"
  });

  const onSubmit = async (data: SchemaType) =>{
    setSubmit(true);
    try{
      const result = await onVerifyAction(data.pin);

      if(result === "badrequest"){
        router.push(withContinue("/signup", continue_uri));
        return toast("リクエストに失敗しました", { description: "有効期限切れの可能性があります。最初からやり直してください。" });
      }

      if(result === "notmatch"){
        setSubmit(false);
        return toast("認証コードが間違っています");
      }

      if(result === "ok") return setSignupState("done");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
      console.error(e);
      toast("予期しないエラーが発生しました", { description: e.message });
      return router.push(withContinue("/signup", continue_uri));
    }
    setSubmit(false);
    return;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="pin" render={({ field }) =>(
          <FormItem>
            <FormLabel>認証コード</FormLabel>
            <FormControl>
              <InputOTP maxLength={6} autoFocus={true} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormDescription>
              メールに届いた認証コードを入力してください。
              届かない場合は最初からやり直してください
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}/>
        <Button type="submit" className="w-full" disabled={submitting}><Loader loading={submitting}/>認証する</Button>
      </form>
    </Form>
  );
};
