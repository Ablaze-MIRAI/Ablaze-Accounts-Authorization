// React/Next
import Link from "next/link";
import Image from "next/image";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { AppInfo } from "@/components/parts/authorize/Information";
import { AuthButtonGroup } from "@/components/parts/AuthNavsButtonGroup";
import { getApplication } from "@/library/repository/getapplication";
import { getUser } from "@/library/getuser";
import { WebMessageResponse } from "./webmessage";
import type { PageProps } from "@/typings/page";

export default async function AuthorizationRoot({ searchParams }: PageProps){
  const query = OAuth2QueryValidation(searchParams);
  if(!query) return (<BadRequest code="1"/>);

  const application_resp = (await getApplication(query.client_id, query.redirect_uri));
  if(!application_resp.success) return (<BadRequest code={`2-${application_resp.code}`}/>);
  const application = application_resp.data;

  const user = (await getUser()).data;
  if(!user) return (<BadRequest code="3"/>);

  if(query.response_mode === "web_message"){
    return (
      <div className="space-y-3">
        <WebMessageResponse query={query} origin={application.origin}/>
        <h1 className="text-2xl">Response Mode Web Message</h1>
        <Button asChild>
          <Link href="/">トップページへ</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl">{application.name}</h1>
          <div>
            <Link href="/oauth2/account/">
              <div className="border border-gray-400 rounded-full px-5 h-8 space-x-1 flex justify-center items-center hover:bg-gray-100">
                <div className="block relative h-6 w-6">
                  <Image className="rounded-full" src={user.avatar} alt="[avatar]" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill/>
                </div>
                <p>{user.name}でログイン中</p>
              </div>
            </Link>
          </div>
        </div>
        <AppInfo/>
        <AuthButtonGroup query={query}/>
      </div>
    </>
  )
}

const BadRequest = ({ code }: { code: string }) =>{
  return (
    <div className="space-y-3">
      <h1 className="text-2xl">このリクエストは正しくありません ({code})</h1>
      <Button asChild>
        <Link href="/">トップページへ</Link>
      </Button>
    </div>
  )
}

const OAuth2QueryValidation = (queryparams: any) =>{
  const response_modes = ["query", "web_message"];

  if(queryparams.response_type !== "code") return false;
  if(queryparams.scope !== "user") return false;
  if(!queryparams.client_id) return false;
  if(!queryparams.redirect_uri) return false;
  if(!queryparams.state) return false;
  let response_mode = "";
  if(queryparams.response_mode && response_modes.includes(queryparams.response_mode)) response_mode = queryparams.response_mode;

  return {
    client_id: queryparams.client_id,
    redirect_uri: queryparams.redirect_uri,
    state: queryparams.state,
    response_mode: response_mode
  };
}
