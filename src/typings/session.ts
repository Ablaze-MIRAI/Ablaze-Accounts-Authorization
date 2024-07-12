import type { $Enums } from "@prisma/client";

export type UserSession = {
  uid: string,
  name: string,
  avatar: string,
  role: $Enums.AccountType
}
