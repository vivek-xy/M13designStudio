'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye, Star, Zap } from 'lucide-react';
import { useStore, Product } from '@/lib/store';
import toast from 'react-hot-toast';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isWishlisted = mounted && wishlist.includes(product.id);
  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      style: { borderRadius: '12px', background: '#0D1117', color: '#fff' },
      iconTheme: { primary: '#0A66FF', secondary: '#fff' },
    });
    setCartOpen(true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: isWishlisted ? '💔' : '❤️',
      style: { borderRadius: '12px' },
    });
  };

  return (
    <div className="product-card group flex flex-col h-full">
      {/* Image Area */}
      <div className="block relative aspect-square img-zoom bg-gray-50">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-12 flex flex-wrap gap-1.5 pointer-events-none">
          {product.isNew && <span className="badge badge-blue text-[10px] px-2 py-0.5">NEW</span>}
          {product.isBestSeller && <span className="badge badge-green text-[10px] px-2 py-0.5">BESTSELLER</span>}
          {discountPct && <span className="badge badge-red text-[10px] px-2 py-0.5">-{discountPct}%</span>}
          {product.customizable && <span className="badge bg-purple-50 text-purple-600 text-[10px] px-2 py-0.5">CUSTOM</span>}
        </div>

        {/* Wishlist btn */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all opacity-0 group-hover:opacity-100 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
          aria-label="Wishlist"
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Actions Overlay */}
        <div className="card-overlay">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-[#0A66FF] font-semibold text-sm hover:bg-[#EEF4FF] transition-all"
          >
            <ShoppingCart size={15} /> Add to Cart
          </button>
          <Link
            href={`/product/${product.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/20 text-white font-semibold text-sm hover:bg-white/30 transition-all"
          >
            <Eye size={15} /> Quick View
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/shop?category=${product.category}`} className="text-[11px] text-[#0A66FF] font-semibold uppercase tracking-wider mb-1 block">
          {product.category.replace('-', ' ')}
        </Link>
        <Link href={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-bold text-[#0D1117] text-sm leading-snug hover:text-[#0A66FF] transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'} stroke={i < Math.floor(product.rating) ? '#F59E0B' : '#D1D5DB'} />
          ))}
          <span className="text-xs text-[#8B9BAD] ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0D1117]">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#8B9BAD] line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 rounded-lg bg-[#0A66FF] text-white flex items-center justify-center hover:bg-[#0050CC] transition-all hover:scale-110 active:scale-95"
            aria-label="Add to cart"
          >
            <Zap size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
