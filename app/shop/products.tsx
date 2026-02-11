import { getAllProducts } from "@/service/products";
import Title from "./title";
import Product from "@/components/productStyle";

export default async function Products() {
  const allProducts = await getAllProducts();
  return (
    <section>
      <div className="container max-w-7xl m-auto p-5">
        {allProducts.length ? (
          <>
            <Title name="Our Producs" />
            <Product products={allProducts} name="AllProducts" />
          </>
        ) : (
          <p className="font-medium text-2xl text-blue-950 mb-5 text-center">
            No Products Founded
          </p>
        )}
      </div>
    </section>
  );
}
