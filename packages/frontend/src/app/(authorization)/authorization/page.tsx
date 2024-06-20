// UI
import { Button } from "@/components/ui/button";

// Utility
import { getUserInfo } from "@/library/repository/getuserinfo";

export default async function AuthorizationRoot(){
  const user = await getUserInfo();
  const appname = "Floorp ウェブブラウザー (Windows10)";
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl">{appname}</h1>
        <p>ユーザー名: {user.name}</p>
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
