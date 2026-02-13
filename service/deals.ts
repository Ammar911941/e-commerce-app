import { db } from "@/lib/prisma";

export async function getDeals() {
  try {
    return await db.deals.findMany();
  } catch (error) {
    console.log(error);
    return [];
  }
}
