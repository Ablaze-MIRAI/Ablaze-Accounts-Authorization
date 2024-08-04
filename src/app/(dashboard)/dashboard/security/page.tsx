import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardContainer } from "@/components/containers/DashboardContainer";
import { SettingContainer, SettingContent, SettingFooter } from "@/components/containers/SettingItem";
import { Loader } from "@/components/props/Loader";
import { TopSessions } from "./session";

export default async function DashboardSecurity(){
  return (
    <DashboardContainer title="セキュリティ" description="セッションやログイン方法などアカウントのセキュリティに関する項目">
      <div className="space-y-8">
        <SettingContainer id="session" title="セッション" description="ログイン中のデバイスを管理できます">
          <SettingContent>
            <Suspense fallback={(<h1 className="text-xl"><Loader loading={true}/>セッション情報をロード中</h1>)}>
              <TopSessions/>
            </Suspense>
          </SettingContent>
          <SettingFooter>
            <div className="w-full flex justify-end">
              <Button variant="link" asChild>
                <Link href="/dashboard/security/sessions">
                  セッションの詳細を確認
                  <span className="text-md"><i className="ri-arrow-right-wide-line"></i></span>
                </Link>
              </Button>
            </div>
          </SettingFooter>
        </SettingContainer>
        <SettingContainer id="sign-method" title="ログインメソッド" description="ログインメソッドの管理を行えます">
          <SettingContent>
            <p className="flex items-center">
              <span className="text-xl mx-1"><i className="ri-tools-fill"></i></span>
              現在は提供されていません
            </p>
          </SettingContent>
        </SettingContainer>
      </div>
    </DashboardContainer>
  );
};
