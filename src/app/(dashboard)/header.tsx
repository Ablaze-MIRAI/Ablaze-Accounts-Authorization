import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import AblazeLogoBlack from "@/assets/logo/black.svg";

export const Header = ({ avatar, username }: { avatar: string, username: string}) =>{
  const initial = username.charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 left-0 z-30 w-full h-16 px-4 flex justify-between items-center bg-white drop-shadow-md">
      <Link href="/dashboard" className="h-1/2 md:px-5">
        <Image width={165} height={38} src={AblazeLogoBlack} alt="Ablaze Logo" className="h-full mx-auto" priority/>
      </Link>
      <div className="flex space-x-6">
        <div className="flex-1 flex items-center">
          <Popover>
            <PopoverTrigger>
              <div className="text-3xl text-slate-700">
                <i className="ri-apps-line"></i>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <h2 className="text-lg">アプリケーション</h2>
              <div>
                <div>
                  <div></div>
                  <p>Floorp</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="md:hidden flex-1 flex items-center">
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={avatar} alt="user avatar"/>
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <p className="mb-2">{username} でログイン中</p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/account">ログアウト</Link>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
