// React/Next
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { SignContainer } from "@/components/layouts/SignContainer";
import { SignMethodLinksContainer, SignMethodLinks, SignSeparate } from "@/components/layouts/SignMethods";

export default function SigninRoot(){
  return (
    <SignContainer title="アカウントにログイン">
      <SignMethodLinksContainer>
        <SignMethodLinks type="signin"/>
        <SignSeparate or="または"/>
        <Button variant="secondary" asChild>
          <Link href="/signup">登録する</Link>
        </Button>
      </SignMethodLinksContainer>
    </SignContainer>
  );
}
