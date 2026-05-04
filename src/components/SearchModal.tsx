'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import Link from 'next/link';

interface Props { isOpen: boolean; onClose: () => void; }

const TRENDING = ['Ganesha Art', 'Custom Portrait', 'Wall Art', 'Photo Frame', 'Religious Painting'];

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = query.length > 1
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.includes(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 100); setQuery(''); }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E5EBF4]">
            <Search size={20} className="text-[#0A66FF] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for art, frames, decor..."
              className="flex-1 outline-none text-lg placeholder:text-[#8B9BAD]"
            />
            {query && <button onClick={() => setQuery('')} className="w-7 h-7 rounded-lg bg-[#F8FAFD] flex items-center justify-center"><X size={14} /></button>}
            <button onClick={onClose} className="text-sm text-[#5A6472] hover:text-[#0D1117] transition-colors ml-2">ESC</button>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {results.length > 0 ? (
              <div>
                <p className="text-xs font-semibold text-[#8B9BAD] uppercase tracking-wider mb-3">Results</p>
                <div className="flex flex-col gap-1">
                  {results.map(p => (
                    <Link key={p.id} href={`/product/${p.id}`} onClick={onClose}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EEF4FF] transition-all group">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm group-hover:text-[#0A66FF] transition-colors">{p.name}</p>
                        <p className="text-xs text-[#5A6472] capitalize">{p.category.replace('-', ' ')}</p>
                      </div>
                      <span className="font-bold text-[#0A66FF] text-sm shrink-0">₹{p.price.toLocaleString()}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : query.length > 1 ? (
              <div className="text-center py-8 text-[#5A6472]">No results found for "{query}"</div>
            ) : (
              <div>
                <p className="text-xs font-semibold text-[#8B9BAD] uppercase tracking-wider mb-3 flex items-center gap-1">
                  <TrendingUp size={12} /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map(t => (
                    <button key={t} onClick={() => setQuery(t)}
                      className="px-4 py-2 rounded-full bg-[#EEF4FF] text-[#0A66FF] text-sm font-medium hover:bg-[#0A66FF] hover:text-white transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
