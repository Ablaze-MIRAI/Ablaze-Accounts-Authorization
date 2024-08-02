import { redirect } from "next/navigation";
import { getSession } from "@/library/session";
import { getSessionInfoById } from "@/data/dashboard";
import { BCItem, DashboardContainer } from "@/components/containers/DashboardContainer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const findIcon = (name: string) =>{
  const lcname = name.toLowerCase();
  if(lcname.search("windows") > -1) return "windows";
  if(lcname.search("android") > -1) return "android";
  if(lcname.search("mac") > -1) return "mac";
  return "unknown";
};

const IconByName = {
  "unknown": "ri-device-fill",
  "desktop": "ri-computer-fill",
  "phone": "ri-smartphone-fill",
  "windows": "ri-windows-fill",
  "android": "ri-android-fill",
  "mac": "ri-finder-fill",
};

export default async function SecuritySessionsDetails({ params }: { params: { sessionid: string } }){
  const session = await getSession();
  if(!session) return;

  const sessioninfo = await getSessionInfoById(session.uid, params.sessionid);
  if(!sessioninfo) redirect("/dashboard/security/sessions");

  const icon = IconByName[findIcon(sessioninfo.device ?? "none")];

  return (
    <DashboardContainer title={(
      <div>
        セッション詳細
        {session.id === sessioninfo.id && (
          <Badge className="ml-2" variant="outline">現在のセッション</Badge>
        )}
      </div>
    )} breadcrumb={(
      <>
        <BCItem href="/dashboard/security#session">セキュリティ</BCItem>
        <BCItem href="/dashboard/security/sessions">セッション</BCItem>
        <BCItem last>セッション詳細</BCItem>
      </>
    )}>
      <div className="space-y-6">
        <Button variant="destructive">このセッションを削除</Button>
        <div className="space-y-2 flex flex-col items-start">
          <Tooltip>
            <TooltipTrigger>
              <p className="text-xl">
                <span className="mr-1"><i className={icon}></i></span>
                {sessioninfo.device}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>OS</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-xl">
                <span className="mr-1"><i className="ri-global-line"></i></span>
                {sessioninfo.browser}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>ブラウザ</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-xl">
                <span className="mr-1"><i className="ri-cloud-line"></i></span>
                {sessioninfo.ip}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>IPアドレス</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-xl">
                <span className="mr-1"><i className="ri-time-line"></i></span>
                {sessioninfo.updatedAt.toLocaleString("ja-JP")}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>最終ログイン時間</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-xl">
                <span className="mr-1"><i className="ri-history-line"></i></span>
                {sessioninfo.createdAt.toLocaleString("ja-JP")}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>初回ログイン時間</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </DashboardContainer>
  );
}
