import { redirect } from "next/navigation";
import { getSession } from "@/library/session";
import { getSessionInfoById } from "@/data/dashboard";
import { BCItem, DashboardContainer } from "@/components/containers/DashboardContainer";

export default async function SecuritySessionsDetails({ params }: { params: { sessionid: string } }){
  const session = await getSession();
  if(!session) return;

  const sessioninfo = await getSessionInfoById(session.uid, params.sessionid);
  if(!sessioninfo) redirect("/dashboard/security/sessions");

  return (
    <DashboardContainer title="セッション詳細" breadcrumb={(
      <>
        <BCItem href="/dashboard/security#session">セキュリティ</BCItem>
        <BCItem href="/dashboard/security/sessions">セッション</BCItem>
        <BCItem last>セッション詳細</BCItem>
      </>
    )}>
      <div className="space-y-4">

      </div>
    </DashboardContainer>
  );
}
