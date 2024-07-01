-- CreateTable
CREATE TABLE "RevivalToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "RevivalToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcceptApp" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" TEXT NOT NULL,

    CONSTRAINT "AcceptApp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RevivalToken" ADD CONSTRAINT "RevivalToken_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcceptApp" ADD CONSTRAINT "AcceptApp_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
