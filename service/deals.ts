import { db } from "@/lib/prisma";

export async function getDeals() {
  return await db.deals.findMany();
}
