import { db } from "@/lib/prisma";

export async function getAllUsers() {
  try {
    return await db.user.findMany();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getUserById(id: string) {
  try {
    return await db.user.findUnique({ where: { clerkId: id } });
  } catch (error) {
    console.log(error);
    return [];
  }
}
