-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('GENERAL', 'MODERATOR', 'SUPERUSER');

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "screen_name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "account_type" "AccountType" NOT NULL DEFAULT 'GENERAL',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "RestoreToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" TEXT NOT NULL,

    CONSTRAINT "RestoreToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdpEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "IdpEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestoreToken_token_key" ON "RestoreToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "IdpEmail_email_key" ON "IdpEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IdpEmail_uid_key" ON "IdpEmail"("uid");

-- AddForeignKey
ALTER TABLE "RestoreToken" ADD CONSTRAINT "RestoreToken_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdpEmail" ADD CONSTRAINT "IdpEmail_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
