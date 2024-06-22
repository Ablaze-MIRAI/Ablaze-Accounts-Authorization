/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `OAuth2AuthorizationCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OAuth2AuthorizationCode_code_key" ON "OAuth2AuthorizationCode"("code");
