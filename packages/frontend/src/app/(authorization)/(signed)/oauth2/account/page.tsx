// React/Next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

// Utility
import { AccountAuthorizeNavs } from "@/components/parts/authorization/AccountNavs";
import { getUser } from "@/library/getuser";

export default async function AccountRoot(){
  const user = (await getUser()).data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <div className="block relative h-24 w-24">
          <Image
            className="rounded-full"
            src={user.avatar}
            alt="[avatar]"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill/>
        </div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
      </div>
      <AccountAuthorizeNavs/>
    </div>
  )
}
