// Utility
import { SignContainer } from "@/components/layouts/SignContainer";
import { SigninEmailVerifyForm } from "@/components/parts/SigninEmailForm";

export default function SigninEmail(){
  return (
    <SignContainer title="アカウントにログイン - Eメール">
      <SigninEmailVerifyForm/>
    </SignContainer>
  );
}
