"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import Image from "next/image";
import Link from "@/components/link";

export default function Swib({ deals }: any) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      speed={1000}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      className="pb-12!"
      style={{ height: "auto" }}
    >
      {deals.map((deal, index) => (
        <SwiperSlide key={deal.id} className="h-auto!">
          <div className="slide h-full bg-linear-to-br from-orange-50 via-white to-orange-100 p-8 sm:p-12 flex gap-10 min-[668px]:ps-20 items-center max-[668px]:flex-col-reverse max-[668px]:gap-5 rounded-3xl shadow-xl border border-orange-100 transition-transform duration-300 hover:scale-[1.01]">
            <div className="text max-w-lg">
              <p className="text-orange-700 mb-3 font-semibold tracking-wide uppercase text-sm drop-shadow">
                {deal.offer}
              </p>
              <h2 className="font-extrabold text-5xl text-blue-950 max-[668px]:text-2xl leading-tight mb-4 drop-shadow-lg">
                {deal.details}
              </h2>
              <Link
                href={deal.link}
                className="bg-orange-700 text-white rounded-full py-2 px-7 text-base font-semibold shadow hover:bg-orange-800 transition-colors duration-200 inline-block mt-4"
              >
                Find More
              </Link>
            </div>
            <div className="img relative w-80 h-80 max-[668px]:w-64 max-[668px]:h-64 drop-shadow-xl">
              <Image
                src={deal.image}
                fill
                sizes="(max-width: 768px) 256px, 320px"
                alt={`${deal.offer} - ${deal.details}`}
                className="object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
