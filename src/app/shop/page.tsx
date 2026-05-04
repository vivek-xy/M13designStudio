'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid, List, ChevronDown, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { Suspense } from 'react';

const PRICE_RANGES = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 – ₹3,500', min: 2000, max: 3500 },
  { label: '₹3,500 – ₹5,000', min: 3500, max: 5000 },
  { label: 'Above ₹5,000', min: 5000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'bestseller', label: 'Bestsellers' },
];

function ShopContent() {
  const params = useSearchParams();
  const initCat = params.get('category') || '';
  const initSort = params.get('sort') || 'featured';

  const [selectedCats, setSelectedCats] = useState<string[]>(initCat ? [initCat] : []);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [sort, setSort] = useState(initSort);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (selectedCats.length > 0) list = list.filter(p => selectedCats.includes(p.category));
    if (selectedPrice !== null) {
      const range = PRICE_RANGES[selectedPrice];
      list = list.filter(p => p.price >= range.min && p.price < range.max);
    }
    switch (sort) {
      case 'newest': return list.filter(p => p.isNew).concat(list.filter(p => !p.isNew));
      case 'price-asc': return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'rating': return list.sort((a, b) => b.rating - a.rating);
      case 'bestseller': return list.filter(p => p.isBestSeller).concat(list.filter(p => !p.isBestSeller));
      default: return list;
    }
  }, [selectedCats, selectedPrice, sort]);

  const toggleCat = (id: string) =>
    setSelectedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const clearFilters = () => { setSelectedCats([]); setSelectedPrice(null); };

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0D1117]">Shop All Products</h1>
          <p className="text-[#5A6472] mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setFiltersOpen(!filtersOpen)}
            className="btn-ghost lg:hidden flex items-center gap-2">
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="relative">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="input-field pr-10 py-2.5 appearance-none cursor-pointer text-sm w-48">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6472] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active filters */}
      {(selectedCats.length > 0 || selectedPrice !== null) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-[#5A6472]">Active:</span>
          {selectedCats.map(c => (
            <button key={c} onClick={() => toggleCat(c)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF4FF] text-[#0A66FF] text-sm font-medium">
              {CATEGORIES.find(cat => cat.id === c)?.name} <X size={12} />
            </button>
          ))}
          {selectedPrice !== null && (
            <button onClick={() => setSelectedPrice(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF4FF] text-[#0A66FF] text-sm font-medium">
              {PRICE_RANGES[selectedPrice].label} <X size={12} />
            </button>
          )}
          <button onClick={clearFilters} className="text-sm text-red-500 font-medium hover:underline">Clear all</button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-64 shrink-0 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-5 sticky top-24">
            <h3 className="font-bold text-[#0D1117] mb-5">Filters</h3>

            <div className="mb-6">
              <h4 className="font-semibold text-sm text-[#0D1117] mb-3">Category</h4>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map(cat => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="custom-checkbox" checked={selectedCats.includes(cat.id)} onChange={() => toggleCat(cat.id)} />
                    <span className="text-sm text-[#5A6472] group-hover:text-[#0D1117] transition-colors">{cat.name}</span>
                    <span className="ml-auto text-xs text-[#8B9BAD]">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E5EBF4] pt-5 mb-6">
              <h4 className="font-semibold text-sm text-[#0D1117] mb-3">Price Range</h4>
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map((range, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" className="custom-checkbox rounded-full" checked={selectedPrice === i} onChange={() => setSelectedPrice(i)} />
                    <span className="text-sm text-[#5A6472] group-hover:text-[#0D1117] transition-colors">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E5EBF4] pt-5">
              <h4 className="font-semibold text-sm text-[#0D1117] mb-3">Availability</h4>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="custom-checkbox" defaultChecked />
                <span className="text-sm text-[#5A6472]">In Stock Only</span>
              </label>
            </div>

            {(selectedCats.length > 0 || selectedPrice !== null) && (
              <button onClick={clearFilters} className="w-full mt-5 py-2.5 rounded-xl text-sm text-red-500 border border-red-200 hover:bg-red-50 transition-all font-medium">
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="font-bold text-xl mb-2">No products found</h3>
              <p className="text-[#5A6472]">Try adjusting your filters</p>
              <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container py-10 text-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
