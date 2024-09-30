"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader } from "@/components/elements/Loader";
import { EditProfileSchema } from "./schema";
import { saveProfileAction } from "./actions";

export const EditProfile = ({ username }: { username: string }) =>{
  const [loading, setLoad] = useState(false);

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: username
    }
  });

  const onSubmit = async (data: z.infer<typeof EditProfileSchema>) =>{
    setLoad(true);

    try{
      const result = await saveProfileAction(data.username);

      setLoad(false);
      if(result === "success") return toast("更新しました");

      /* eslint @typescript-eslint/no-explicit-any: off */
    }catch(e: any){
      setLoad(false);
      toast("予期しないエラーが発生しました", { description: e.message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
         control={form.control}
          name="username"
          render={({ field }) =>(
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            <Loader loading={loading}/>
            保存
          </Button>
        </div>
      </form>
    </Form>
  );
};
