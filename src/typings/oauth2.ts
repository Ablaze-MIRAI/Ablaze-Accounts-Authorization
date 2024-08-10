import { $Enums } from "@prisma/client";

export type ApplicationType = {
  name: string,
  type: "ablaze" | "normal" | "native" | "1stparty",
  client: "PUBLIC",
  scope: string,
  callback: string[]
}

export type ApplicationConfidentialType = {
  name: string,
  type: "ablaze" | "normal" | "native" | "1stparty",
  client: "CONFIDENTIAL",
  client_secret: string,
  scope: string,
  callback: string[]
}

export type ApplicationsType = {
  [key: string]: ApplicationType | ApplicationConfidentialType
};

export type OAuth2Query = {
  client_id: string,
  redirect_uri: string,
  scope: string,
  response_type: string,
  response_mode: string,
  prompt?: "require",
  state: string,
}

export type OAuth2CodeStore = {
  uid: string
  client_id: string,
  scope: string,
  client_type: $Enums.ClientType
}

