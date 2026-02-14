import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with E-Commerce",
  description:
    "Have questions? Contact our customer support team. We're here to help with your orders, product inquiries, and any concerns. Fast response guaranteed.",
  keywords: [
    "contact us",
    "customer support",
    "help",
    "customer service",
    "get in touch",
    "support email",
  ],
};

export default function Contact() {
  return (
    <section className="flex items-center justify-center min-h-[70vh] p-2 sm:p-4 mb-16">
      <div className="w-full max-w-3xl bg-linear-to-br from-orange-50 via-white to-orange-100 rounded-2xl shadow-2xl p-2 sm:p-10">
        <h1 className="text-5xl font-extrabold mb-10 text-center text-orange-700 tracking-tight drop-shadow-lg flex items-center justify-center gap-3">
          <span className="inline-block bg-orange-700/10 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-orange-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 10.5a8.38 8.38 0 01-.9 3.8c-.6 1.2-1.5 2.3-2.6 3.1-1.1.8-2.4 1.3-3.8 1.3s-2.7-.5-3.8-1.3c-1.1-.8-2-1.9-2.6-3.1A8.38 8.38 0 013 10.5C3 6.4 6.4 3 10.5 3S18 6.4 18 10.5z"
              />
            </svg>
          </span>
          Contact Us
        </h1>
        <div className="grid gap-8 sm:grid-cols-2">
          <section className="bg-white rounded-xl shadow p-6 border border-orange-100 flex flex-col gap-3 justify-center hover:scale-[1.03] transition-transform">
            <h2 className="text-xl font-bold mb-2 text-orange-700 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12v1a4 4 0 01-8 0v-1m8 0a4 4 0 01-8 0m8 0V8a4 4 0 00-8 0v4"
                />
              </svg>
              Customer Support
            </h2>
            <p className="text-gray-700">
              For any questions or help, email us at{" "}
              <a
                href="mailto:support@ecommerce.com"
                className="text-orange-700 underline font-medium hover:text-orange-800 transition-colors"
              >
                support@ecommerce.com
              </a>
              .
            </p>
            <p className="text-gray-700">
              Or call us:{" "}
              <span className="font-semibold">+1 (800) 123-4567</span>
            </p>
          </section>
          <section className="bg-white rounded-xl shadow p-6 border border-orange-100 flex flex-col gap-3 justify-center hover:scale-[1.03] transition-transform">
            <h2 className="text-xl font-bold mb-2 text-orange-700 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
                />
              </svg>
              Our Address
            </h2>
            <p className="text-gray-700">
              123 Commerce Ave,
              <br />
              Suite 100,
              <br />
              New York, NY 10001
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
