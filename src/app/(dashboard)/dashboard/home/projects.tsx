import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";

export const ProjectItem = ({ children, href, src }: { children: ReactNode, href: string, src: string | StaticImageData}) =>{
  return (
    <Link href={href}>
      <Card className="hover:bg-slate-100 p-6 space-y-4">
        <div className="h-10 flex justify-center">
          <Image src={src} alt="Floorp Logo" style={{ width: "auto", height: "100%" }}/>
        </div>
        <div className="space-x-2">{children}</div>
      </Card>
    </Link>
  );
};
