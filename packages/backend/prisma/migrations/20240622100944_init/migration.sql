/*
  Warnings:

  - You are about to drop the `OAuth2AuthorizationCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OAuth2AuthorizationCode" DROP CONSTRAINT "OAuth2AuthorizationCode_iid_fkey";

-- DropTable
DROP TABLE "OAuth2AuthorizationCode";

-- CreateTable
CREATE TABLE "Oauth2AuthorizationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "iid" TEXT NOT NULL,

    CONSTRAINT "Oauth2AuthorizationCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Oauth2AuthorizationCode" ADD CONSTRAINT "Oauth2AuthorizationCode_iid_fkey" FOREIGN KEY ("iid") REFERENCES "User"("iid") ON DELETE CASCADE ON UPDATE CASCADE;
