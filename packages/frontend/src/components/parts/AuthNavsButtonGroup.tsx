"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Loader } from "./prop/Loader";

export const AuthButtonGroup = ({ query }: { query: { client_id: string, redirect_uri: string, state: string } }) =>{
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isCancel, setCancel] = useState(false);

  const requestAccept = async () =>{
    try{
      const response = await fetch("/api/oauth2/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          response_type: "code",
          client_id: query.client_id,
          redirect_uri: query.redirect_uri,
          scope: "user",
          "state": query.state
        })
      });
      const result = response.json();
      return result
    }catch(e){
      console.error(e);
      return false;
    }
  }

  const onClickAccept = async () =>{
    setLoading(true);
    const result = await requestAccept();
    if(!result.success) alert("接続に失敗しました / Faild connect");

    router.push(result.data.redirect);
  }

  const onClickCancel = () =>{
    setLoading(true);
    setCancel(true);
    console.log("Redirecting...")
    router.push(`${query.redirect_uri}?error=access_denied`);
  }

  return (
    <div className="space-y-2">
      <Button variant="default" className="w-full" onClick={onClickAccept} disabled={loading}><Loader view={loading}/> 接続する</Button>
      <Button variant="secondary" className="w-full" onClick={onClickCancel} disabled={loading}><Loader view={loading}/> キャンセル</Button>
    </div>
  );
}
