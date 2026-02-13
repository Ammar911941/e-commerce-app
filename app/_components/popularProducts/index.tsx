import Link from "@/components/link";
import Product from "@/components/productStyle";
import { getPopularProducts } from "@/service/products";

export default async function PopularProducts() {
  const popularProducts = await getPopularProducts();
  return (
    <section>
      <div className="container max-w-7xl m-auto p-5">
        {popularProducts.length ? (
          <>
            <h3 className="font-medium text-2xl text-blue-950 mb-5">
              Popular Products
            </h3>
            <Product products={popularProducts} name="popularProducts" />
            <Link
              href={"/shop"}
              className="px-8 py-2.5 bg-orange-700 text-white rounded-full shadow font-semibold hover:bg-orange-800 transition-colors text-center m-auto block w-fit mt-10"
            >
              See more
            </Link>
          </>
        ) : (
          <p className="font-medium text-2xl text-blue-950 mb-5 text-center">
            No Popular Products Founded
          </p>
        )}
      </div>
    </section>
  );
}
