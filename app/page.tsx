import FeaturedProducts from "./_components/featuredProducts";
import Gaming from "./_components/gaming";
import Intro from "./_components/intro";
import PopularProducts from "./_components/popularProducts";

export default function Home() {
  return (
    <>
      <Intro />
      <PopularProducts />
      <FeaturedProducts />
      <Gaming />a
    </>
  );
}
