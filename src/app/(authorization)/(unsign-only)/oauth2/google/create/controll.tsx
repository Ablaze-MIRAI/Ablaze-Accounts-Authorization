"use client";

import { useRouter } from "next/navigation";
import { useProcess } from "@/library/hook";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/elements/Loader";
import { useAtomValue, useSetAtom } from "jotai";
import { ProcessingState } from "@/store/state/processing";
import { ErrorState } from "@/store/state/error";
import { CreateAccountAction } from "./action";
import Link from "next/link";

export const CreateAccount = () =>{
  const router = useRouter();
  const setError =  useSetAtom(ErrorState);
  const process = useAtomValue(ProcessingState);
  const handleClick = useProcess(async () =>{
    try{
      const result = await CreateAccountAction();
      if(result === "error") return setError("error");
      setError(undefined);
      return router.push("/oauth2/google/done");
    }catch(e){
      setError("ok");
    }
  });

  return (
    <Button type="submit" className="w-full" onClick={handleClick} disabled={process}>
      <Loader loading={process}/>
      作成
    </Button>
  );
};

export const Cancel = () =>{
  return (
    <Button variant="outline" type="submit" className="w-full" asChild>
      <Link href="/">キャンセル</Link>
    </Button>
  );
};
