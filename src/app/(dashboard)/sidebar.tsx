"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationTabs } from "./tabs";
import type { NavigationTabsType } from "@/typings/dashboard";

export const Sidebar = ({ avatar, username }: { avatar: string, username: string }) =>{
  const initial = username.charAt(0).toUpperCase();

  return (
    <aside className="max-md:hidden fixed top-0 left-0 z-20 pt-20 h-[100svh] w-72 bg-white flex flex-col">
      <div className="h-full flex flex-col justify-between p-3">
        <div className="px-3">
          <Navigation tabs={NavigationTabs}/>
        </div>
        <div className="space-y-4">
          <div className="w-full px-3 flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={avatar} alt="user avatar"/>
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <p className="text-xl truncate w-full">{username}</p>
          </div>
          <Button variant="outline" className="w-full select-none" asChild>
            <Link href="/account">ログアウト</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
};

const Navigation = ({ tabs }: { tabs: NavigationTabsType }) =>{
  return (
    <nav className="space-y-2">
      {tabs.map((v, k) =>(
        <NavigationItem key={k} id={k} name={v.name} icon={v.icon} path={v.path} />
      ))}
    </nav>
  );
};

/* eslint no-unused-vars: off */
const NavigationItem = ({ id, name, icon, path }: { id: number, name: string, icon: string, path: string }) =>{
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Button variant={isActive ? "default" : "ghost"} className="w-full select-none" id={`sb${id}`} asChild>
      <Link href={path}>
        <i className={`${icon} mr-2 text-xl`}></i>
        {name}
      </Link>
    </Button>
  );
};
