// React/Next
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

import { SignContainer } from "@/components/layouts/SignContainer";
import { SignMethodLinksContainer, SignMethodLinks, SignSeparate } from "@/components/layouts/SignMethods";

export default function SignupRoot(){
  return (
    <SignContainer title="アカウントを作成">
      <SignMethodLinksContainer>
        <SignMethodLinks type="signup"/>
        <SignSeparate/>
        <Button variant="secondary" asChild>
          <Link href="/signin">ログインする</Link>
        </Button>
      </SignMethodLinksContainer>
    </SignContainer>
  );
}
