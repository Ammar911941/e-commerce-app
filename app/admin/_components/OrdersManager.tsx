"use client";
import { useState, useEffect } from "react";

interface OrderItem {
  id: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const statuses = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const filterTabs = [
    { id: "ALL", label: "All", icon: "📋" },
    { id: "PENDING", label: "Pending", icon: "⏳" },
    { id: "CONFIRMED", label: "Confirmed", icon: "✅" },
    { id: "PROCESSING", label: "Processing", icon: "⚙️" },
    { id: "SHIPPED", label: "Shipped", icon: "🚚" },
    { id: "DELIVERED", label: "Delivered", icon: "📦" },
    { id: "CANCELLED", label: "Cancelled", icon: "❌" },
  ];

  // Filter orders based on active filter
  const filteredOrders =
    activeFilter === "ALL"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  // Count orders by status
  const getStatusCount = (status: string) => {
    if (status === "ALL") return orders.length;
    return orders.filter((order) => order.status === status).length;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const deleteOrder = async (orderId: string, orderNumber: string) => {
    if (
      !confirm(
        `Are you sure you want to delete order ${orderNumber}? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setDeletingOrder(orderId);
    try {
      const response = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        // Remove from local state
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        // Close detail view if this order was selected
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(null);
        }
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    } finally {
      setDeletingOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "PROCESSING":
        return "bg-purple-100 text-purple-800";
      case "SHIPPED":
        return "bg-indigo-100 text-indigo-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <div className="text-sm text-gray-600">
          Total Orders: {orders.length}
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-xl shadow-md border border-orange-100 p-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeFilter === tab.id
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {getStatusCount(tab.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {activeFilter === "ALL"
            ? "No orders found"
            : `No ${activeFilter.toLowerCase()} orders`}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-lg text-gray-900">
                      {order.orderNumber}
                    </h3>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      disabled={updatingStatus === order.id}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${getStatusColor(order.status)} ${updatingStatus === order.id ? "opacity-50" : ""}`}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {order.status === "CANCELLED" && (
                      <button
                        onClick={() => deleteOrder(order.id, order.orderNumber)}
                        disabled={deletingOrder === order.id}
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-1 ${deletingOrder === order.id ? "opacity-50 cursor-not-allowed" : ""}`}
                        title="Delete cancelled order"
                      >
                        {deletingOrder === order.id ? (
                          <>
                            <svg
                              className="animate-spin h-3 w-3"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-3 h-3"
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
                            Delete
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">
                    EGP {order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.items.length} item(s)
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span>👤</span> Customer
                  </h4>
                  <p className="text-gray-700">{order.customerName}</p>
                  <p className="text-gray-600 text-sm">{order.customerEmail}</p>
                  <p className="text-gray-600 text-sm">{order.customerPhone}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span>📍</span> Shipping Address
                  </h4>
                  <p className="text-gray-700">{order.address}</p>
                  <p className="text-gray-600 text-sm">
                    {order.city}, {order.zipCode}
                  </p>
                  <p className="text-gray-600 text-sm">{order.country}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(
                    selectedOrder?.id === order.id ? null : order,
                  )
                }
                className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1"
              >
                {selectedOrder?.id === order.id ? "Hide" : "View"} Items
                <svg
                  className={`w-4 h-4 transition-transform ${selectedOrder?.id === order.id ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {selectedOrder?.id === order.id && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📦</span> Order Items
                  </h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-3"
                      >
                        <img
                          src={item.productImage}
                          alt={item.productTitle}
                          className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.productTitle}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × EGP {item.price}
                          </p>
                        </div>
                        <p className="font-semibold text-orange-600">
                          EGP {item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
