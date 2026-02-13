import { db } from "@/lib/prisma";

export async function getAllProducts() {
  try {
    return await db.products.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPopularProducts() {
  try {
    return await db.products.findMany({
      orderBy: [{ order: "desc" }, { createdAt: "desc" }],
      take: 10,
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProductsById(id: string) {
  try {
    return await db.products.findUnique({ where: { id: id } });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFeaturedProducts() {
  try {
    return await db.featuredProducts.findMany();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProductsBasedOnCategory(name: string) {
  try {
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
  } catch (error) {
    console.log(error);
    return [];
  }
}
