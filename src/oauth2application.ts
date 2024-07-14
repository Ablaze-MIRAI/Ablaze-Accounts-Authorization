import type { ApplicationsType } from "@/typings/oauth2";

const applications: ApplicationsType = {
  "com.oauthdebugger": {
    name: "OAuth 2.0 Debugger",
    type: "normal",
    client: "CONFIDENTIAL",
    client_secret: "super-long-secret-value",
    scope: "user",
    callback: ["https://oauthdebugger.com/debug"]
  },
  "arpa.localhost.p7000": {
    name: "Local SSO Debugger",
    type: "ablaze",
    client: "PUBLIC",
    scope: "user",
    callback: ["http://localhost:7000/"]
  },
  "one.ablaze.myaccount": {
    name: "Ablaze Accounts Dashboard",
    type: "ablaze",
    client: "PUBLIC",
    scope: "user",
    callback: ["https://myaccount.ablaze.one/oauth2/callback", "http://localhost:6000/"]
  }
};

export default applications;
