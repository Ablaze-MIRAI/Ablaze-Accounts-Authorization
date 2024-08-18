import { UnknownError } from "@/components/props/Error";
import { SignTitle } from "@/components/props/SignTitle";
import { o2google_setup_cookie } from "@/store/cookie/oauth2_google";

export default async function OAuth2GoogleInit(){
  const google_user = o2google_setup_cookie.verify();
  if([google_user?.email, google_user?.guid].every(p => !p)) return <UnknownError/>;

  return (
    <div className="space-y-4">
      <SignTitle title="アカウントを作成"/>
    </div>
  );
}
