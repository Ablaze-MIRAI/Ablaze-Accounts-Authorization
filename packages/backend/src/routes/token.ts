import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const TokenRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.addHook("onRoute", (options) =>{
    const schema = options.schema;
    if(!schema) return;
    if(!schema.tags) schema.tags = [];
    schema.tags = [...schema.tags, "OAuth2"]
  });
};
