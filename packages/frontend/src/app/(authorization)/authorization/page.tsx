// React/Next
import Link from "next/link";
import Image from "next/image";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { getUserInfo } from "@/library/repository/getuserinfo";

export default async function AuthorizationRoot(){
  const user = await getUserInfo();
  console.log(user);
  const appname = "Floorp ウェブブラウザー (Windows10)";
  return (
    <>
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl">{appname}</h1>
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
        <ul className="space-y-1">
          <li className="flex items-center space-x-3">
            <i className="ri-alert-fill text-3xl text-yellow-400"></i>
            <p>信頼できるダウンロード先かを確認してください</p>
          </li>
          <li className="flex items-center space-x-3">
            <i className="ri-verified-badge-fill text-3xl text-sky-400"></i>
            <p>Ablazeによる開発</p>
          </li>
          <li className="flex items-center space-x-3">
            <i className="ri-information-fill text-3xl text-green-400"></i>
            <p>このアプリと接続し情報を連携します</p>
          </li>
        </ul>
        <div className="space-y-2">
          <Button variant="default" className="w-full">接続する</Button>
          <Button variant="secondary" className="w-full">キャンセル</Button>
        </div>
      </div>
    </>
  )
}
