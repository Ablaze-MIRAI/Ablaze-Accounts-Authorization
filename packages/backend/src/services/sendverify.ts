import { FastifyInstance } from "fastify";

export const SendVerifyMail = async (app: FastifyInstance, email: string, pin: number): Promise<boolean> =>{
  try{
    await app.mailer.sendMail({
      to: email,
      subject: "Ablaze Accounts Email Verify",
      html: `<h1>Your verify code: ${pin}</h1>`
    });
    return true;
  }catch(e){
    return false;
  }
}
