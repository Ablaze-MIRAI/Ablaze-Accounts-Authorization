import { NavigationTabsType } from "@/typings/dashboard";

export const NavigationTabs: NavigationTabsType = [
  { name: "ホーム", icon: "ri-home-2-line", path: "/dashboard" },
  { name: "プロフィール", icon: "ri-account-box-line", path: "/dashboard/profile" },
  { name: "セキュリティ", icon: "ri-lock-2-line", path: "/dashboard/security" }
];
