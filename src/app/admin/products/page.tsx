'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Plus, Search, Edit2, Trash2, Eye, Upload,
  Package, ToggleLeft, ToggleRight, X
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { Product, useStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

// ─── Helpers ──────────────────────────────────────────────────────────────────

type ProductFormData = {
  name: string;
  price: string | number;
  originalPrice: string | number;
  category: string;
  description: string;
  variants: { size: string; price: number }[];
  images: string[];
  isNew: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  customizable: boolean;
  customPhotoCount: number;
};

const EMPTY_PRODUCT: ProductFormData = {
  name: '', price: '', originalPrice: '', category: '', description: '',
  variants: [],
  images: [],
  isNew: false, isBestSeller: false, inStock: true,
  customizable: false, customPhotoCount: 0,
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function ImageUploader({
  images, onAdd, onRemove,
}: { images: string[]; onAdd: (src: string) => void; onRemove: (i: number) => void }) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onAdd(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = ''; // reset input so same file can be re-selected
  };

  return (
    <div className="flex flex-wrap gap-3">
      {images.map((img, i) => (
        <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden group border border-[#E5EBF4] shadow-sm">
          <Image src={img} alt="" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
            aria-label="Remove image"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#E5EBF4] flex flex-col items-center justify-center gap-1.5 text-[#8B9BAD] hover:bg-[#EEF4FF] hover:border-[#0A66FF] hover:text-[#0A66FF] cursor-pointer transition-all bg-slate-50/50 group">
        <div className="w-8 h-8 rounded-xl bg-[#F0F4F8] group-hover:bg-blue-100 flex items-center justify-center transition-colors">
          <Plus size={18} />
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest">Add Photo</span>
        <input type="file" className="hidden" onChange={handleFile} accept="image/*" />
      </label>
    </div>
  );
}

function VariantEditor({
  variants,
  onChange,
}: { variants: { size: string; price: number }[]; onChange: (v: { size: string; price: number }[]) => void }) {
  const add = () => onChange([...variants, { size: '', price: 0 }]);
  const remove = (i: number) => onChange(variants.filter((_, idx) => idx !== i));
  const update = (i: number, field: 'size' | 'price', val: string) => {
    const updated = variants.map((v, idx) =>
      idx === i ? { ...v, [field]: field === 'price' ? Number(val) : val } : v
    );
    onChange(updated);
  };

  return (
    <div className="p-5 bg-[#F8FAFD] rounded-[2rem] border border-[#E5EBF4]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-black text-[#0D1117] uppercase tracking-[0.1em]">Size Variants</h4>
        <button type="button" onClick={add} className="text-[10px] font-black text-[#0A66FF] uppercase tracking-widest hover:underline flex items-center gap-1">
          <Plus size={12} /> Add Variant
        </button>
      </div>
      <div className="space-y-3">
        {variants.map((v, i) => (
          <div key={i} className="flex gap-3 items-center">
            <input
              className="input-field py-2.5 text-sm flex-1 bg-white"
              placeholder="Size (e.g. 12×16 inches)"
              value={v.size}
              onChange={e => update(i, 'size', e.target.value)}
            />
            <input
              className="input-field py-2.5 text-sm w-28 bg-white"
              type="number"
              placeholder="Price ₹"
              value={v.price || ''}
              onChange={e => update(i, 'price', e.target.value)}
            />
            <button type="button" onClick={() => remove(i)} className="text-red-300 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
              <X size={16} />
            </button>
          </div>
        ))}
        {variants.length === 0 && (
          <p className="text-[10px] text-[#8B9BAD] text-center py-4 font-medium italic opacity-60">
            No variants added &mdash; the base price will be used for all orders.
          </p>
        )}
      </div>
    </div>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
        value ? 'border-[#0A66FF] bg-[#EEF4FF] text-[#0A66FF]' : 'border-[#E5EBF4] text-[#8B9BAD]'
      }`}
    >
      {value ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
      {label}
    </button>
  );
}

// ─── Product Form Modal ─────────────────────────────────────────────────────

interface ProductFormProps {
  title: string;
  product: ProductFormData;
  categories: { id: string; name: string }[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  onChange: (field: keyof ProductFormData, value: unknown) => void;
  submitLabel: string;
}

function ProductFormModal({ title, product, categories, onSubmit, onClose, onChange, submitLabel }: ProductFormProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box max-h-[90vh] max-w-lg flex flex-col p-0 overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0F4F8] shrink-0 bg-white z-10">
          <h3 className="font-black text-xl text-[#0D1117]">{title}</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Product Title *</label>
              <input className="input-field py-3.5" placeholder="e.g. Abstract Blue Canvas" value={product.name} onChange={e => onChange('name', e.target.value)} required />
            </div>

            {/* Price + Original Price + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Base Price (₹) *</label>
                <input className="input-field py-3.5" type="number" min="0" placeholder="2499" value={product.price} onChange={e => onChange('price', e.target.value)} required />
              </div>
              <div>
                <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Original Price (₹)</label>
                <input className="input-field py-3.5" type="number" min="0" placeholder="3499" value={product.originalPrice || ''} onChange={e => onChange('originalPrice', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Category *</label>
              <select className="input-field py-3.5" value={product.category} onChange={e => onChange('category', e.target.value)} required>
                <option value="">Select collection...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {/* Images */}
            <div>
              <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-3">Photography</label>
              <ImageUploader
                images={product.images}
                onAdd={src => onChange('images', [src, ...product.images].slice(0, 6))}
                onRemove={i => onChange('images', product.images.filter((_, idx) => idx !== i))}
              />
            </div>

            {/* Variants */}
            <VariantEditor
              variants={product.variants || []}
              onChange={v => onChange('variants', v)}
            />

            {/* Description */}
            <div>
              <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Description</label>
              <textarea className="input-field py-3.5 min-h-[100px] resize-none" placeholder="Detailed product story..." value={product.description} onChange={e => onChange('description', e.target.value)} />
            </div>

            {/* Flags */}
            <div>
              <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-3">Product Flags</label>
              <div className="flex flex-wrap gap-3">
                <ToggleField label="In Stock" value={product.inStock ?? true} onChange={v => onChange('inStock', v)} />
                <ToggleField label="New Arrival" value={product.isNew ?? false} onChange={v => onChange('isNew', v)} />
                <ToggleField label="Bestseller" value={product.isBestSeller ?? false} onChange={v => onChange('isBestSeller', v)} />
                <ToggleField label="Customizable" value={product.customizable ?? false} onChange={v => onChange('customizable', v)} />
              </div>
            </div>

            {product.customizable && (
              <div className="p-5 bg-blue-50/50 rounded-[2rem] border border-blue-100 animate-in fade-in slide-in-from-top-2">
                <label className="block text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Customization Settings</label>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Required Photos</p>
                    <p className="text-[10px] text-slate-500">Number of photos the client must upload</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-blue-100">
                    <button type="button" onClick={() => onChange('customPhotoCount', Math.max(1, (product.customPhotoCount || 1) - 1))} className="w-8 h-8 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold text-lg text-slate-600">-</button>
                    <span className="w-8 text-center font-black text-blue-600">{product.customPhotoCount || 1}</span>
                    <button type="button" onClick={() => onChange('customPhotoCount', (product.customPhotoCount || 1) + 1)} className="w-8 h-8 rounded-lg hover:bg-slate-50 flex items-center justify-center font-bold text-lg text-slate-600">+</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Footer */}
          <div className="p-6 border-t border-[#F0F4F8] flex gap-4 shrink-0 bg-white">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center py-3.5 h-auto">Discard</button>
            <button type="submit" className="btn-primary flex-1 justify-center py-3.5 h-auto shadow-lg shadow-indigo-100">{submitLabel}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct, categories, fetchCategories, isLoading } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (products.length === 0) fetchProducts();
      if (categories.length === 0) fetchCategories();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProducts, fetchCategories, products.length, categories.length]);

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProductData, setEditProductData] = useState<ProductFormData | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState<ProductFormData>(EMPTY_PRODUCT);

  const filtered = products.filter(p => {
    const matchCat = catFilter === 'all' || p.category === catFilter;
    const matchStock = stockFilter === 'all' || (stockFilter === 'in' ? p.inStock : !p.inStock);
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.includes(q) || p.tags?.some(t => t.includes(q));
    return matchCat && matchStock && matchSearch;
  });

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setIsProcessing(true);
    try {
      await deleteProduct(id);
      toast.success('Product removed from catalogue');
    } catch (err) {
      toast.error('Failed to delete product');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.category || !newProduct.price) {
      toast.error('Please fill all required fields');
      return;
    }
    setIsProcessing(true);
    try {
      const p: Product = {
        id: `p-${Date.now()}`,
        name: newProduct.name.trim(),
        price: Number(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
        discount: newProduct.originalPrice
          ? Math.round((1 - Number(newProduct.price) / Number(newProduct.originalPrice)) * 100)
          : undefined,
        category: newProduct.category,
        description: newProduct.description,
        variants: newProduct.variants.length > 0 ? newProduct.variants : undefined,
        images: newProduct.images.length > 0 ? newProduct.images : ['https://picsum.photos/seed/new/600/750'],
        rating: 5, reviews: 0,
        inStock: newProduct.inStock,
        isNew: newProduct.isNew,
        isBestSeller: newProduct.isBestSeller,
        customizable: newProduct.customizable,
        customPhotoCount: newProduct.customizable ? newProduct.customPhotoCount : undefined,
      };
      await addProduct(p);
      setShowAddModal(false);
      setNewProduct(EMPTY_PRODUCT);
      toast.success(`"${p.name}" listed successfully!`);
    } catch (err) {
      toast.error('Failed to add product');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProductData || !editingProductId) return;
    const existing = products.find(p => p.id === editingProductId);
    if (!existing) return;

    setIsProcessing(true);
    try {
      const updated: Product = {
        ...existing,
        name: editProductData.name,
        price: Number(editProductData.price),
        originalPrice: editProductData.originalPrice ? Number(editProductData.originalPrice) : undefined,
        category: editProductData.category,
        description: editProductData.description,
        images: editProductData.images,
        variants: editProductData.variants.length > 0 ? editProductData.variants : undefined,
        inStock: editProductData.inStock,
        isNew: editProductData.isNew,
        isBestSeller: editProductData.isBestSeller,
        customizable: editProductData.customizable,
        customPhotoCount: editProductData.customizable ? editProductData.customPhotoCount : undefined,
        discount: editProductData.originalPrice
          ? Math.round((1 - Number(editProductData.price) / Number(editProductData.originalPrice)) * 100)
          : undefined,
      };
      await updateProduct(updated);
      setEditProductData(null);
      setEditingProductId(null);
      toast.success('Product updated!');
    } catch (err) {
      toast.error('Failed to update product');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewChange = (field: keyof ProductFormData, value: unknown) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleEditChange = (field: keyof ProductFormData, value: unknown) => {
    setEditProductData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const startEdit = (p: Product) => {
    setEditingProductId(p.id);
    setEditProductData({
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice || '',
      category: p.category,
      description: p.description || '',
      variants: p.variants || [],
      images: p.images,
      isNew: p.isNew || false,
      isBestSeller: p.isBestSeller || false,
      inStock: p.inStock,
      customizable: p.customizable || false,
      customPhotoCount: p.customPhotoCount || 0,
    });
  };

  // ── Quick in-table stock toggle ────────────────────────────────────────────
  const toggleStock = (p: Product) => {
    updateProduct({ ...p, inStock: !p.inStock });
    toast.success(`"${p.name}" marked ${p.inStock ? 'Out of Stock' : 'In Stock'}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0D1117]">Inventory Manager</h2>
          <p className="text-sm text-[#8B9BAD]">
            {products.length} products · {products.filter(p => !p.inStock).length} out of stock
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary gap-2 h-12 px-6">
          <Plus size={18} /> List New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-[#E5EBF4] p-5 flex flex-wrap gap-4 shadow-sm">
        <div className="relative flex-1 min-w-[260px]">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
          <input
            className="input-field pl-11 py-3"
            placeholder="Search by name, category or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            className="input-field w-auto py-3 px-4 min-w-[160px]"
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
          >
            <option value="all">All Collections</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            className="input-field w-auto py-3 px-4"
            value={stockFilter}
            onChange={e => setStockFilter(e.target.value)}
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E5EBF4] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFD] border-b border-[#E5EBF4]">
                <th className="p-5 text-xs font-bold text-[#8B9BAD] uppercase tracking-widest">Product</th>
                <th className="p-5 text-xs font-bold text-[#8B9BAD] uppercase tracking-widest">Category</th>
                <th className="p-5 text-xs font-bold text-[#8B9BAD] uppercase tracking-widest">Price</th>
                <th className="p-5 text-xs font-bold text-[#8B9BAD] uppercase tracking-widest">Stock</th>
                <th className="p-5 text-xs font-bold text-[#8B9BAD] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-[#F8FAFD]/50 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#0D1117] truncate max-w-[200px]">{p.name}</p>
                        <div className="flex gap-1.5 mt-1 flex-wrap">
                          {p.isNew && <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase tracking-tighter">NEW</span>}
                          {p.isBestSeller && <span className="text-[9px] font-black bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100 uppercase tracking-tighter">BEST</span>}
                          {!p.inStock && <span className="text-[9px] font-black bg-red-50 text-red-500 px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-tighter">OOS</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-[#5A6472] text-[10px] font-bold uppercase tracking-wider">
                      {p.category.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td className="p-5">
                    <p className="font-black text-[#0D1117]">₹{p.price.toLocaleString()}</p>
                    {p.originalPrice && (
                      <p className="text-[10px] text-[#8B9BAD] line-through font-medium">
                        ₹{p.originalPrice.toLocaleString()}
                        {p.discount && <span className="ml-1 text-green-600 no-underline">({p.discount}% off)</span>}
                      </p>
                    )}
                  </td>
                  <td className="p-5">
                    <button
                      onClick={() => toggleStock(p)}
                      title={p.inStock ? 'Click to mark Out of Stock' : 'Click to mark In Stock'}
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-opacity hover:opacity-70 ${p.inStock ? 'text-green-500' : 'text-red-400'}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/product/${p.id}`}
                        target="_blank"
                        className="w-9 h-9 rounded-xl bg-white border border-[#E5EBF4] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all shadow-sm"
                        title="View on storefront"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => startEdit(p)}
                        className="w-9 h-9 rounded-xl bg-white border border-[#E5EBF4] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all shadow-sm"
                        title="Edit product"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="w-9 h-9 rounded-xl bg-white border border-[#E5EBF4] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-[#8B9BAD]">
                    <div className="flex flex-col items-center gap-3 opacity-60">
                      <Package size={48} strokeWidth={1} />
                      <p className="text-lg font-medium">No products found</p>
                      {search && (
                        <button
                          onClick={() => { setSearch(''); setCatFilter('all'); }}
                          className="text-[#0A66FF] text-sm font-bold hover:underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 bg-[#F8FAFD] border-t border-[#E5EBF4] text-xs text-[#8B9BAD]">
            Showing <span className="font-bold text-[#0D1117]">{filtered.length}</span> of {products.length} products
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <ProductFormModal
          title="New Listing"
          product={newProduct}
          categories={categories}
          onSubmit={handleAdd}
          onClose={() => { setShowAddModal(false); setNewProduct(EMPTY_PRODUCT); }}
          onChange={handleNewChange}
          submitLabel="Publish Product"
        />
      )}

      {/* Edit Modal */}
      {editProductData && (
        <ProductFormModal
          title="Update Product"
          product={editProductData}
          categories={categories}
          onSubmit={handleUpdate}
          onClose={() => { setEditProductData(null); setEditingProductId(null); }}
          onChange={handleEditChange}
          submitLabel="Save Changes"
        />
      )}
    </div>
  );
}
