import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { BCItem, DashboardContainer } from "@/components/containers/DashboardContainer";
import { Loader } from "@/components/props/Loader";
import { ActiveSessions } from "./session";

export default function SecuritySessions(){
  return (
    <DashboardContainer title="セッション" description="セッションの詳細な管理を行えます" breadcrumb={(
      <>
        <BCItem href="/dashboard/security#session">セキュリティ</BCItem>
        <BCItem last>セッション</BCItem>
      </>
    )}>
      <div className="space-y-8">
        <div className="flex justify-end space-x-2">
          <Button variant="destructive">すべてのセッションを削除</Button>
        </div>
        <div>
          <Suspense fallback={(<h1 className="text-xl"><Loader loading={true}/>セッション情報をロード中</h1>)}>
            <ActiveSessions/>
          </Suspense>
        </div>
      </div>
    </DashboardContainer>
  );
}
