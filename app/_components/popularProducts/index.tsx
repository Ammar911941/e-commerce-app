import Link from "@/components/link";
import Product from "@/components/productStyle";

export default async function PopularProducts() {
  const popularProducts = [
    {
      title: "Apple AirPods Pro 2nd gen",
      description:
        "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
      price: "7999",
      rate: "4",
      image: "/eztpmcwxkww1mlqijtse.avif",
    },
    {
      title: "Apple AirPods Pro 2nd gen",
      description:
        "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
      price: "7999",
      image: "/eztpmcwxkww1mlqijtse.avif",
      rate: "4",
    },
    {
      title: "Apple AirPods Pro 2nd gen",
      description:
        "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
      price: "7999",
      rate: "4",
      image: "/eztpmcwxkww1mlqijtse.avif",
    },
  ];
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
            No Popular Products
          </p>
        )}
      </div>
    </section>
  );
}
