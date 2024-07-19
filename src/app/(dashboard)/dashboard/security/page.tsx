import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardContainer } from "@/components/containers/DashboardContainer";
import { SettingContainer, SettingContent, SettingFooter } from "@/components/containers/SettingItem";
import { TopSessions } from "./session";

export default async function DashboardSecurity(){
  return (
    <DashboardContainer title="セキュリティ">
      <SettingContainer title="セッション" description="ログイン中のデバイスを管理できます">
        <SettingContent>
          <Suspense fallback={<h1 className="text-xl">セッション情報をロード中</h1>}>
            <TopSessions/>
          </Suspense>
        </SettingContent>
        <SettingFooter>
          <div className="w-full flex justify-end">
            <Button variant="link" asChild>
              <Link href="">
                すべてのセッションを確認
                <span className="text-md"><i className="ri-arrow-right-wide-line"></i></span>
              </Link>
            </Button>
          </div>
        </SettingFooter>
      </SettingContainer>
    </DashboardContainer>
  );
};
