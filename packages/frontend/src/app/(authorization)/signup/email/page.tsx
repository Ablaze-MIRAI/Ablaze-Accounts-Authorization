import { SignContainer } from "@/components/layouts/SignContainer";
import { SignupEmailForm } from "@/components/parts/SignupEmailForm";

export default function SignupEmail(){
  return (
    <SignContainer title="アカウントを作成 - Eメール">
      <SignupEmailForm/>
    </SignContainer>
  );
}
