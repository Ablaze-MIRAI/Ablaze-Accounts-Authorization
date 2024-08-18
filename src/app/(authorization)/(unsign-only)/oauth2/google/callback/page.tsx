"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMountWS } from "@/library/hook";
import { TitleLoader } from "@/components/props/Loader";
import { ToTopage } from "@/components/props/ToToppage";

export default function OAuth2GoogleCallback(){
  const router = useRouter();
  const query = useSearchParams();
  const [iserror, setError] = useState(false);

  useMountWS(async () =>{
    const code = query.get("code");
    const state = query.get("state");

    await fetch("/api/oauth2/google", {
      method: "POST",
      body: JSON.stringify({
        code: code,
        state: state
      })
    })
    .then(r =>{
      if(!r.ok) throw new Error();
      return r;
    })
    .then(r => r.json())
    .then(() =>{
      router.push("/oauth2/google/create");
    })
    .catch((error) =>{
      console.error(error);
      setError(true);
    });
  });

  return (
    <div>
      {iserror?(
        <div className="space-y-2">
          <h1 className="text-2xl text-red-500 font-bold">エラーが発生しました</h1>
          <ToTopage/>
        </div>
      ):(
        <TitleLoader loading={true} title="処理中"/>
      )}
    </div>
  );
}
