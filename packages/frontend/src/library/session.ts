import { NextRequest, NextResponse } from "next/server";
import { randomBytes, randomUUID } from "crypto";
import { redis } from "./redis";

// @TODO
const isSecure = false;
//const sessionname = "nextsession";
//const sessionexp = 60 * 60 * 24 * 120;

export const handleRequestSession = async (request: NextRequest, response: NextResponse, sessionname: string, exp: number) =>{
  const key = sessionkeygen();
  const sessionkey = request.cookies.get(sessionname)?.value;
  if(!sessionkey) return setcookie(response, sessionname, key, exp);

  const session = await sessionhas(sessionkey);
  if(!session) return setcookie(response, sessionname, key, exp);

  rename(sessionkey, key);
  return setcookie(response, sessionname, key, exp);
}

const sessionkeygen = () => `${randomUUID()}#${randomBytes(32).toString("hex")}`;

const sessionhas = async (id: string) =>{
  try{
    return await redis.get(id);
  }catch(e){
    return undefined;
  }
};

const setcookie = (response: NextResponse, name: string, key: string, exp: number) => response.cookies.set({
  name: name,
  value: key,
  httpOnly: true,
  secure: isSecure,
  expires: exp
});

const rename = async (oldkey: string, newkey: string) =>{
  try{
    return await redis.rename(oldkey, newkey);
  }catch(e){
    return undefined;
  }
}
