import Link from "@/components/link";
export default function NotFound() {
  return (
    <section className="min-h-100 flex flex-col justify-center items-center bg-linear-to-br from-orange-50 via-white to-orange-100 h-[calc(100vh-250px)]">
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-10 flex flex-col items-center">
        <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold shadow hover:bg-orange-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </section>
  );
}
