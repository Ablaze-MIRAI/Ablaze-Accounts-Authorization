/*
  Warnings:

  - A unique constraint covering the columns `[rid]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "rid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_rid_key" ON "RefreshToken"("rid");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_rid_fkey" FOREIGN KEY ("rid") REFERENCES "RestoreToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
