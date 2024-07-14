import type { ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { withContinueQuery } from "@/library/utils";

const Linkto = ({ href, children }: { href: string, children: ReactNode }) =>{
  const query = useSearchParams();

  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href={{ pathname: href, query: withContinueQuery(query) }} scroll={false}>{children}</Link>
    </Button>
  );
};

export const SignMethods = ({ type, children }: { type: string, children: ReactNode }) =>{
  return (
    <div className="mt-5 w-full flex flex-col space-y-2">
      <Linkto href={`/${type}/email`}><i className="ri-mail-fill text-xl mr-1"></i>Eメール</Linkto>
      {/*<Linkto href={`/${type}/github`}><i className="ri-github-fill text-xl mr-1"></i>GitHub</Linkto>
      <Linkto href={`/${type}/google`}><i className="ri-google-fill text-xl mr-1"></i>Google</Linkto>
      <Linkto href={`/${type}/twitter`}><i className="ri-twitter-fill text-xl mr-1"></i>Twitter</Linkto>
      <Linkto href={`/${type}/discord`}><i className="ri-discord-fill text-xl mr-1"></i>discord</Linkto>*/}
      {children}
    </div>
  );
};
