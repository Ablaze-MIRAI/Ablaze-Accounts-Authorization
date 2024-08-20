import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import * as jwt from "jsonwebtoken";

type ObjectStringOrNumber = {[key:string]: string | number};
export type CookieValueTypes = string | number | ObjectStringOrNumber;

export class CookieStore<T extends CookieValueTypes = string>{
  protected readonly cookie_name: string;
  protected readonly cookie_options: Partial<ResponseCookie>;

  protected serialize(value: CookieValueTypes): string{
    if(typeof value === "string" || typeof value === "number") return String(value);
    return JSON.stringify(value);
  }

  public constructor(cookie_name: string, cookie_options: Partial<ResponseCookie>){
    this.cookie_name = cookie_name;
    this.cookie_options = cookie_options;
  }

  public set(value: T): void{
    const serialized = this.serialize(value);
    cookies().set(this.cookie_name, serialized, this.cookie_options);
  };

  public get(): T | undefined{
    return cookies().get(this.cookie_name)?.value as T | undefined;
  }

  public delete(): void{
    cookies().delete(this.cookie_name);
  }
}

export class CookieSafeStore<T extends ObjectStringOrNumber>{
  private readonly cookiestore: CookieStore;
  private readonly secret: string;
  private readonly jwt_options: jwt.SignOptions;

  public constructor(secret: string, jwt_options: jwt.SignOptions, cookie_name: string, cookie_options: Partial<ResponseCookie>){
    this.cookiestore = new CookieStore<string>(cookie_name, cookie_options);
    this.secret = secret;
    this.jwt_options = jwt_options;
  }

  public set(payload: Partial<T>): void{
    const token = jwt.sign(payload, this.secret, this.jwt_options);
    this.cookiestore.set(token);
  }

  // TODO: Fix Bug
  public update(payload: Partial<T>): Partial<T> | undefined{
    const base_payload = this.verify();
    if(!base_payload){
      this.set(payload);
      return payload;
    };
    const result_payload = Object.assign(base_payload, payload);
    this.set(result_payload);
  }

  public verify(): Partial<T> | undefined{
    const token = this.cookiestore.get();
    if(token) return jwt.verify(token, this.secret, this.jwt_options) as Partial<T>;
    return undefined;
  }

  public delete(): void{
    this.cookiestore.delete();
  }
}
