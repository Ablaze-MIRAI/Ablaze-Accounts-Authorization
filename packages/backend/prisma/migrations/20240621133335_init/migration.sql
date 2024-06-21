-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('GENERAL', 'MODERATOR', 'SUPERUSER');

-- CreateTable
CREATE TABLE "User" (
    "iid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "screen_name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "account_type" "AccountType" NOT NULL DEFAULT 'GENERAL',

    CONSTRAINT "User_pkey" PRIMARY KEY ("iid")
);

-- CreateTable
CREATE TABLE "IdpEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "iid" TEXT NOT NULL,

    CONSTRAINT "IdpEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdpGitHub" (
    "id" TEXT NOT NULL,

    CONSTRAINT "IdpGitHub_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdpEmail_email_key" ON "IdpEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IdpEmail_iid_key" ON "IdpEmail"("iid");

-- AddForeignKey
ALTER TABLE "IdpEmail" ADD CONSTRAINT "IdpEmail_iid_fkey" FOREIGN KEY ("iid") REFERENCES "User"("iid") ON DELETE CASCADE ON UPDATE CASCADE;
