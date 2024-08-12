import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import environment from "@/environment";
import { SignTitle } from "@/components/props/SignTitle";
import { BadRequest } from "@/components/modules/badrequest";
import { getGitHubUser, getToken, getUserByEmail, getUserByGitHub } from "@/data/githuboauth2";
import { ConnectNavigation, CreateNavigation, CreateSessionBySilent } from "./navigation";
import { GitHubUser } from "./schema";

type GitHubOAuth2CallbackQuery = {
  searchParams: {
    code?: string,
    state?: string
  }
} & {
  searchParams: {
    error?: string,
    error_description?: string
  }
}

const ErrorResponse = () =>{
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold text-red-400">エラー</h1>
      <p>認証に失敗しました。</p>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/">トップページへ</Link>
      </Button>
    </div>
  );
};

const ConnectAccount = ({ github, email }: { github: GitHubUser, email: { screen_name: string, avatar: string } }) =>{
  return (
    <div className="space-y-4">
      <div>
        <SignTitle title="アカウントにログイン - GitHub"/>
        <p>同一のメールアドレスで登録済みのアカウントが見つかりました</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-center items-center">
          <div className="w-1/4">
            <Image src={github.avatar_url} height={512} width={512} alt="GitHub Avatar" className="rounded-full w-full"/>
          </div>
          <div className="w-2/4 text-center">
            <h2 className="text-2xl">{github.name}</h2>
            <p>{github.login}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-3xl"><i className="ri-links-line"></i></p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-1/4">
            <Image src={email.avatar} height={512} width={512} alt="GitHub Avatar" className="rounded-full w-full"/>
          </div>
          <div className="w-2/4 text-center">
            <h2 className="text-2xl">{email.screen_name}</h2>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <ConnectNavigation github={github}/>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">キャンセル</Link>
        </Button>
      </div>
    </div>
  );
};

export default async function GitHubOAuth2Callback({ searchParams }: GitHubOAuth2CallbackQuery){
  const state = cookies().get(environment.COOKIE_GITHUB_STATE)?.value;
  if(!!searchParams.error && searchParams.error !== "") return (<ErrorResponse/>);
  if(state !== searchParams.state || !searchParams.code) return (<BadRequest/>);

  const token = await getToken(searchParams.code);
  if(token.error) return (<ErrorResponse/>);

  const user = await getGitHubUser(token.access_token);
  if(!user) return (<ErrorResponse/>);

  const githubuser = await getUserByGitHub(String(user.id));
  if(githubuser){
    return (<CreateSessionBySilent uid={githubuser.user.uid}/>);
  }

  const emailuser = await getUserByEmail(user.notification_email);
  if(emailuser){
    return (<ConnectAccount email={emailuser.user} github={user}/>);
  }

  return (
    <div className="space-y-4">
      <SignTitle title="アカウントを作成 - GitHub"/>
      <div className="flex justify-center items-center">
        <div className="w-1/3">
          <Image src={user.avatar_url} height={512} width={512} alt="GitHub Avatar" className="rounded-full w-full"/>
        </div>
        <div className="w-2/3 text-center">
          <h2 className="text-2xl">{user.name}</h2>
          <p>{user.login}</p>
        </div>
      </div>
      <div className="space-y-2">
        <CreateNavigation github={user}/>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">キャンセル</Link>
        </Button>
      </div>
    </div>
  );
}
