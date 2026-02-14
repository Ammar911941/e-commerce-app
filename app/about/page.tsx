import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Learn More About Elvaro",
  description:
    "Learn about our mission to deliver the best online shopping experience. Discover our commitment to quality products, exceptional customer service, and fast delivery.",
  keywords: [
    "about us",
    "company mission",
    "our story",
    "online shopping",
    "customer service",
    "quality products",
  ],
};

export default function About() {
  return (
    <section className="flex items-center justify-center min-h-[70vh] p-2 sm:p-4 mb-16 mt-25">
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
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </span>
          About Us
        </h1>
        <div className="grid gap-8 sm:grid-cols-2">
          <section className="bg-white rounded-xl shadow p-6 hover:scale-[1.03] transition-transform border border-orange-100">
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
                  d="M12 8v4l3 3"
                />
              </svg>
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To deliver the best online shopping experience by offering
              high-quality products, exceptional customer service, and fast
              delivery.
            </p>
          </section>
          <section className="bg-white rounded-xl shadow p-6 hover:scale-[1.03] transition-transform border border-orange-100">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Our Values
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Customer Satisfaction</li>
              <li>Quality Assurance</li>
              <li>Innovation</li>
              <li>Integrity</li>
            </ul>
          </section>
          <section className="bg-white rounded-xl shadow p-6 hover:scale-[1.03] transition-transform border border-orange-100 sm:col-span-2">
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
                  d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0-4H8m4 0h4"
                />
              </svg>
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2022, our e-commerce platform has grown from a small
              startup to a trusted destination for thousands of shoppers. We are
              passionate about connecting people with the products they love.
            </p>
          </section>
          <section className="bg-white rounded-xl shadow p-6 hover:scale-[1.03] transition-transform border border-orange-100 sm:col-span-2">
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
              Contact Us
            </h2>
            <p className="text-gray-700">
              Have questions or feedback? Reach out to us at{" "}
              <a
                href="mailto:support@ecommerce.com"
                className="text-orange-700 underline font-medium hover:text-orange-800 transition-colors"
              >
                support@ecommerce.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
