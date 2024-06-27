// UI
import { Button } from "@/components/ui/button";

// Utility
import { SignContainer } from "@/components/layouts/SignContainer";
import { SignupEmailForm } from "@/components/parts/SignupEmailForm";
import Link from "next/link";

export default function SignupEmail(){
  return (
    <SignContainer title="アカウントを作成 - Eメール">
      <div className="space-y-2">
        <SignupEmailForm/>
        <Button variant="secondary" className="w-full" asChild>
          <Link href="/signup">戻る</Link>
        </Button>
      </div>
    </SignContainer>
  );
}
