import { ReactNode } from "react";
import { getSession } from "@/library/session";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Bottombar } from "./bottombar";

export default async function DashboardLayout({ children }: { children: ReactNode }){
  const session = await getSession();
  if(!session) return;

  return (
    <div className="flex flex-col sm:flex-row">
      <Header avatar={session.avatar} username={session.name}/>
      <Sidebar avatar={session.avatar} username={session.name}/>
      <main className="w-full md:pl-72 pt-20 max-md:pb-16">
        <div className="w-full mx-auto max-w-4xl p-5">
          {children}
        </div>
      </main>
      <Bottombar/>
    </div>
  );
}
