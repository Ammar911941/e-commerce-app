"use client";
import Image from "next/image";
import Link from "../link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  // Handle Toggle
  function handleToggleClick() {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  }

  return (
    <header className="bg-linear-to-b from-orange-50 via-white to-orange-100 shadow-md rounded-b-2xl px-2 sm:px-6 py-2  mb-10 border-b border-orange-100 fixed w-full z-50 ">
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
          <ul
            className={`min-[668px]:flex gap-6 text-base font-semibold items-center text-orange-700 max-[668px]:flex-col max-[668px]:space-y-3 max-[668px]:absolute max-[668px]:left-0 max-[668px]:w-full max-[668px]:top-full max-[668px]:bg-white max-[668px]:p-6 max-[668px]:rounded-b-2xl z-50 max-[668px]:transition-all max-[668px]:duration-300 max-[668px]:overflow-hidden max-[668px]:shadow-lg
              ${isOpen ? "max-[668px]:max-h-125 max-[668px]:opacity-100 max-[668px]:pointer-events-auto" : "max-[668px]:max-h-0 max-[668px]:opacity-0 max-[668px]:pointer-events-none"}`}
          >
            <li>
              <Link href={"/"} onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/shop"} onClick={() => setIsOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href={"/about"} onClick={() => setIsOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href={"/contact"} onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
            {role === "admin" && (
              <li>
                <Link href={"/admin"} onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link href={"/cart"} onClick={() => setIsOpen(false)}>
                <IoCartOutline className="h-6 w-6" aria-label="Cart" />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <div className="login">
            <SignedOut>
              <div className="signIn text-base text-orange-700 flex items-center gap-2">
                <SignInButton>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-1 rounded-full border border-orange-200 bg-white shadow hover:bg-orange-50 transition-colors"
                  >
                    <RiAccountCircleLine className="h-6 w-6" />
                    <span className="font-semibold">Login</span>
                  </Link>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center">
                <UserButton />
              </div>
            </SignedIn>
          </div>
          <div
            className="toggle hidden text-2xl max-[668px]:flex cursor-pointer text-orange-700"
            onClick={handleToggleClick}
          >
            <CiMenuBurger className={`${isOpen ? "hidden" : "block"}`} />
            <IoCloseOutline className={`${isOpen ? "block" : "hidden"}`} />
          </div>
        </div>
      </div>
    </header>
  );
}
