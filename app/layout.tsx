import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { syncUser } from "@/lib/sync-user";
import { CartProvider } from "@/contexts/cartContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "E-Commerce - Your Premium Online Shopping Destination",
    template: "%s | E-Commerce",
  },
  description:
    "Discover the best deals on electronics, gaming gear, fashion, and more. Shop with confidence at E-Commerce - your trusted online store with fast delivery and excellent customer service.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser();
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en">
          <body className={`${outfit.className} antialiased`}>
            <Header />
            <main>{children}</main>
            <Footer />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
