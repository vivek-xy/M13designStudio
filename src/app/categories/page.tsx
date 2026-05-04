'use client';
import { CATEGORIES } from '@/lib/data';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function CategoriesPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFD] py-16 text-center">
        <span className="badge badge-blue mb-3">Collections</span>
        <h1 className="text-4xl font-black text-[#0D1117] mb-3">All Categories</h1>
        <p className="text-[#5A6472]">Explore our complete collection of handcrafted artworks</p>
      </div>
      <div className="container py-16 space-y-20">
        {CATEGORIES.map(cat => {
          const catProducts = PRODUCTS.filter(p => p.category === cat.id).slice(0, 4);
          return (
            <section key={cat.id}>
              <div className="flex items-end justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: cat.color }}>{cat.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0D1117]">{cat.name}</h2>
                    <p className="text-[#5A6472] text-sm">{cat.description} · {cat.count} products</p>
                  </div>
                </div>
                <Link href={`/shop?category=${cat.id}`} className="btn-ghost text-sm hidden md:flex">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {catProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              <Link href={`/shop?category=${cat.id}`} className="btn-secondary mt-5 inline-flex md:hidden">View All {cat.name}</Link>
            </section>
          );
        })}
      </div>
    </div>
  );
}
