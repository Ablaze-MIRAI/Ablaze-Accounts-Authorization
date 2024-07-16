import OAuth2Application from "@/oauth2application";
import type { NextRequest } from "next/server";
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { ApplicationConfidentialType, ApplicationType, OAuth2Query } from "@/typings/oauth2";

export const secondsAgo = (seconds: number) => new Date((new Date()).getTime()+seconds*1000);

export const withContinue = (default_uri: string, continue_uri: string | undefined | null = undefined) =>
  continue_uri ? `${default_uri}?continue=${encodeURIComponent(continue_uri)}` : default_uri;

export const withContinueQuery = (query: ReadonlyURLSearchParams): { continue: string } | undefined =>{
  const continue_uri = query.get("continue");
  if(continue_uri) return { continue: continue_uri };
  return undefined;
};

export const withContinuePage = (continueuri: string) =>{
  if(!continueuri) return undefined;
  return { continue: continueuri };
};

export const validateOAuth2Query = (q: Partial<OAuth2Query>): false | OAuth2Query =>{
  if(!(q.client_id && q.redirect_uri && q.response_type && q.scope && q.state)) return false;
  if(!(q.response_type === "code" && q.scope === "user")) return false;
  const response_mode = q.response_mode ?? "token";
  if(!["web_message", "query"].includes(response_mode)) return false;

  return {
    client_id: q.client_id,
    redirect_uri: q.redirect_uri,
    scope: q.scope,
    response_type: q.response_type,
    response_mode: q.response_mode ?? "token",
    prompt: q.prompt,
    state: q.state
  };
};

export const validateOAuth2Application = (cid: string, redirecturi: string): false | ApplicationType | ApplicationConfidentialType =>{
  const application = OAuth2Application[cid];
  if(!application) return false;
  if(!application.callback.includes(redirecturi)) return false;
  return application;
};

type OAuth2Error = "access_denied" | "server_error";
export const builderOAuth2ErrorUri = (base: string, state: string, error: OAuth2Error) =>
  `${base}?state=${state}&error=${error}`;

export const builderOAuth2RedirectUri = (base: string, state: string, code: string) =>
  `${base}?state=${state}&code=${code}`;

export const validateOAuth2TokenEndpoint = async (request: NextRequest): Promise<null | string> =>{
  const form = await request.formData();

  if(!form.get("grant_type")) return null;

  const code = form.get("code") as string | null;
  if(!code) return null;

  const client_id = form.get("client_id") as string | null;
  const client_secret = form.get("client_secret") as string | null;
  if(!client_id || !client_secret) return null;

  const application = OAuth2Application[client_id];
  if(application.client !== "CONFIDENTIAL") return null;
  if(application.client_secret !== client_secret) return null;

  return code;
};

export const validateOAuth2TokenEndpointByPublic = async (request: NextRequest): Promise<null | string> =>{
  const form = await request.formData();
  if(form.get("grant_type") !== "authorization_code") return null;

  const code = form.get("code") as string | null;
  if(!code) return null;

  const client_id = form.get("client_id") as string | null;
  if(!client_id) return null;

  const application = OAuth2Application[client_id];
  if(application.client !== "PUBLIC") return null;

  return code;
};
