import { UnknownError } from "@/components/props/Error";
import { SignTitle } from "@/components/props/SignTitle";
import { o2google_setup_cookie } from "@/store/cookie/oauth2_google";
import { Button } from "@/components/ui/button";

export default async function OAuth2GoogleInit(){
  const google_user = o2google_setup_cookie.verify();
  if(!google_user?.email || !google_user?.guid) return <UnknownError/>;

  return (
    <div className="space-y-4">
      <SignTitle title="アカウントを作成"/>
      <div className="space-y-2">
        <p>以下の情報でアカウントを作成します</p>
        <h2 className="text-2xl">{google_user.email}</h2>
      </div>
      <div className="space-y-2">

      </div>
    </div>
  );
}

const CreateAccount = () =>{

};

const Cancel = () =>{
  const [isaction, setAction] = useState

  return (
    <form action={async () =>{
      "use server";
    }}>
      <Button>キャンセル</Button>
    </form>
  );
};
