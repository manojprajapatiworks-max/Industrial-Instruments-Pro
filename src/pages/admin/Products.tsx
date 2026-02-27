import React, { useEffect, useState } from "react";
import { Product, Category } from "../../types";
import { Edit2, Trash2, Plus } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchData = () => {
    fetch("/api/products").then(res => res.json()).then(setProducts);
    fetch("/api/categories").then(res => res.json()).then(setCategories);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (isEditing) {
      await fetch(`/api/products/${isEditing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }

    setIsEditing(null);
    setIsAdding(false);
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Products & Services</h1>
        <button 
          onClick={() => { setIsAdding(true); setIsEditing(null); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select name="type" defaultValue={isEditing?.type || 'product'} className="w-full px-3 py-2 border border-slate-300 rounded-md">
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select name="category_id" defaultValue={isEditing?.category_id} className="w-full px-3 py-2 border border-slate-300 rounded-md">
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input required type="text" name="title" defaultValue={isEditing?.title} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                <input type="text" name="price" defaultValue={isEditing?.price} className="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="e.g. $500 or 'Contact for quote'" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Delivery/Service Time</label>
                <input type="text" name="delivery_time" defaultValue={isEditing?.delivery_time} className="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="e.g. 2-3 business days" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                <input type="url" name="image_url" defaultValue={isEditing?.image_url} className="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea name="description" defaultValue={isEditing?.description} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Specifications</label>
              <textarea name="specifications" defaultValue={isEditing?.specifications} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Key specs separated by commas or newlines"></textarea>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">Save</button>
              <button type="button" onClick={() => { setIsAdding(false); setIsEditing(null); }} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md text-sm font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.image_url && (
                      <img className="h-10 w-10 rounded-md object-cover mr-3" src={product.image_url} alt="" referrerPolicy="no-referrer" />
                    )}
                    <div className="text-sm font-medium text-slate-900">{product.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.category_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize">{product.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => setIsEditing(product)} className="text-blue-600 hover:text-blue-900 mr-3"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
