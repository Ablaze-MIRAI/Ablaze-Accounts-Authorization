/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `RevivalToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RevivalToken_token_key" ON "RevivalToken"("token");
