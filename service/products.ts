import { db } from "@/lib/prisma";

export async function getAllProducts() {
  return await db.products.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPopularProducts() {
  return await db.products.findMany({
    orderBy: [{ order: "desc" }, { createdAt: "desc" }],
    take: 10,
  });
}

export async function getProductsById(id: string) {
  return await db.products.findUnique({ where: { id: id } });
}

export async function getFeaturedProducts() {
  return await db.featuredProducts.findMany();
}

export async function getProductsBasedOnCategory(name: string) {
  return await db.products.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      category: {
        name: name,
      },
    },
  });
}
