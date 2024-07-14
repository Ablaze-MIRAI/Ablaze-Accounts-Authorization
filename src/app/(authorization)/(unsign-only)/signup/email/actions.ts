"use server";

import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { hash } from "bcrypt";
import { generatePinSync } from "secure-pin";
import z from "zod";
import { EmailSignupSchema } from "./schema";
import { SendEmail } from "@/library/mail";
import { createHashWithExpire, deleteKey, getHash } from "@/library/kv";
import { checkExistsUser, createUserWithEmail } from "@/data/email";

const hash_salt = 10;
const email_session_expires = 60*10;
const email_session_store_prefix = "_email";
const email_session_cookie = "_next_email_session";
const generateSessionId = () => randomBytes(32).toString("hex");

type SchemaType = z.infer<typeof EmailSignupSchema>;
type SubmitActionResultType = "exist" | "ok";
export const onSubmitAction = async (data: SchemaType, lang: string): Promise<SubmitActionResultType> =>{
  const isExist = await checkExistsUser(data.email);
  if(isExist) return "exist";

  const hashed_password = await hash(data.password, hash_salt);
  const sessionid = generateSessionId();
  const verifypin = generatePinSync(6);

  try{
    SendEmail({
      to: data.email,
      subject: "Ablaze Accounts 認証コード",
      html: `<h1>認証コード: ${verifypin}</h1>`,
      priority: "high"
    });
  }catch(e){
    console.error(e);
  }

  await createHashWithExpire(email_session_store_prefix, sessionid, email_session_expires, {
    email: data.email,
    hashed_password: hashed_password,
    pin: verifypin,
    lang: lang
  });

  cookies().set(email_session_cookie, sessionid, {
    path: "/",
    httpOnly: true,
    maxAge: email_session_expires
  });

  return "ok";
};

type VerifyActionResultType = "badrequest" | "notmatch" | "ok";
export const onVerifyAction = async (pin: string): Promise<VerifyActionResultType> =>{
  const sessionid = cookies().get(email_session_cookie)?.value;
  if(!sessionid) return "badrequest";

  const session = await getHash(email_session_store_prefix, sessionid);
  if(!session) return "badrequest";

  console.log(session.pin);
  console.log(pin);

  if(session.pin !== pin) return "notmatch";
  await deleteKey(email_session_store_prefix, sessionid);
  cookies().delete(email_session_cookie);

  await createUserWithEmail(session.email, session.hashed_password);

  SendEmail({
    to: session.email,
    subject: "Ablaze Accountsへようこそ",
    html: `<h2>Ablaze Accountsへの登録が完了しましたのでお知らせいたします<br/><a href="https://accounts.ablaze.one/">https://accounts.ablaze.one/</h2>`,
    priority: "normal"
  });

  return "ok";
};
