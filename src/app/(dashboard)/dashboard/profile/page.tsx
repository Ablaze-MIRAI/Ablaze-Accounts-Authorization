import { DashboardContainer } from "@/components/containers/DashboardContainer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { getSession } from "@/library/session";
import { EditProfile } from "./edit";

export default async function DashboardProfile(){
  const session = await getSession();
  if(!session) return;

  return (
    <DashboardContainer title="プロフィール">
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
          <CardDescription>基本的なプロフィールを設定します</CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfile username={session.name}/>
        </CardContent>
        <CardFooter>
          <small className="flex items-center text-gray-600">
            <span className="text-xl mr-2"><i className="ri-eye-line"></i></span>
            <p>このデータは他のユーザーから見られる可能性があります</p>
          </small>
        </CardFooter>
      </Card>
    </DashboardContainer>
  );
}
