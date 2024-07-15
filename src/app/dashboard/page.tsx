import { redirect } from "next/navigation";
import environment from "@/environment";

export default async function DashboardPage(){
  redirect(environment.ACCOUNT_DASHBOARD);
}
