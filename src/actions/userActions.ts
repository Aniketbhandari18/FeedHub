import { clerkClient } from "@/lib/clerkClient";
import prisma from "@/lib/prisma";
import { clerkUserPayload } from "@/types/user";
import { User } from "@prisma/client";

export const createUser = async (user: clerkUserPayload) => {
  const newUser: User = await prisma.user.create({ data: user });

  await clerkClient.users.updateUserMetadata(user.clerkId, {
    publicMetadata: {
      dbUserId: newUser.id
    }
  })

  return newUser;
};

export const updateUser = async (clerkId: string, user: clerkUserPayload) => {
  const updatedUser: User = await prisma.user.update({
    data: user,
    where: { clerkId },
  });

  return updatedUser;
};

export const deleteUser = async (clerkId: string) => {
  const deletedUser: User = await prisma.user.delete({
    where: { clerkId },
  });

  return deletedUser;
};