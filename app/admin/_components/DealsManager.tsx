"use client";
import { useState, useEffect } from "react";
import { Deals, Category } from "@prisma/client";

export default function DealsManager() {
  const [deals, setDeals] = useState<Deals[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    offer: "",
    details: "",
    image: "",
    link: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDeals();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetch("/api/admin/deals");
      if (response.ok) {
        const data = await response.json();
        setDeals(data);
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<{
    url: string | null;
    error?: string;
  }> => {
    if (!selectedFile) return { url: formData.image || null };

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (response.ok) {
        return { url: data.url };
      }
      return { url: null, error: data.error || "Upload failed" };
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Network error";
      return { url: null, error: errorMessage };
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image first if a new file is selected
    let imageUrl = formData.image;
    if (selectedFile) {
      const result = await uploadImage();
      if (!result.url) {
        alert(`Failed to upload image: ${result.error || "Please try again."}`);
        return;
      }
      imageUrl = result.url;
    }
    try {
      if (editingId) {
        // Update existing deal
        const response = await fetch("/api/admin/deals", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...formData, image: imageUrl }),
        });

        if (response.ok) {
          setShowForm(false);
          setEditingId(null);
          setFormData({ offer: "", details: "", image: "", link: "" });
          setSelectedFile(null);
          setImagePreview("");
          fetchDeals();
        }
      } else {
        // Create new deal
        const response = await fetch("/api/admin/deals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, image: imageUrl }),
        });

        if (response.ok) {
          setShowForm(false);
          setFormData({ offer: "", details: "", image: "", link: "" });
          setSelectedFile(null);
          setImagePreview("");
          fetchDeals();
        }
      }
    } catch (error) {
      console.error("Error saving deal:", error);
    }
  };

  const handleEdit = (deal: Deals) => {
    setEditingId(deal.id);
    setFormData({
      offer: deal.offer,
      details: deal.details,
      image: deal.image,
      link: deal.link,
    });
    setImagePreview(deal.image);
    setSelectedFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this deal?")) return;

    try {
      const response = await fetch(`/api/admin/deals?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchDeals();
      }
    } catch (error) {
      console.error("Error deleting deal:", error);
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
        <h2 className="text-2xl font-bold text-gray-900">Deals & Offers</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2.5 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
        >
          {showForm ? "Cancel" : "Add Deal"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {editingId ? "Edit Deal" : "Add New Deal"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.offer}
                  onChange={(e) =>
                    setFormData({ ...formData, offer: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., 50% OFF"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link
                </label>
                <input
                  type="text"
                  required
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="/shop or /shop/category-name"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Links (Category-based)
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, link: "/shop" })}
                    className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
                  >
                    /shop
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          link: `/shop/${cat.name}`,
                        })
                      }
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      /shop/{cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-orange-200"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Details
              </label>
              <textarea
                required
                rows={3}
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Describe the deal details..."
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full px-6 py-2.5 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading
                ? "Uploading..."
                : editingId
                  ? "Update Deal"
                  : "Create Deal"}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="aspect-video bg-linear-to-br from-orange-50 to-orange-100 relative">
              <img
                src={deal.image}
                alt={deal.offer}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold text-xl rounded-lg px-3 py-2 mb-2 text-center">
                {deal.offer}
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {deal.details}
              </p>
              <p className="text-sm text-orange-600 mb-3 truncate">
                Link: {deal.link}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(deal)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(deal.id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deals.length === 0 && (
        <div className="text-center py-12 text-gray-500">No deals found</div>
      )}
    </div>
  );
}
