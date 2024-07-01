"use client";

// React/Next
import Link from "next/link";
import Image from "next/image";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { AppInfo } from "@/components/parts/authorize/Information";
import { AuthButtonGroup } from "@/components/parts/AuthNavsButtonGroup";
import type { PageProps } from "@/typings/page";

export default function AuthorizationRoot({ searchParams }: PageProps){
  const query = OAuth2QueryValidation(searchParams);
  if(!query) return (<BadRequest/>);


  /*
  const user = { name: "Raisan", avatar: "https://ablaze.one/favicon.ico" }
  /*const user = await getUserInfo();
  if(!user) redirect("/signin");*/

  // console.log(user);
  /*console.log("[QUERY]", query);

  const application = await getApplication(query.client_id, query.redirect_uri);
  console.log("[FETCH]", application);
  if(application.status === "failure") return (<h1>[FetchApp] Failure</h1>) // redirect("/authorization/error?msg=notfoundapp");
  if(!application.data) return (<h1>ERROR</h1>);*/
  const application = { data: { name: "Floorp ウェブブラウザー" } }
  const user = { name: "Raisan", avatar: "https://source.boringavatars.com/beam/128/u5?square" };

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl">{application.data.name}</h1>
          <div>
            <Link href="/account/">
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

const BadRequest = () =>{
  return (
    <h1 className="text-2xl">このリクエストは正しくありません</h1>
  )
}

const OAuth2QueryValidation = (queryparams: any) =>{
  if(queryparams.response_type !== "code") return false;
  if(queryparams.scope !== "user") return false;
  if(!queryparams.client_id) return false;
  if(!queryparams.redirect_uri) return false;
  if(!queryparams.state) return false;

  return {
    client_id: queryparams.client_id,
    redirect_uri: queryparams.redirect_uri,
    state: queryparams.state
  };
}
