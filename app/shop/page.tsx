import Products from "./products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products - Browse Our Complete Collection",
  description:
    "Browse our complete collection of products. Find electronics, gaming gear, fashion, and more. Shop with confidence with fast delivery and secure checkout.",
};

export default async function Shop() {
  return (
    <section className="container mx-auto p-4">
      <Products />
    </section>
  );
}
