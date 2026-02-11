import { db } from "@/lib/prisma";

export async function getAllCategories() {
  return await db.category.findMany();
}
