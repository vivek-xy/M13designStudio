'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useStore, Product } from '@/lib/store';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isWishlisted = mounted && wishlist.includes(product.id);
  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added!`, {
      style: { borderRadius: '12px', background: '#0F172A', color: '#fff' },
    });
    setCartOpen(true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-white rounded-3xl border border-slate-100 overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1 md:gap-2 pointer-events-none">
          {product.isNew && (
            <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-blue-600 text-white text-[8px] md:text-[10px] font-bold tracking-widest shadow-lg">
              NEW
            </span>
          )}
          {discountPct && (
            <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-rose-500 text-white text-[8px] md:text-[10px] font-bold tracking-widest shadow-lg">
              -{discountPct}%
            </span>
          )}
        </div>

        {/* Wishlist Toggle */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 z-20 shadow-lg ${
            isWishlisted ? 'bg-rose-500 text-white' : 'glass text-slate-600 hover:text-rose-500'
          }`}
        >
          <Heart size={14} className="md:w-[18px] md:h-[18px]" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Actions (Desktop Only) */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 translate-y-full group-hover:translate-y-0 z-20 hidden md:block`}>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 glass py-3 rounded-2xl text-slate-900 font-bold text-sm hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <Link
              href={`/product/${product.id}`}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-900 hover:bg-white transition-all shadow-xl"
            >
              <Eye size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3 md:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <Link href={`/shop?category=${product.category}`} className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#0A66FF] truncate">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <div className="flex items-center gap-1">
            <Star size={8} className="md:w-[10px] md:h-[10px]" fill="#F59E0B" stroke="#F59E0B" />
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`} className="block group/title mb-2 md:mb-3 flex-1">
          <h3 className="font-bold text-slate-900 text-xs md:text-base leading-tight group-hover/title:text-[#0A66FF] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-sm md:text-lg font-black text-slate-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[9px] md:text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-[#0A66FF] transition-all group/btn"
          >
            <ArrowRight size={14} className="md:w-[18px] md:h-[18px] transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
