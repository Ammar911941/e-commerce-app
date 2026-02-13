import { db } from "@/lib/prisma";

export async function getAllCategories() {
  try {
    return await db.category.findMany();
  } catch (error) {
    console.log(error);
    return [];
  }
}
