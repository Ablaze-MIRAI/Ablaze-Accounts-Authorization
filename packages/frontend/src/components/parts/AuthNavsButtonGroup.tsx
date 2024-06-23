"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const AuthButtonGroup = ({ query }: { query: { client_id: string, redirect_uri: string, state: string } }) =>{
  const router = useRouter();

  const requestAccept = async () =>{
    try{
      const response = await fetch("http://localhost:3000/api/oauth2/accept", {
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
    const result = await requestAccept();
    console.log(result);
    if(!result.success) alert("接続に失敗しました / Faild connect");

    router.push(`/oauth2/done/?to=${window.btoa(result.data.redirect)}`);
  }

  return (
    <div className="space-y-2">
      <Button variant="default" className="w-full" onClick={onClickAccept}>接続する</Button>
      <Button variant="secondary" className="w-full">キャンセル</Button>
    </div>
  );
}
