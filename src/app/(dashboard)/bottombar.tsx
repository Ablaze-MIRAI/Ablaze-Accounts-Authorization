"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationTabs } from "./tabs";

export const Bottombar = () =>{
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white" style={{ boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, .07)" }}>
      <div className="h-full flex flex-row justify-around">
        {NavigationTabs.map((v, k) =>(
          <BottombarItem key={k} id={k} name={v.name} icon={v.icon} path={v.path}/>
        ))}
      </div>
    </nav>
  );
};

/* eslint no-unused-vars: off */
const BottombarItem = ({ id, name, icon, path }: { id: number, icon: string, name: string, path: string }) =>{
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path} className="flex-1" id={`bb${id}`}>
      <div className={`text-center ${isActive && "text-orange-500"}`}>
        <div className="text-3xl">
          <i className={icon}></i>
        </div>
        <p>{name}</p>
      </div>
    </Link>
  );
};
