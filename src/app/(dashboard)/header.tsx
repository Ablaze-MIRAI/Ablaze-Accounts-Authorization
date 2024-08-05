import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShowAllProjects } from "@/components/props/ShowAllProjects";

import AblazeLogoBlack from "@/assets/logo/black.svg";
import FloorpIcon from "@/assets/logo/floorp-icon.ico";
import TUICIconBlue from "@/assets/logo/TUIC_ICON_Blue.svg";

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
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">プロジェクト</h2>
                <div className="grid gap-2 grid-cols-3">
                  <ProjectShortcutItems image={FloorpIcon} shortname="Floorp" link="https://floorp.app/"/>
                  <ProjectShortcutItems image={TUICIconBlue} shortname="TUIC" fullname="Twitter UI Customizer" link="https://ablaze.one/projects/tuic"/>
                </div>
                <ShowAllProjects/>
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

const ProjectShortcutItems = ({ image, shortname, fullname, link }: { image: StaticImageData, shortname: string, fullname?: string, link: string }) =>{
  return (
    <Link href={link}>
      <div className="mx-auto text-center w-14">
        <Image src={image} alt={`${shortname} icon`} className="w-full"/>
        <small>
          {!fullname?shortname:(
            <dfn title={fullname}>{shortname}</dfn>
          )}
        </small>
      </div>
    </Link>
  );
};

