import Image from "next/image";
import { Products } from "@prisma/client";

type ProductProps = {
  product: Products;
};

export default function ProductStyling({ product }: ProductProps) {
  return (
    <div className="product flex flex-col lg:flex-row justify-between items-start min-h-[71.5vh] gap-8 lg:gap-12 xl:gap-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="img relative w-full max-w-full lg:w-120 xl:w-130 h-80 sm:h-100 lg:h-120 xl:h-130 bg-linear-to-br from-orange-50 via-white to-orange-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 shrink-0 overflow-hidden group">
        <Image
          src={product.image}
          alt="Product Image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "contain" }}
          className="p-6 sm:p-8 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
        />
      </div>
      <div className="details flex-1 w-full lg:w-auto max-w-full">
        <div className="text max-w-full lg:max-w-150 flex flex-col">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight">
            {product.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3 leading-relaxed">
            {product.description}
          </p>
          <p className="text-3xl sm:text-4xl font-semibold text-orange-600 mt-6 sm:mt-8">
            EGP {product.price}
          </p>
        </div>
        <div className="buttons flex flex-col sm:flex-row items-stretch sm:items-center mt-8 sm:mt-10 gap-3 sm:gap-4 text-center">
          <button
            className={`w-full sm:flex-1 py-3 sm:py-3.5 px-6 bg-white text-gray-800 border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 transition-all duration-300 rounded-xl font-medium shadow-sm hover:shadow-md  `}
          >
            Add to Cart
          </button>
          <button className="w-full sm:flex-1 py-3 sm:py-3.5 px-6 bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
