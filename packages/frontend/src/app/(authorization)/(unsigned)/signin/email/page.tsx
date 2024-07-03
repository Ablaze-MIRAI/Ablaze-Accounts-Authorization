// React/Next
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

// Utility
import { SignContainer } from "@/components/layouts/SignContainer";
import { SigninEmailVerifyForm } from "@/components/parts/SigninEmailForm";
import { PageProps } from "@/typings/page";

export default function SigninEmail({ searchParams }: PageProps){
  const callback = searchParams.callback as string | undefined;

  return (
    <SignContainer title="アカウントにログイン - Eメール">
      <div className="space-y-2">
        <SigninEmailVerifyForm callback={callback}/>
        <Button variant="secondary" className="w-full" asChild>
          <Link href={`/signin${callback?`?callback=${callback}`:""}`}>戻る</Link>
        </Button>
      </div>
    </SignContainer>
  );
}
