type ClientApplications = {
  [Key in string]: {
    name: string,
    origin: string,
    type: "native" | "webnative" | "websso" | "webcheck",
    callback: string[]
  }
}

const client_applications: ClientApplications = {
  "app.floorp.native": {
    name: "Floorp Web Browser",
    origin: "floorp.app",
    type: "native",
    callback: ["floorp://a2/oauth2/callback", "floorp-mobile://a2/oauth2/callback"]
  },
  "one.ablaze.myaccount": {
    name: "Ablaze Accounts Dashboard",
    origin: "http://localhost:7000/",
    type: "websso",
    callback: [
      "https://myaccount.ablaze.one/oauth2/callback",
      "https://oauthdebugger.com/debug"
    ]
  },
  "dev.mirairo.a3exp": {
    name: "Mirairo A3 Example",
    origin: "https://a3exp.mirairo.dev",
    type: "webcheck",
    callback: [
      "https://a3exp.mirairo.dev",
      "https://oauthdebugger.com/debug"
    ]
  }
}

export default client_applications;
