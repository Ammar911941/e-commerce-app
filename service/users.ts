import { db } from "@/lib/prisma";

export async function getAllUsers() {
  return await db.user.findMany();
}

export async function getUserById(id: string) {
  return await db.user.findUnique({ where: { clerkId: id } });
}
