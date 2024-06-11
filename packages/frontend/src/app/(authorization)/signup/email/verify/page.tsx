// UI
import { SignContainer } from "@/components/layouts/SignContainer";
import { SignupEmailVerifyForm } from "@/components/parts/SignupEmailVerifyForm";

export default function SignupEmailVerify(){
  return (
    <SignContainer title="アカウントを作成 - Eメール">
      <SignupEmailVerifyForm/>
    </SignContainer>
  )
}
