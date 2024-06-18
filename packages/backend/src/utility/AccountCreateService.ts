import { FastifyInstance } from "fastify";
import * as PasswordService from "@/utility/PasswordService";

type AccountCreateByEmail = {
  email: string,
  password: string
};

export const ByEmail = async (app: FastifyInstance, { email, password }: AccountCreateByEmail) =>{
  const screen_name = email.split("@")[0];
  const hashed_password = await PasswordService.Hash(password);

  return await app.prisma.user.create({
    data: {
      screen_name: screen_name,
      avator: `https://source.boringavatars.com/beam/128/${screen_name}?square`,
      idp_email: {
        create: {
          email: email,
          password: hashed_password
        }
      }
    }
  });
}
