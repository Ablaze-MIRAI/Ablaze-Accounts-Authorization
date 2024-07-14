import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/library/session";
import { createOAuth2Code, getUserAcceptStatus } from "@/data/oauth2";
import { validateOAuth2Application, validateOAuth2Query } from "@/library/utils";
import { BadRequest } from "./badrequest";
import { WebMessageResponse } from "./webmessage";
import { OAuthDescription } from "./description";
import { OAuthNavigation } from "./navigation";
import type { $Enums } from "@prisma/client";
import type { UserSession } from "@/typings/session";
import type { OAuth2Query } from "@/typings/oauth2";

export default async function OAuth2AuthorizePage({ searchParams }: { searchParams: Partial<OAuth2Query> }){
  const query = validateOAuth2Query(searchParams);
  if(!query) return (<BadRequest/>);

  const application = validateOAuth2Application(query.client_id, query.redirect_uri);
  if(!application) return (<BadRequest/>);

  const user = await getSession();
  if(!user) return (<BadRequest/>);

  if(application.type === "ablaze") return await doAcceptImplicit(user, query, application.client);

  if(query.prompt !== "require" || application.type === "native"){
    const appaccept = await getUserAcceptStatus(user.uid, query.client_id);
    if(!!appaccept) return await doAcceptImplicit(user, query, application.client);
  };

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
                <p>{user.name}</p>
              </div>
            </Link>
          </div>
        </div>
        <OAuthDescription application={application}/>
        <OAuthNavigation user={user} query={query} client_type={application.client}/>
      </div>
    </>
  );
};

const doAcceptImplicit = async (user: UserSession, q: Pick<OAuth2Query, "client_id" | "scope" | "redirect_uri" | "response_mode" | "state">, ctype: $Enums.ClientType) =>{
  const code = await createOAuth2Code(user.uid, q.client_id, q.scope, ctype);
  if(q.response_mode === "web_message") return (<WebMessageResponse code={code} redirecturi={q.redirect_uri}/>);
  return redirect(`${q.redirect_uri}?code=${code}&state=${q.state}`);
};
