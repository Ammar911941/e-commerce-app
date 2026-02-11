import ProductStyling from "../productStyle";

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const product = {
    title: "Apple AirPods Pro 2nd gen",
    description:
      "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
    price: 7999,
    rate: 4,
    image: "/eztpmcwxkww1mlqijtse.avif",
    id: "a",
  };
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <section>
      <div className="container max-w-7xl m-auto p-5">
        <ProductStyling product={product} />
      </div>
    </section>
  );
}
