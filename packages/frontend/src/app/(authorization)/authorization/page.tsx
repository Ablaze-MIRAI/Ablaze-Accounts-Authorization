// React/Next
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { getUserInfo } from "@/library/repository/getuserinfo";
import { getApplication } from "@/library/repository/getapplication";
import { PageProps } from "@/typings/page";
import { OAuth2QueryValidation } from "@/library/props";
import { AuthNav } from "@/components/parts/AuthNavs";
import { AuthButtonGroup } from "@/components/parts/AuthNavsButtonGroup";

export default async function AuthorizationRoot({ searchParams }: PageProps){
  const query = OAuth2QueryValidation(searchParams);
  if(!query) redirect("/authorization/error?msg=missing-param");

  const user = await getUserInfo();
  if(!user) redirect("/signin");

  console.log(user);
  console.log(query);

  const application = await getApplication(query.client_id, query.redirect_uri);
  if(!application) redirect("/authorization/error?msg=notfoundapp");

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl">{application.name}</h1>
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
        <AuthNav/>
        <AuthButtonGroup query={query}/>
      </div>
    </>
  )
}
