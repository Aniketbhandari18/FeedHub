import prisma from "@/lib/prisma";
import { clerkUserPayload } from "@/types/user";
import { User } from "@prisma/client";

export const createUser = async (user: clerkUserPayload) => {
  const newUser: User = await prisma.user.create({ data: user });

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