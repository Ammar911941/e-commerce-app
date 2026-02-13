import { notFound } from "next/navigation";
import { getProductsById } from "@/service/products";
import ProductStyling from "../productStyle";

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
    <section>
      <div className="container max-w-7xl m-auto p-5">
        <ProductStyling product={product} />
      </div>
    </section>
  );
}
