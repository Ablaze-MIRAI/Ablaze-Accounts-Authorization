import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import SendVerify from "./email/send-verify";

export const InternalRouter: FastifyPluginAsyncZod = async (app) =>{
  app.post("/email/sendverify", ...SendVerify);
};
