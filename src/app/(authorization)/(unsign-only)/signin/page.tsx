import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { SignTitle } from "@/components/props/SignTitle";
import { Separate } from "@/components/props/Separate";
import { SignMethods } from "../../signmethods";
import { continueAtom } from "../state";

export default function SigninPage(){
  const query = useSearchParams();
  const [, setContinue] = useAtom(continueAtom);
  const continueuri = query.get("continue");
  if(continueuri) setContinue(continueuri);

  return (
    <>
      <SignTitle title="アカウントにログイン"/>
      <SignMethods type="signin">
        <Separate text="または"/>
        <Button variant="secondary" asChild>
          <Link href="/signup" scroll={false}>アカウントを作成する</Link>
        </Button>
      </SignMethods>
    </>
  );
}
