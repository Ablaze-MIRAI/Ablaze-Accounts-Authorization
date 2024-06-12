import { Schema, Handler, Endpoint } from "@/utility/endpoint";
import { SendVerifySchema } from "@a3/common/schemas/internal-email";
import { FastifyRequest } from "fastify";
import { z } from "zod";

const options = Schema({
  body: SendVerifySchema
});

const handler = Handler(async (request, response) =>{
  const { email } = request.body;
  request.mailer
});

export default Endpoint(options, handler);
