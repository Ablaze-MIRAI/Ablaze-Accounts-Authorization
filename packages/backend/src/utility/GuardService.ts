import { FastifyReply, FastifyRequest } from "fastify";
import { SignedState } from "@/typings/session";
import { ResultFaild } from "./ResultService";
import ResultCode from "@/ResultCode";

declare module "fastify" {
  export interface FastifyRequest {
    guard: SignedState
  }
}

export const isSigned = (request: FastifyRequest, reply: FastifyReply, next: any) =>{
  const user = request.session.get("signed");
  if(!user) return reply.send(ResultFaild(ResultCode.SESSION_ERROR));
  request.guard = user;
  next();
}
