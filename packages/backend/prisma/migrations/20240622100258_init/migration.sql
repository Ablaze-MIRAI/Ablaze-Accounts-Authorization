-- CreateTable
CREATE TABLE "OAuth2AuthorizationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "iid" TEXT NOT NULL,

    CONSTRAINT "OAuth2AuthorizationCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OAuth2AuthorizationCode" ADD CONSTRAINT "OAuth2AuthorizationCode_iid_fkey" FOREIGN KEY ("iid") REFERENCES "User"("iid") ON DELETE CASCADE ON UPDATE CASCADE;
