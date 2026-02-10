import Image from "next/image";
import Link from "../link";
import { IoCartOutline } from "react-icons/io5";
export default function Header() {
  return (
    <header className="bg-linear-to-b from-orange-50 via-white to-orange-100 shadow-md rounded-b-2xl px-2 sm:px-6 py-2 relative mb-10 border-b border-orange-100">
      <div className="container flex justify-between items-center max-w-7xl m-auto">
        <div className="logo h-12 w-32 flex items-center">
          <Link href="/" className="relative h-12 w-32 block">
            <Image
              src="/logo.svg"
              alt="Logo Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-contain"
            />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/shop"}>Shop</Link>
            </li>
            <li>
              <Link href={"/about"}>About Us</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={"/cart"}>
                <IoCartOutline className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
