import { $Enums } from "@prisma/client";

declare module "fastify" {
  interface Session {
    signup_register: SignupRegisterState,
    signed: SignedState
  }
}

export type SignupRegisterState = {
  email: string,
  password: string,
  pin: number
}

export type SignedState = {
  iid: string,
  type: $Enums.AccountType,
  avatar: string,
  name: string
}
