import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { SendVerifySchema } from "@a3/common/schemas/internal-email";
import { SendVerifyMail } from "@/services/sendverify";

export const EmailRouter: FastifyPluginAsyncZod = async (app) =>{
  app.post("/emailverify", { schema: { body: SendVerifySchema } }, async (request, response) =>{
    const pin = Math.round(Math.random()*(10**6));
    const result = await SendVerifyMail(app, request.body.email, pin);
    if(!result) return response.code(500).send({ success: false, message: "fail_send_mail" });
    return { success: true, data: { pin: pin } };
  });
};
