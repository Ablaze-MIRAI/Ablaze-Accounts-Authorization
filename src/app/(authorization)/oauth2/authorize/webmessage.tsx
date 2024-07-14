"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/props/Loader";

let first = false;
export const WebMessageResponse = ({ code, redirecturi }: { code: string, redirecturi: string }) =>{
  const [state, setState] = useState("pending");

  useEffect(() =>{
    if(first) return; else first = true;

    (async () =>{
      console.log("[A3S] Pending");

      const origin = new URL(redirecturi).origin;

      console.log("[A3S]", code);
      console.log("[A3S]", origin);

      try{
        window.parent.postMessage({
          target: "oauth2client",
          code: code
        }, origin);
        setState("done");
      }catch(e){
        console.error("[A3S]", e);
        setState("error");
      }
    })();
  });

  return (
    <div className="space-y-3">
      <h1 className="text-2xl">Web Message</h1>
      {state === "pending" && (<p className="text-orange-400 text-xl"><Loader loading={true}/> Pending</p>)}
      {state === "done" && (<p className="text-green-400 text-xl">Done</p>)}
      {state === "error" && (<p className="text-red-400 text-xl">Error</p>)}
      <Button variant="outline" asChild>
        <Link href="/">トップページへ</Link>
      </Button>
    </div>
  );
};
