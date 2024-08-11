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
  "app.floorp.native": {
    name: "Floorp Web Browser",
    type: "native",
    client: "PUBLIC",
    scope: "user",
    callback: ["https://floorp-native-oauth2.mirairo.dev/callback"]
  },
  "one.ablaze.forum": {
    name: "Ablaze 仮設フォーラム",
    type: "ablaze",
    client: "PUBLIC",
    scope: "user",
    callback: ["https://forum.mirairo.dev/oauth2/callback", "https://forum.ablaze.one/oauth2/callback", "http://localhost:3000/oauth2/callback"]
  }
};

export default applications;
