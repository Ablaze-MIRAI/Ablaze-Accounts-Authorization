"use server";

import { getSession } from "@/library/session";
import { getActiveSession } from "@/data/dashboard";
import { SessionItem } from "../sessionitem";

const findIcon = (name: string) =>{
  const lcname = name.toLowerCase();
  if(lcname.search("windows") > -1) return "windows";
  if(lcname.search("android") > -1) return "android";
  if(lcname.search("mac") > -1) return "mac";
  return "unknown";
};

export const ActiveSessions = async () =>{
  const session = await getSession();
  if(!session) return;

  const activesession = await getActiveSession(session.uid, 50);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-right">{activesession.length}つのセッションが有効</p>
      </div>
      <div className="space-y-2">
        {activesession.map((v, k) =>{
          const icon = findIcon(v.device ?? "none");
          const device = v.device ?? "Unknown";
          const browser = v.browser ?? "Unknown";

          return (
            <SessionItem
              key={k}
              path={`/dashboard/security/sessions/${v.id}`}
              name={`${device} - ${browser}`}
              time={v.updatedAt}
              icon={icon}/>
          );
        })}
      </div>
      <div className="w-full flex justify-center">
        <small className="text-slate-700">
          <i className="ri-checkbox-circle-line mr-1"></i>
          これですべてまたは表示上限です
        </small>
      </div>
    </div>
  );
};
