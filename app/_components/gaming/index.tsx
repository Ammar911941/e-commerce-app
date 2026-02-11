import Image from "next/image";
import Link from "@/components/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Gaming() {
  return (
    <section className="py-12 bg-linear-to-br from-orange-50 via-white to-orange-100">
      <div className="container max-w-7xl m-auto px-4 sm:px-8">
        <div className="gaming flex flex-col md:flex-row items-center justify-between md:pl-20 py-12 md:py-0 bg-white/80 my-16 rounded-2xl overflow-hidden shadow-xl border border-orange-100 ">
          <div className="leftImage relative w-64 h-64 md:w-72 md:h-72 shrink-0drop-shadow-xl">
            <Image
              src={"/right.webp"}
              alt="Speaker"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="text py-10 text-center flex-1 z-10 px-5">
            <h2 className="text-3xl md:text-4xl font-extrabold max-w-2xl mx-auto text-blue-950 mb-4 drop-shadow-lg">
              Level Up Your Gaming Experience
            </h2>
            <p className="max-w-xl mx-auto font-medium text-gray-700/80 my-5 text-lg">
              From immersive sound to precise controls—everything you need to
              win
            </p>
            <Link
              href={"/shop/Gaming"}
              className="group flex items-center justify-center gap-3 px-10 py-3 bg-orange-700 rounded-full text-white w-fit m-auto font-semibold shadow hover:bg-orange-800 transition-colors text-base"
            >
              <span>Buy now</span>
              <FaArrowRightLong className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="rightImage relative w-64 h-64 md:w-72 md:h-72 shrink-0 drop-shadow-xl">
            <Image
              src={"/left.webp"}
              alt="Speaker"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
