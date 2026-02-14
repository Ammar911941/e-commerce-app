import { notFound } from "next/navigation";
import { getProductsById } from "@/service/products";
import ProductStyling from "../productStyle";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductsById(productId);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} - Buy Online`,
    description:
      product.description ||
      `Shop ${product.title} at the best price. High-quality products with fast delivery and secure checkout.`,
    keywords: [product.title, "buy online", "shop", "elvaro", "e-commerce"],
  };
}

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductsById(productId);

  // Add this check
  if (!product || (Array.isArray(product) && product.length === 0)) {
    notFound();
  }

  return (
    <section className="mt-30">
      <div className="container max-w-7xl m-auto p-5">
        <ProductStyling product={product} />
      </div>
    </section>
  );
}
