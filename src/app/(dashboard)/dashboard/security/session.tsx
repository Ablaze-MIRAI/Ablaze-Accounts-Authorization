import { getSession } from "@/library/session";
import { SessionItem } from "./sessionitem";
import { getActiveSession } from "@/data/dashboard";

const findIcon = (name: string) =>{
  const lcname = name.toLowerCase();
  if(lcname.search("windows") > -1) return "windows";
  if(lcname.search("android") > -1) return "android";
  if(lcname.search("mac") > -1) return "mac";
  return "unknown";
};

export const TopSessions = async () =>{
  const session = await getSession();
  if(!session) return;
  const topsessions = await getActiveSession(session.uid, 3);

  return (
    <div className="space-y-2">
      {topsessions.map((v, k) =>{
        const icon = findIcon(v.device ?? "none");
        const device = v.device ?? "Unknown";
        const browser = v.browser ?? "Unknown";
        return (
          <SessionItem
            key={k}
            path={`/dashboard/security/session/${v.id}`}
            name={`${device} - ${browser}`}
            time={v.updatedAt}
            icon={icon}/>
        );
      })}
    </div>
  );
};
