import { getAllCategories } from "@/service/categories";
import { getProductsBasedOnCategory } from "@/service/products";
import Title from "../title";
import Product from "@/components/productStyle";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const categoriesName = (await getAllCategories()).map((e) => {
    return { categoryName: e.name };
  });

  return categoriesName;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}): Promise<Metadata> {
  const { categoryName } = await params;
  const name = decodeURIComponent(categoryName);

  return {
    title: `${name} Products - Shop ${name} Collection`,
    description: `Browse our ${name} collection. Find the best ${name} products with competitive prices, fast delivery, and secure checkout.`,
  };
}

export default async function Category({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const { categoryName } = await params;
  const name = decodeURIComponent(categoryName);
  const products = await getProductsBasedOnCategory(name);
  return (
    <section className="mt-35">
      <div className="container max-w-7xl m-auto p-5">
        <>
          <Title name={name} />
          <Product products={products} name="products" />
        </>
      </div>
    </section>
  );
}
