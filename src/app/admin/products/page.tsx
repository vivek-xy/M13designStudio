'use client';
import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Filter, MoreVertical, Upload } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { Product } from '@/lib/store';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '' });

  const filtered = products.filter(p =>
    (catFilter === 'all' || p.category === catFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Product = {
      id: `new-${Date.now()}`, name: newProduct.name, price: Number(newProduct.price),
      category: newProduct.category, description: newProduct.description,
      images: ['https://picsum.photos/seed/new/600/750'], rating: 5, reviews: 0, inStock: true, isNew: true,
    };
    setProducts(prev => [p, ...prev]);
    setShowAddModal(false);
    setNewProduct({ name: '', price: '', category: '', description: '' });
    toast.success('Product added successfully!');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Products <span className="text-[#5A6472] font-normal text-base">({filtered.length})</span></h2>
          <p className="text-sm text-[#5A6472]">Manage your product catalogue</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E5EBF4] p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
          <input className="input-field pl-9 py-2.5 text-sm" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field w-auto py-2.5 text-sm" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="input-field w-auto py-2.5 text-sm">
          <option>All Status</option><option>In Stock</option><option>Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">{p.name}</p>
                        <div className="flex gap-1 mt-0.5">
                          {p.isNew && <span className="badge badge-blue text-[10px]">NEW</span>}
                          {p.isBestSeller && <span className="badge badge-green text-[10px]">BEST</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-blue capitalize text-xs">{p.category.replace('-', ' ')}</span></td>
                  <td>
                    <p className="font-bold text-sm">₹{p.price.toLocaleString()}</p>
                    {p.originalPrice && <p className="text-xs text-[#8B9BAD] line-through">₹{p.originalPrice.toLocaleString()}</p>}
                  </td>
                  <td><span className={`badge text-xs ${p.inStock ? 'badge-green' : 'badge-red'}`}>{p.inStock ? 'In Stock' : 'Out'}</span></td>
                  <td><span className="text-sm font-medium">⭐ {p.rating} ({p.reviews})</span></td>
                  <td><span className="badge badge-green text-xs">Active</span></td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Link href={`/product/${p.id}`} className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all">
                        <Eye size={14} />
                      </Link>
                      <button onClick={() => setEditProduct(p)} className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Add New Product</h3>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center">×</button>
            </div>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <div><label className="block text-sm font-medium mb-1.5">Product Name *</label><input className="input-field" placeholder="e.g. Abstract Blue Canvas" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1.5">Price (₹) *</label><input className="input-field" type="number" placeholder="2499" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} required /></div>
                <div><label className="block text-sm font-medium mb-1.5">Category *</label>
                  <select className="input-field" value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} required>
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="block text-sm font-medium mb-1.5">Description</label><textarea className="input-field" rows={3} placeholder="Product description..." value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} /></div>
              <div className="border-2 border-dashed border-[#E5EBF4] rounded-xl p-6 text-center cursor-pointer hover:border-[#0A66FF] hover:bg-[#EEF4FF] transition-all">
                <Upload size={24} className="mx-auto text-[#8B9BAD] mb-2" />
                <p className="text-sm text-[#5A6472]">Click to upload images</p>
                <p className="text-xs text-[#8B9BAD] mt-1">PNG, JPG up to 10MB</p>
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
