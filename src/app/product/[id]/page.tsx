'use client';
import { useEffect, useRef, useState, use } from 'react';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { PRODUCTS } from '@/lib/data';
import { useStore } from '@/lib/store';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params);
  const { products, fetchProducts, isLoading } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (products.length === 0) fetchProducts();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProducts, products.length]);

  if (!mounted || (isLoading && products.length === 0)) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0A66FF] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#8B9BAD] font-bold text-sm uppercase tracking-widest">Loading Artwork...</p>
      </div>
    </div>
  );

  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
    return null; // TypeScript narrowing
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
