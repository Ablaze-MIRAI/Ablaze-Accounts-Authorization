import { Type } from "@sinclair/typebox";

export const OAuth2ApplicationSchema = Type.Object({
  client_id: Type.String(),
  redirect_uri: Type.String(),
});

export const OAuth2AcceptSchema = Type.Object({
  response_type: Type.Const("code"),
  client_id: Type.String(),
  redirect_uri: Type.String(),
  scope: Type.Const("user"),
  state: Type.String(),
  raw: Type.Optional(Type.Boolean())
});

export const OAuth2TokenSchema = Type.Object({
  grant_type: Type.Const("authorization_code"),
  client_id: Type.String(),
  code: Type.String()
});
