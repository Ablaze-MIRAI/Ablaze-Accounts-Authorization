import { FastifySchema, RouteShorthandOptions } from "fastify";

export const Schema = <T extends FastifySchema = FastifySchema>(schema: T) => { schema: schema };
