import { FastifyInstance } from "fastify";
import { SessionRevivalGenerate } from "./KeygenService";

export const issueRevivalToken = async (app: FastifyInstance, uid: string) =>{
  const token = SessionRevivalGenerate();

  await app.prisma.revivalToken.create({
    data: {
      token: token,
      uid: uid
    }
  });

  return token;
}
