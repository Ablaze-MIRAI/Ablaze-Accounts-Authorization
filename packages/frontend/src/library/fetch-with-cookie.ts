"use server";

import { merge } from "lodash";
import SetCookieParser from "set-cookie-parser";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

type FetchInput = string | URL | globalThis.Request;

type CookieAttronites = {
  domain?: string | undefined;
  expires?: Date | undefined;
  httpOnly?: boolean | undefined;
  maxAge?: number | undefined;
  partitioned?: boolean | undefined;
  path?: string | undefined;
  priority?: "low" | "medium" | "high" | undefined;
  sameSite?: true | false | "lax" | "strict" | "none" | undefined;
  secure?: boolean | undefined;
}

type CookieAdapter = {
  get: () => { name: string, value: string }[] | undefined;
  set: (key: string, value: string, attributes?: Partial<CookieAttronites>) => void
}

type Options = {
  cookieAdapter: Promise<CookieAdapter>,
  cookies?: {
    [key:string]: string
  }
}

export const FetchWithCookie = async (input: FetchInput, init: RequestInit & Options) =>{
  "use server";
  const cookies = await init.cookieAdapter;

  const clientcookies = cookies.get();
  const cookie_stringify = !clientcookies?"":clientcookies.map((v) => `${v.name}=${v.value};`).join();
  const inject = { "Cookie": cookie_stringify }

  const response = await fetch(input, merge(init, inject));

  const setcookie_header = response.headers.getSetCookie();
  const setcookies = SetCookieParser.parse(setcookie_header);
  setcookies.map(v => cookies.set(v.name, v.value, v));

  return response;
}

export const NextAdapter = async (nextcookies: ReadonlyRequestCookies): Promise<CookieAdapter> =>{
  "use server";
  return {
    get: () => nextcookies.getAll(),
    set: (key, value, attributes) => nextcookies.set(key, value, attributes)
  }
}
