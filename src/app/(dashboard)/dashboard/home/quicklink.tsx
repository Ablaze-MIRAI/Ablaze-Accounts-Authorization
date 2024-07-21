import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const QuicklinkItem = ({ children, path }: { children: ReactNode, path: string }) =>{
  return (
    <Button variant="link" asChild>
      <Link href={path}>
        <p>
          <span className="mr-1 text-lg"><i className="ri-signpost-line"></i></span>
          {children}
        </p>
      </Link>
    </Button>
  );
};
