type ClientApplications = {
  [Key in string]: {
    name: string,
    type: "native" | "websso" | "webcheck",
    callback: string[]
  }
}

const client_applications: ClientApplications = {
  "app.floorp.native": {
    name: "Floorp Web Browser",
    type: "native",
    callback: ["floorp://a2/oauth2/callback", "floorp-mobile://a2/oauth2/callback"]
  },
  "one.ablaze.myaccount": {
    name: "Ablaze Accounts Dashboard",
    type: "websso",
    callback: [
      "https://myaccount.ablaze.one/oauth2/callback",
      "https://oauthdebugger.com/debug"
    ]
  }
}

export default client_applications;
