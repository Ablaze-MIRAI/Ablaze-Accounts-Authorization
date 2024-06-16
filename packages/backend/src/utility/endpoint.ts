import { RouteShorthandOptions, RouteHandlerMethod, FastifySchema } from "fastify";

export const Endpoint = <
  Options = RouteShorthandOptions,
  Handler = RouteHandlerMethod
>(options: Options, handler: Handler): [Options, Handler] =>{
  return [options, handler];
}

export const Schema = <T = FastifySchema>(schema: T) => ({ schema: schema });

export const Handler = <T = RouteHandlerMethod>(handler: T): T => handler;
