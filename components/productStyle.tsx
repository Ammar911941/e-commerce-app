import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "./link";
import { Products } from "@prisma/client";
type productProps = {
  products: Products[];
  name: string;
};
export default function Product({ products, name }: productProps) {
  return (
    <div
      className={`${name} grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 justify-between max-[478px]:justify-center mb-5`}
    >
      {products.map((item, index) => (
        <div
          className="product-item bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-orange-50 flex flex-col overflow-hidden group"
          key={index}
        >
          <div className="image bg-linear-to-br from-orange-50 via-white to-orange-100 rounded-t-2xl mb-4 py-6 flex justify-center relative min-h-52 group-hover:scale-105 transition-transform duration-300">
            <Image
              src={item.image}
              alt={item.title}
              sizes="(max-width: 478px) 100vw, (max-width: 768px) 50vw, 220px"
              fill
              className="p-3 object-contain drop-shadow-md"
            />
          </div>
          <div className="text px-4 flex-1 flex flex-col">
            <h4 className="font-semibold text-lg mb-1 text-gray-900 group-hover:text-orange-700 transition-colors line-clamp-2">
              {item.title}
            </h4>
            <p className="text-xs text-gray-500/80 mb-2 line-clamp-2">
              {item.description}
            </p>
            <div className="rate flex items-center mb-2">
              <p className="text-orange-500 font-semibold me-2">{item.rate}</p>
              <div className="imgRate flex gap-0.5">
                {Array.from({ length: 5 }, (_, index) => {
                  const starNumber = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className={`h-4 w-4 transition-colors ${starNumber <= item.rate ? "text-orange-500" : "text-gray-300"}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="price flex justify-between items-center gap-3 px-4 py-3 border-t border-orange-50 bg-orange-50">
            <p className="text-base font-bold text-orange-700 truncate shrink min-w-0">
              EGP {item.price}
            </p>
            <Link
              href={`/product/${item.id}`}
              className="px-5 py-2 text-white bg-orange-700 rounded-full text-xs font-semibold shadow hover:bg-orange-800 transition-colors duration-200 shrink-0"
            >
              Buy Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
