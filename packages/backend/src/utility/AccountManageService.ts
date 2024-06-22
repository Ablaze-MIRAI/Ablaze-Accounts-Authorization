import { FastifyInstance, FastifyRequest } from "fastify";
import * as PasswordService from "@/utility/PasswordService";
import { SignedState } from "@/typings/session";

export const Signin = (request: FastifyRequest, user: SignedState) =>{
  return request.session.set("signed", user);
}

export const VerifyByEmail = async (app: FastifyInstance, email: string, password: string) =>{
  const result = await app.prisma.idpEmail.findUnique({
    select: {
      password: true,
      user: {
        select: {
          uid: true,
          iid: true,
          screen_name: true,
          avatar: true,
          account_type: true
        }
      }
    },
    where: {
      email: email
    }
  });

  if(!result) return false;
  if(!(await PasswordService.CompareHash(password, result.password))) return false;

  return result;
}
