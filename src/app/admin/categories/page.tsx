'use client';
import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit2, LayoutGrid, Search, Upload, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { Category, useStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

const EMPTY_FORM = { id: '', name: '', image: '', description: '', color: '#EEF4FF' };

export default function AdminCategoriesPage() {
  const { categories, fetchCategories, addCategory, updateCategory, deleteCategory, isLoading, fetchProducts, products } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (categories.length === 0) fetchCategories();
      if (products.length === 0) fetchProducts();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchCategories, fetchProducts, categories.length, products.length]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Sync form when editing changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (editingCategory) {
        setFormData({
          id: editingCategory.id,
          name: editingCategory.name,
          image: editingCategory.image || '',
          description: editingCategory.description || '',
          color: editingCategory.color || '#EEF4FF',
        });
        setShowModal(true);
      } else {
        setFormData(EMPTY_FORM);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [editingCategory]);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    // ── Fix: use functional updater to avoid stale closure
    reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
    e.target.value = ''; // allow re-selecting same file
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast.error('Category name is required'); return; }

    setIsProcessing(true);
    try {
      if (editingCategory) {
        await updateCategory({
          ...editingCategory,
          name: formData.name.trim(),
          image: formData.image,
          description: formData.description,
          color: formData.color,
        });
        toast.success('Collection updated!');
      } else {
        const id = formData.id.trim() || formData.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (categories.some(c => c.id === id)) {
          toast.error('A category with this ID already exists');
          return;
        }
        await addCategory({
          id,
          name: formData.name.trim(),
          image: formData.image,
          count: 0,
          description: formData.description,
          color: formData.color,
        });
        toast.success('New collection published!');
      }
      handleClose();
    } catch (err) {
      toast.error('Failed to save collection');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData(EMPTY_FORM);
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Delete the "${cat.name}" collection?\n\nProducts in this collection will become uncategorized.`)) return;
    setIsProcessing(true);
    try {
      await deleteCategory(cat.id);
      toast.success(`"${cat.name}" removed`);
    } catch (err) {
      toast.error('Failed to delete collection');
    } finally {
      setIsProcessing(false);
    }
  };

  const openAdd = () => {
    setEditingCategory(null);
    setFormData(EMPTY_FORM);
    setShowModal(true);
  };

  // Count products per category using store  
  const productCountMap = categories.reduce((acc, cat) => {
    acc[cat.id] = products.filter(p => p.category === cat.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0D1117]">Collections Manager</h2>
          <p className="text-sm text-[#8B9BAD]">{categories.length} collections · {products.length} total products</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2 h-12 px-6">
          <Plus size={18} /> New Collection
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl border border-[#E5EBF4] p-4 shadow-sm">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
          <input
            className="input-field pl-10 py-3 text-sm"
            placeholder="Search collections..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(cat => (
            <div
              key={cat.id}
              className="group relative bg-white rounded-[2.5rem] border border-[#E5EBF4] shadow-sm hover:shadow-xl transition-all overflow-hidden aspect-[4/3]"
            >
              {/* Background */}
              {cat.image ? (
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ backgroundColor: cat.color }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-[#0D1117]/25 to-transparent" />

              {/* Actions — only show on hover */}
              <div className="absolute top-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <button
                  onClick={() => setEditingCategory(cat)}
                  className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-[#0A66FF] transition-all shadow-sm"
                  title="Edit collection"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(cat)}
                  className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  title="Delete collection"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Info */}
              <div className="relative h-full p-8 flex flex-col justify-end z-10">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1 leading-tight">{cat.name}</h3>
                  {cat.description && (
                    <p className="text-xs text-white/60 mb-2 leading-relaxed line-clamp-2">{cat.description}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-white/70 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <LayoutGrid size={11} className="text-[#0A66FF]" />
                      {productCountMap[cat.id] ?? cat.count} Pieces
                    </p>
                    <span className="text-white/30">·</span>
                    <p className="text-[10px] text-white/50 font-mono">{cat.id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-white rounded-3xl border border-[#E5EBF4]">
          <div className="w-16 h-16 rounded-full bg-[#F8FAFD] flex items-center justify-center mx-auto mb-4">
            <LayoutGrid size={28} className="text-[#8B9BAD]" />
          </div>
          <p className="text-[#5A6472] font-medium">No collections match your search.</p>
          {search && (
            <button onClick={() => setSearch('')} className="mt-3 text-[#0A66FF] text-sm font-bold hover:underline">
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-box max-h-[90vh] max-w-lg flex flex-col p-0 overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#F0F4F8] shrink-0 bg-white z-10">
              <h3 className="font-black text-xl text-[#0D1117]">
                {editingCategory ? 'Update Collection' : 'Create Collection'}
              </h3>
              <button onClick={handleClose} className="w-9 h-9 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Hero Background Upload */}
                <div>
                  <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-widest mb-3">Hero Background</label>
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border-2 border-dashed border-[#E5EBF4] group shadow-sm">
                    {formData.image ? (
                      <>
                        <Image src={formData.image} alt="" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-500/90 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove image"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8B9BAD] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all cursor-pointer">
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs font-bold uppercase tracking-widest">Upload Banner</span>
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-6">
                  <div>
                    <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Collection Name *</label>
                    <input
                      className="input-field py-3.5"
                      placeholder="e.g. Wall Art"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Internal Slug/ID *</label>
                    <input
                      className="input-field py-3.5 font-mono text-sm"
                      placeholder="e.g. wall-art"
                      value={formData.id}
                      onChange={e => setFormData(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                      required
                      disabled={!!editingCategory}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Description</label>
                  <textarea
                    className="input-field py-3.5 min-h-[100px] resize-none"
                    placeholder="Short summary of this collection..."
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Brand Color</label>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#E5EBF4] bg-[#F8FAFD]">
                    <input
                      type="color"
                      className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0 bg-transparent"
                      value={formData.color}
                      onChange={e => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#0D1117] uppercase">{formData.color}</p>
                      <p className="text-[10px] text-[#8B9BAD] font-bold uppercase tracking-widest">Theme Accent</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="p-6 border-t border-[#F0F4F8] flex gap-4 shrink-0 bg-white">
                <button type="button" onClick={handleClose} className="btn-ghost flex-1 justify-center py-3.5 h-auto">Discard</button>
                <button type="submit" className="btn-primary flex-1 justify-center py-3.5 h-auto shadow-lg shadow-indigo-100">
                  {editingCategory ? 'Update Collection' : 'Create Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
