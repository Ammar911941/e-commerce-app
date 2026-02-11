import Image from "next/image";
import Link from "@/components/link";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

export default async function FeaturedProducts() {
  const featuredProducts = [
    {
      title: "Unparalleled Sound",
      description: "Unparalleled Sound",
      image: "/eztpmcwxkww1mlqijtse.avif",
      link: "/",
    },
    {
      title: "Unparalleled Sound",
      description: "Unparalleled Sound",
      image: "/eztpmcwxkww1mlqijtse.avif",
      link: "/",
    },
    {
      title: "Unparalleled Sound",
      description: "Unparalleled Sound",
      image: "/eztpmcwxkww1mlqijtse.avif",
      link: "/",
    },
  ];
  return (
    <section className="py-10 bg-linear-to-br from-orange-50 via-white to-orange-100">
      <div className="container max-w-7xl m-auto relative px-4 sm:px-8">
        <div className="title mb-16">
          <div className="text w-fit m-auto my-10 relative">
            <h1 className="font-extrabold text-4xl sm:text-5xl text-blue-950 tracking-tight text-center drop-shadow-lg">
              Featured Products
            </h1>
            <span className="absolute w-36 h-1 bg-orange-600 left-2/4 -translate-x-1/2 -bottom-4 rounded-full shadow"></span>
          </div>
        </div>
        <div className="featuredProducts flex gap-8 min-h-100 justify-between max-[1024px]:gap-6 max-[900px]:flex-wrap">
          {featuredProducts.length ? (
            <>
              {featuredProducts.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-end grow group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-87.5 bg-white"
                >
                  <div className="img absolute w-full h-full">
                    <Image
                      src={item.image}
                      alt={`${item.title} - ${item.description}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="transition-transform duration-300 group-hover:scale-105"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div className="landing absolute bg-linear-to-t from-black/60 via-black/30 to-transparent w-full h-full group-hover:from-black/80 transition-colors duration-300"></div>
                  </div>
                  <div className="text relative p-6 sm:p-7 text-white duration-300 group-hover:-translate-y-3 z-10">
                    <h4 className="font-bold text-2xl lg:text-3xl mb-2 drop-shadow">
                      {item.title}
                    </h4>
                    <p className="text-sm lg:text-base leading-5 max-w-60 mb-5 opacity-90">
                      {item.description}
                    </p>
                    <Link
                      href={`${item.link}`}
                      className="bg-orange-600 px-5 py-2 rounded-full flex items-center gap-3 w-fit font-semibold shadow hover:bg-orange-700 transition-colors"
                    >
                      <span>Buy now</span>
                      <LuSquareArrowOutUpRight />
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="font-medium text-2xl text-blue-950 mb-5 text-center w-full">
              No Featured Founded
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
