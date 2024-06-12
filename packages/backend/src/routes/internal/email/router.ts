import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import EmailRoot from "./root";

export const EmailRouter: FastifyPluginAsyncZod = async (app) =>{
  app.get("/", ...EmailRoot);
};
