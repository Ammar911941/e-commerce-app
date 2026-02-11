import Title from "./title";
import Product from "@/components/productStyle";

export default async function Products() {
  const allProducts = [
    {
      title: "Apple AirPods Pro 2nd gen",
      description:
        "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
      price: 7999,
      rate: 4,
      image: "/eztpmcwxkww1mlqijtse.avif",
      id: "a",
    },
    {
      title: "Apple AirPods Pro 2nd gen",
      description:
        "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
      price: 7999,
      image: "/eztpmcwxkww1mlqijtse.avif",
      rate: 4,
      id: "a",
    },
    {
      title: "Apple AirPods Pro 2nd gen",
      description:
        "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
      price: 7999,
      rate: 4,
      image: "/eztpmcwxkww1mlqijtse.avif",
      id: "a",
    },
  ];
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
