'use client';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <span className="badge badge-blue">{items.length} items</span>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <Heart size={40} className="text-red-400" />
          </div>
          <h2 className="text-xl font-bold mb-3">Your wishlist is empty</h2>
          <p className="text-[#5A6472] mb-6">Save your favourite artworks to find them later</p>
          <Link href="/shop" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="products-grid">{items.map(p => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </div>
  );
}
