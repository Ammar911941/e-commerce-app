"use client";
import { useCart } from "@/contexts/cartContext";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,
          items: cart,
          totalAmount: getTotalPrice(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderSuccess({ orderNumber: data.orderNumber });
        clearCart();
      } else {
        alert(data.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Success Screen
  if (orderSuccess) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-orange-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We&apos;ll process it shortly.
            </p>
            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-xl font-bold text-orange-600">
                {orderSuccess.orderNumber}
              </p>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              A confirmation has been sent to your email address.
            </p>
            <button
              onClick={() => router.push("/shop")}
              className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section>
        <div className="container flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Products Section */}
          <div className="products-section flex-1">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">
              Shopping Cart
            </h1>

            {/* Cart Items Container */}
            <div className="cart-items space-y-4">
              {cart.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-10 text-center border border-orange-50">
                  <div className="text-6xl mb-4">🛒</div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Add some products to get started!
                  </p>
                  <a
                    href="/shop"
                    className="inline-block px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Continue Shopping
                  </a>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 border border-orange-50 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                  >
                    <div className="item-image w-full sm:w-32 h-32 bg-linear-to-br from-orange-50 via-white to-orange-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="128px"
                        style={{ objectFit: "contain" }}
                        className="p-2"
                      />
                    </div>

                    <div className="item-details flex-1 w-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="quantity flex items-center gap-3">
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-500 hover:text-white transition-colors duration-200 flex items-center justify-center font-semibold"
                          >
                            -
                          </button>
                          <span className="font-semibold text-gray-900 min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-500 hover:text-white transition-colors duration-200 flex items-center justify-center font-semibold"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-xl font-semibold text-orange-600">
                          EGP {item.price * item.quantity}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg self-start sm:self-center"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )}

              {/* Total Price */}
              {cart.length > 0 && (
                <div className="total-section bg-linear-to-br from-orange-50 via-white to-orange-100 rounded-2xl shadow-md p-6 border border-orange-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">
                      Total:
                    </span>
                    <span className="text-3xl font-bold text-orange-600">
                      EGP {getTotalPrice()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checkout Form Section */}
          {cart.length > 0 && (
            <div className="checkout-section w-full lg:w-112.5 bg-white rounded-2xl shadow-lg border border-orange-50 p-6 h-fit sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Shipping Address
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                      placeholder="Cairo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                    placeholder="Egypt"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
