'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, Search, Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function ShopPage() {
  const { products, fetchProducts, categories, fetchCategories, isLoading, error } = useStore();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (products.length === 0) fetchProducts();
      if (categories.length === 0) fetchCategories();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProducts, fetchCategories, products.length, categories.length]);

  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [catFilter, setCatFilter] = useState(searchParams.get('category') || 'all');
  const [search, setSearch] = useState('');

  if (!mounted) return null;

  // Filtering
  const filtered = products.filter(p => {
    const matchesCat = catFilter === 'all' || p.category === catFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'best') return b.reviews - a.reviews;
    return 0; // default newest (by ID or index in real app)
  });

  return (
    <div className="bg-[#F8FAFD] min-h-screen">
      <div className="bg-white border-b border-[#E5EBF4] sticky top-0 z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <h1 className="text-2xl font-black text-[#0D1117] shrink-0">Collection</h1>
              <div className="h-6 w-px bg-[#E5EBF4] hidden md:block" />
              <div className="relative flex-1 md:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
                <input 
                  type="text" 
                  placeholder="Search pieces..." 
                  className="w-full bg-[#F1F5F9] border-none rounded-2xl py-3 pl-12 text-sm focus:ring-2 focus:ring-[#0A66FF] outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative group flex-1 md:flex-none">
                <select 
                  className="appearance-none bg-white border border-[#E5EBF4] rounded-2xl px-5 py-3 pr-10 text-sm font-bold text-[#5A6472] outline-none focus:ring-2 focus:ring-[#0A66FF] cursor-pointer w-full"
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B9BAD] pointer-events-none" />
              </div>

              <div className="relative group flex-1 md:flex-none">
                <select 
                  className="appearance-none bg-white border border-[#E5EBF4] rounded-2xl px-5 py-3 pr-10 text-sm font-bold text-[#5A6472] outline-none focus:ring-2 focus:ring-[#0A66FF] cursor-pointer w-full"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="best">Bestsellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <SlidersHorizontal size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B9BAD] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8 hidden md:block">
            <div>
              <h3 className="text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-6">Collections</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setCatFilter('all')}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${catFilter === 'all' ? 'bg-[#0A66FF] text-white shadow-lg shadow-indigo-100' : 'text-[#5A6472] hover:bg-white'}`}
                >
                  Everything
                </button>
                {categories.map(c => (
                  <button 
                    key={c.id}
                    onClick={() => setCatFilter(c.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${catFilter === c.id ? 'bg-[#0A66FF] text-white shadow-lg shadow-indigo-100' : 'text-[#5A6472] hover:bg-white'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#0D1117] to-[#1A1F26] rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A66FF]/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <h4 className="text-lg font-black mb-3 leading-tight">Need a Custom Size?</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Contact our curators for bespoke framing and museum-grade requests.</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">Contact Us</button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-bold text-[#5A6472]">
                {isLoading ? 'Loading collection...' : (
                  <>Showing <span className="text-[#0D1117]">{sorted.length}</span> results</>
                )}
              </p>
            </div>

            {error ? (
              <div className="py-24 text-center bg-white rounded-[3rem] border border-red-100">
                <p className="text-red-500 font-bold mb-4">Failed to load collection</p>
                <button onClick={() => fetchProducts()} className="btn-primary">Try Again</button>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl h-[450px] animate-pulse border border-[#E5EBF4]" />
                ))}
              </div>
            ) : sorted.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sorted.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-[3rem] border border-[#E5EBF4]">
                <div className="w-20 h-20 bg-[#F8FAFD] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package size={32} className="text-[#8B9BAD]" />
                </div>
                <h3 className="text-xl font-black text-[#0D1117] mb-2">No items found</h3>
                <p className="text-[#8B9BAD] max-w-xs mx-auto">Try adjusting your filters or search keywords to find what you're looking for.</p>
                <button onClick={() => {setCatFilter('all'); setSearch('');}} className="mt-8 text-[#0A66FF] font-black uppercase tracking-widest text-xs hover:underline">Reset Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
