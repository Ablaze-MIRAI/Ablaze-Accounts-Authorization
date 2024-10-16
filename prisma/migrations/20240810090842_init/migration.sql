-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('GENERAL', 'MODERATOR', 'SUPERUSER');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('PUBLIC', 'CONFIDENTIAL');

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
    "ip" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "uid" TEXT NOT NULL,

    CONSTRAINT "RestoreToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdpEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nopassword" BOOLEAN NOT NULL DEFAULT false,
    "uid" TEXT NOT NULL,

    CONSTRAINT "IdpEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdpGitHub" (
    "id" TEXT NOT NULL,
    "githubid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userlogin" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "IdpGitHub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcceptApp" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" TEXT NOT NULL,

    CONSTRAINT "AcceptApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "client_type" "ClientType" NOT NULL,
    "scope" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestoreToken_token_key" ON "RestoreToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "IdpEmail_email_key" ON "IdpEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IdpEmail_uid_key" ON "IdpEmail"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "IdpGitHub_githubid_key" ON "IdpGitHub"("githubid");

-- CreateIndex
CREATE UNIQUE INDEX "IdpGitHub_uid_key" ON "IdpGitHub"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "RestoreToken" ADD CONSTRAINT "RestoreToken_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdpEmail" ADD CONSTRAINT "IdpEmail_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdpGitHub" ADD CONSTRAINT "IdpGitHub_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcceptApp" ADD CONSTRAINT "AcceptApp_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
