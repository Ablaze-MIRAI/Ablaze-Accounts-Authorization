"use client";

import { Button } from "@/components/ui/button";
import { GitHubUser } from "./schema";
import { connectAccount, createAccount, createSessionBySilentAction } from "./actions";
import { useEffect, useState } from "react";
import { Loader } from "@/components/props/Loader";

export const CreateNavigation = ({ github }: { github: GitHubUser }) =>{
  const [loading, setLoad] = useState(false);

  const onClickCreate = async () =>{
    setLoad(true);
    await createAccount(github);
    setLoad(false);
  };

  return (
    <Button variant="default" className="w-full" onClick={onClickCreate} disabled={loading}>
      <Loader loading={loading}/>
      作成する
    </Button>
  );
};

export const ConnectNavigation = ({ github }: { github: GitHubUser }) =>{
  const onClickConnect = async () =>{
    await connectAccount(github);
  };

  return (<Button variant="default" className="w-full" onClick={onClickConnect}>連携する</Button>);
};

let ignore = false;
export const CreateSessionBySilent = ({ uid }: { uid: string }) =>{
  useEffect(() =>{
    if(ignore) return; else ignore = true;
    (async () =>{
      await createSessionBySilentAction(uid);
    })();
  });
  return (<h1 className="text-2xl">Loading...</h1>);
};
