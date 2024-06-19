import { FastifyInstance, FastifyRequest } from "fastify";
import { readFile } from "fs/promises";
import ejs from "ejs";
import { Static } from "@sinclair/typebox";
import { EmailSignupRegisterSchema } from "@/schema/AuthEmailSignup";
import { ResultFaild, ResultSuccess } from "@/utility/ResultService";
import { Result } from "@/typings/result";
import * as AccountCreate from "@/utility/AccountCreateService";
import { EmailSend } from "@/utility/EmailService";
import { PinGenerate } from "@/utility/KeygenService";
import { AcceptLanguage } from "@/utility/Props";
import ResultCode from "@/ResultCode";

export const Register = async (app: FastifyInstance, request: FastifyRequest): Promise<Result> =>{
  const { email, password, lang } = request.body as Static<typeof EmailSignupRegisterSchema>;

  const vlang = AcceptLanguage(lang);
  const template = (await readFile(`${__dirname}/../../templates/signup-verify/${vlang}.ejs`)).toString();
  const pin = PinGenerate();
  const content = ejs.render(template, { pin: pin });
  await EmailSend(app, email, "Ablaze Accounts Email Verify", content);

  request.session.set("signup_register", {
    email: email,
    password: password,
    pin: pin
  });

  return ResultSuccess(1001);
}

export const Verifypin = async (app: FastifyInstance, request: FastifyRequest, pin: number): Promise<Result> =>{
  const userinfo = request.session.get("signup_register");
  if(!userinfo) return ResultFaild(ResultCode.SESSION_ERROR);
  if(!userinfo?.email || !userinfo.password || !userinfo.pin) return ResultFaild(ResultCode.EMAIL_PIN_ERROR);
  if(userinfo.pin !== pin) return ResultFaild(ResultCode.EMAIL_PIN_ERROR);

  await AccountCreate.ByEmail(app, {
    email: userinfo.email,
    password: userinfo.password
  });

  request.session.destroy();
  return ResultSuccess(1001);
}
