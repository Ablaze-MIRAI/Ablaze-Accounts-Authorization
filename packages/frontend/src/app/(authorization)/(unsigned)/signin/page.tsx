// React/Next
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { SignContainer } from "@/components/layouts/SignContainer";
import { SignMethodLinksContainer, SignMethodLinks, SignSeparate } from "@/components/layouts/SignMethods";

// Typings
import { PageProps } from "@/typings/page";

export default function SigninRoot({ searchParams }: PageProps){
  const callback = searchParams.callback as string | undefined;

  return (
    <SignContainer title="アカウントにログイン">
      <SignMethodLinksContainer>
        <SignMethodLinks type="signin" callback={callback}/>
        <SignSeparate or="または"/>
        <Button variant="secondary" asChild>
          <Link href={`/signup${callback?`?callback=${callback}`:""}`}>登録する</Link>
        </Button>
      </SignMethodLinksContainer>
    </SignContainer>
  );
}
