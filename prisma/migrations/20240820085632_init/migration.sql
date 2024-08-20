-- CreateTable
CREATE TABLE "IdpGoogle" (
    "id" TEXT NOT NULL,
    "googleid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "IdpGoogle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdpGoogle_googleid_key" ON "IdpGoogle"("googleid");

-- CreateIndex
CREATE UNIQUE INDEX "IdpGoogle_email_key" ON "IdpGoogle"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IdpGoogle_uid_key" ON "IdpGoogle"("uid");

-- AddForeignKey
ALTER TABLE "IdpGoogle" ADD CONSTRAINT "IdpGoogle_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
