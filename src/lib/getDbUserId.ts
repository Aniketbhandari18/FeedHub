import { CustomSessionClaims } from "@/types/clerk";
import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function getDbUserId() {
  const { userId, sessionClaims } = await auth();

  const typedClaims = sessionClaims as CustomSessionClaims;
  const dbUserId = typedClaims?.publicMetadata?.dbUserId;

  if (!dbUserId){
    if (!userId) {
      throw new Error("Unauthorized - No user id found");
    }
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error("Unauthorized - No user found in database");
    }

    return user.id;
  }

  return dbUserId;
}