/*
  Warnings:

  - You are about to drop the column `iid` on the `OAuth2AuthorizationCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `OAuth2AuthorizationCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OAuth2AuthorizationCode" DROP CONSTRAINT "OAuth2AuthorizationCode_iid_fkey";

-- AlterTable
ALTER TABLE "OAuth2AuthorizationCode" DROP COLUMN "iid",
ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "OAuth2AuthorizationCode" ADD CONSTRAINT "OAuth2AuthorizationCode_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
