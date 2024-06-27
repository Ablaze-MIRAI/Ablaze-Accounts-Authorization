// React/Next
import Image from "next/image";

// Utility
import { getUserInfo } from "@/library/repository/getuserinfo";
import AccountNavs from "@/components/parts/AccountNavs";


export default async function AccountRoot(){
  const user = await getUserInfo();

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
      <AccountNavs/>
    </div>
  )
}
