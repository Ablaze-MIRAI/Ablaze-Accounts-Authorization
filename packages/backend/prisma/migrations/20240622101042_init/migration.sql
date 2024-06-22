/*
  Warnings:

  - You are about to drop the `Oauth2AuthorizationCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Oauth2AuthorizationCode" DROP CONSTRAINT "Oauth2AuthorizationCode_iid_fkey";

-- DropTable
DROP TABLE "Oauth2AuthorizationCode";

-- CreateTable
CREATE TABLE "OAuth2AuthorizationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "iid" TEXT NOT NULL,

    CONSTRAINT "OAuth2AuthorizationCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OAuth2AuthorizationCode" ADD CONSTRAINT "OAuth2AuthorizationCode_iid_fkey" FOREIGN KEY ("iid") REFERENCES "User"("iid") ON DELETE CASCADE ON UPDATE CASCADE;
