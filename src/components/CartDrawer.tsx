'use client';
import { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1001]" onClick={() => setCartOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[1002] shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5EBF4]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#0A66FF]" />
            <h2 className="font-bold text-lg">Your Cart ({cart.length})</h2>
          </div>
          <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-lg bg-[#F8FAFD] flex items-center justify-center hover:bg-[#EEF4FF] transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-24 h-24 rounded-full bg-[#EEF4FF] flex items-center justify-center">
                <ShoppingBag size={36} className="text-[#0A66FF]" />
              </div>
              <h3 className="font-semibold text-lg">Your cart is empty</h3>
              <p className="text-[#5A6472] text-sm">Add some beautiful art to your cart!</p>
              <button onClick={() => setCartOpen(false)} className="btn-primary mt-2">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-4 bg-[#F8FAFD] rounded-2xl">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{item.name}</h4>
                    {item.selectedSize && <p className="text-xs text-[#5A6472] mb-1">{item.selectedSize}</p>}
                    {item.customization && <p className="text-xs text-[#0A66FF] mb-1 truncate">✏️ {item.customization}</p>}
                    {item.customImages && item.customImages.length > 0 && (
                      <div className="flex items-center gap-2 mt-1 mb-2 overflow-x-auto pb-1">
                        {item.customImages.map((img, idx) => (
                          <div key={idx} className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#0A66FF]/20 shrink-0">
                            <Image src={img} fill className="object-cover" alt={`Custom upload ${idx + 1}`} />
                          </div>
                        ))}
                        <span className="text-[9px] font-bold text-[#0A66FF] uppercase whitespace-nowrap ml-1">{item.customImages.length} Photos</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E5EBF4] rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item.id, item.quantity - 1, item.selectedSize)} className="w-8 h-8 flex items-center justify-center hover:bg-[#EEF4FF] transition-all text-[#5A6472]" aria-label="Decrease quantity">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1, item.selectedSize)} className="w-8 h-8 flex items-center justify-center hover:bg-[#EEF4FF] transition-all text-[#5A6472]" aria-label="Increase quantity">
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0A66FF]">₹{(item.price * item.quantity).toLocaleString()}</span>
                        <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-all" aria-label="Remove item">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E5EBF4] bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#5A6472]">Subtotal</span>
              <span className="font-bold text-lg">₹{cartTotal().toLocaleString()}</span>
            </div>
            <p className="text-xs text-[#8B9BAD] mb-4">Shipping & taxes calculated at checkout</p>
            <div className="flex flex-col gap-2">
              <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn-primary justify-center text-center">
                Checkout <ArrowRight size={16} />
              </Link>
              <Link href="/cart" onClick={() => setCartOpen(false)} className="btn-secondary justify-center text-center text-sm">
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
