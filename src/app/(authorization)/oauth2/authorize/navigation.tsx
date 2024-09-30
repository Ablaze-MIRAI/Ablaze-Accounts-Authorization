"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/elements/Loader";
import { builderOAuth2ErrorUri, builderOAuth2RedirectUri } from "@/library/utils";
import { doAcceptApp } from "./actions";
import type { $Enums } from "@prisma/client";
import type { UserSession } from "@/typings/session";
import type { OAuth2Query } from "@/typings/oauth2";

export const OAuthNavigation = ({ user, query, client_type }: { user: UserSession, query: OAuth2Query, client_type: $Enums.ClientType }) =>{
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const doAccept = async () =>{
    setLoading("accept");
    const code = await doAcceptApp(user.uid, query.client_id, query.scope, client_type);
    return router.push(builderOAuth2RedirectUri(query.redirect_uri, query.state, code));
  };

  const doReject = () =>{
    setLoading("reject");
    return router.push(builderOAuth2ErrorUri(query.redirect_uri, query.state, "access_denied"));
  };

  return (
    <div className="space-y-2">
      <Button variant="default" className="w-full" disabled={!!loading} onClick={doAccept}>
        <Loader loading={loading === "accept"}/>
        接続する
      </Button>
      <Button variant="secondary" className="w-full" disabled={!!loading} onClick={doReject}>
        <Loader loading={loading === "reject"}/>
        キャンセル
      </Button>
    </div>
  );
};
