import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DashboardContainer } from "@/components/containers/DashboardContainer";
import { ProjectItem } from "./projects";
import { QuicklinkItem } from "./quicklink";
import type { Metadata } from "next";
import FloorpLogoDark from "@/assets/logo/floorp-black.png";
import TUICBBlue from "@/assets/logo/TUIC_B_Blue.svg";

export const metadata: Metadata = {
  title: "ホーム"
};

export default async function DashboardPage(){
  return (
    <DashboardContainer title="ホーム">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>クイックリンク</CardTitle>
            <CardDescription>よく使われる項目へ即座に移動できます</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <QuicklinkItem path="/dashboard/profile#editpublic">公開プロフィールの編集</QuicklinkItem>
              <QuicklinkItem path="/dashboard/security/sessions">ログインセッションの管理</QuicklinkItem>
              <QuicklinkItem path="/dashboard/security/sessions">すべてのセッションからログアウト</QuicklinkItem>
              <QuicklinkItem path="/dashboard/security">ログインメソッドの管理</QuicklinkItem>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>プロジェクト</CardTitle>
            <CardDescription>Ablazeが開発・提供しているプロジェクトです</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-col-1 @xl:grid-cols-2 gap-2">
              <ProjectItem href="https://floorp.app" src={FloorpLogoDark}>
                <span>Floorp ウェブブラウザー</span>
              </ProjectItem>
              <ProjectItem href="https://ablaze.one/projects/tuic" src={TUICBBlue}>
                <span>Twitter UI Customizer</span>
              </ProjectItem>
            </div>
          </CardContent>
          <CardFooter>
            <small className="text-gray-500 w-full flex justify-end hover:underline underline-offset-2">
              <Link href="https://ablaze.one/projects">すべてのサービス<i className="ri-external-link-line"></i></Link>
            </small>
          </CardFooter>
        </Card>
      </div>
    </DashboardContainer>
  );
}
