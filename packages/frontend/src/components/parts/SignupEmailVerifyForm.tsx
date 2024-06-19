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
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// Utility
import { SubmitClientHandler } from "@/library/submitclienthandler";
import { VerifyEmail } from "@/library/repository/signup-email";

// Schema
import { EmailSignupVerifySchema } from "@a3/common/schemas/signup-email";

export const SignupEmailVerifyForm = () =>{
  const router = useRouter();
  const { toast } = useToast();
  const [ sending, setSending ] = useState(false);

  type SchemaType = z.infer<typeof EmailSignupVerifySchema>;
  const form = useForm<SchemaType>({
    resolver: zodResolver(EmailSignupVerifySchema),
    defaultValues: { pin: "" },
    mode: "onChange"
  });

  const onSubmit = (data: SchemaType) => SubmitClientHandler(
    data,
    async (data) => await VerifyEmail(data),
    () => setSending(true),
    () => router.push("/signup/done"),
    (code) =>{
      switch(code){
        case 2011:
          toast({
            title: `エラー (${code})`,
            description: "認証に失敗しました"
          });
          setSending(false);
          form.reset();
          break;
        default:
          toast({
            title: `エラー (${code})`,
            description: `しばらくしてからお試しください`
          });
          router.push("/signup/");
      }
    }
  )

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
        <Button type="submit" className="w-full" disabled={sending}>認証する</Button>
      </form>
    </Form>
  )
};
