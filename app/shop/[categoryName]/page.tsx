import { getAllCategories } from "@/service/categories";
import { getProductsBasedOnCategory } from "@/service/products";
import Title from "../title";
import Product from "@/components/productStyle";
export async function generateStaticParams() {
  const categoriesName = (await getAllCategories()).map((e) => {
    return { category: e };
  });
  return categoriesName;
}
export default async function Categroy({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const { categoryName } = await params;
  const name = decodeURIComponent(categoryName);
  const products = await getProductsBasedOnCategory(name);
  return (
    <section>
      <div className="container max-w-7xl m-auto p-5">
        <>
          <Title name={name} />
          <Product products={products} name="products" />
        </>
      </div>
    </section>
  );
}
