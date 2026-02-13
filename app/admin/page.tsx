"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import UsersManager from "./_components/UsersManager";
import ProductsManager from "./_components/ProductsManager";
import FeaturedManager from "./_components/FeaturedManager";
import DealsManager from "./_components/DealsManager";
import CategoriesManager from "./_components/CategoriesManager";
import OrdersManager from "./_components/OrdersManager";
export default function Admin() {
  const [activeTab, setActiveTab] = useState("orders");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    checkAdmin();
  }, [user]);

  const checkAdmin = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    } finally {
      setLoading(false);
    }
  };


  if (loading || !user) {
    return (
      <div className=" flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          {!user && (
            <p className="text-gray-600 animate-pulse">
              Checking authentication...
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "orders", label: "Orders", icon: "🛒" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "categories", label: "Categories", icon: "📁" },
    { id: "featured", label: "Featured", icon: "⭐" },
    { id: "deals", label: "Deals", icon: "🎁" },
  ];

  return (
    <div className=" bg-linear-to-br from-orange-50 via-white to-orange-100">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your e-commerce store content and users
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold text-center transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-orange-600 text-orange-600 bg-orange-50"
                    : "border-transparent text-gray-600 hover:bg-orange-50/50 hover:text-orange-600"
                }`}
              >
                <span className="text-xl mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-linear-to-br from-white to-orange-50/30 rounded-2xl shadow-lg border border-orange-100 p-6">
          {activeTab === "orders" && <OrdersManager />}
          {activeTab === "users" && <UsersManager />}
          {activeTab === "categories" && <CategoriesManager />}
          {activeTab === "products" && <ProductsManager />}
          {activeTab === "featured" && <FeaturedManager />}
          {activeTab === "deals" && <DealsManager />}
        </div>
      </div>
    </div>
  );
}
