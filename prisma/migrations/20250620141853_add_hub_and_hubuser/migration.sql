-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER');

-- CreateTable
CREATE TABLE "Hub" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HubUser" (
    "userId" TEXT NOT NULL,
    "hubId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "displayName" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HubUser_pkey" PRIMARY KEY ("userId","hubId")
);

-- AddForeignKey
ALTER TABLE "Hub" ADD CONSTRAINT "Hub_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubUser" ADD CONSTRAINT "HubUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubUser" ADD CONSTRAINT "HubUser_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "Hub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
