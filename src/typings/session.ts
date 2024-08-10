import type { $Enums } from "@prisma/client";

export type UserSession = {
  id: string
  uid: string,
  name: string,
  avatar: string,
  role: $Enums.AccountType
}
