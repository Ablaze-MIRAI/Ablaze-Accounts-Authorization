-- AlterTable
ALTER TABLE "IdpEmail" ADD COLUMN     "nopassword" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "IdpGitHub" (
    "id" TEXT NOT NULL,
    "githubid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userlogin" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "IdpGitHub_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdpGitHub_githubid_key" ON "IdpGitHub"("githubid");

-- CreateIndex
CREATE UNIQUE INDEX "IdpGitHub_uid_key" ON "IdpGitHub"("uid");

-- AddForeignKey
ALTER TABLE "IdpGitHub" ADD CONSTRAINT "IdpGitHub_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
