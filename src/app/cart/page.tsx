'use client';
import { useState } from 'react';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { COUPONS } from '@/lib/data';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const shipping = cartTotal() >= 1999 ? 0 : 99;
  const discountAmt = Math.round(cartTotal() * discount / 100);
  const total = cartTotal() - discountAmt + shipping;

  const applyCoupon = () => {
    const pct = COUPONS[coupon.toUpperCase()];
    if (pct) {
      setDiscount(pct);
      setAppliedCoupon(coupon.toUpperCase());
      toast.success(`🎉 Coupon applied! ${pct}% discount`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  if (cart.length === 0) return (
    <div className="container py-20 text-center">
      <div className="w-24 h-24 rounded-full bg-[#EEF4FF] flex items-center justify-center mx-auto mb-6">
        <ShoppingBag size={40} className="text-[#0A66FF]" />
      </div>
      <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
      <p className="text-[#5A6472] mb-8">Add some amazing artworks to get started</p>
      <Link href="/shop" className="btn-primary">Browse Products <ArrowRight size={16} /></Link>
    </div>
  );

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart <span className="text-[#5A6472] font-normal text-xl">({cart.length} items)</span></h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-4 bg-[#F8FAFD] border-b border-[#E5EBF4] text-sm font-semibold text-[#5A6472]">
              <span>Product</span><span>Size</span><span>Qty</span><span>Total</span>
            </div>
            {cart.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}`}
                className={`flex flex-col md:grid md:grid-cols-[1fr_auto_auto_auto] gap-4 items-start md:items-center px-6 py-5 ${idx < cart.length - 1 ? 'border-b border-[#E5EBF4]' : ''}`}>
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm leading-snug">{item.name}</h3>
                    {item.customization && <p className="text-xs text-[#0A66FF] mt-0.5 truncate">✏️ {item.customization}</p>}
                    <p className="text-[#0A66FF] font-bold text-sm mt-1">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
                <span className="text-sm text-[#5A6472] shrink-0">{item.selectedSize || '—'}</span>
                <div className="flex items-center border border-[#E5EBF4] rounded-xl overflow-hidden">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-[#EEF4FF] text-[#5A6472]">
                    <Minus size={12} />
                  </button>
                  <span className="w-9 text-center text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-[#EEF4FF] text-[#5A6472]">
                    <Plus size={12} />
                  </button>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                  <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/shop" className="btn-ghost text-sm">← Continue Shopping</Link>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Tag size={16} className="text-[#0A66FF]" /> Coupon Code</h3>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <div>
                  <p className="font-bold text-green-700 text-sm">{appliedCoupon}</p>
                  <p className="text-xs text-green-600">{discount}% discount applied</p>
                </div>
                <button onClick={() => { setDiscount(0); setAppliedCoupon(''); setCoupon(''); }} className="text-xs text-red-500 hover:underline">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. WELCOME10)"
                  className="input-field flex-1 text-sm py-2.5 uppercase"
                  onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                />
                <button onClick={applyCoupon} className="px-4 py-2.5 rounded-xl bg-[#0A66FF] text-white text-sm font-semibold hover:bg-[#0050CC] transition-all">Apply</button>
              </div>
            )}
            <p className="text-xs text-[#8B9BAD] mt-2">Try: WELCOME10, SAVE20, FESTIVE25</p>
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-5">
            <h3 className="font-bold mb-4">Order Summary</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#5A6472]">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium">₹{cartTotal().toLocaleString()}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount ({discount}%)</span>
                  <span>-₹{discountAmt.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#5A6472]">Shipping</span>
                {shipping === 0
                  ? <span className="text-green-600 font-medium">FREE 🎉</span>
                  : <span>₹{shipping}</span>}
              </div>
              {shipping > 0 && (
                <p className="text-xs text-[#8B9BAD] bg-[#F8FAFD] p-2 rounded-lg">
                  Add ₹{(1999 - cartTotal()).toLocaleString()} more for free shipping
                </p>
              )}
              <div className="border-t border-[#E5EBF4] pt-3 flex justify-between font-black text-lg">
                <span>Total</span>
                <span className="text-[#0A66FF]">₹{total.toLocaleString()}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full justify-center mt-5 py-4 text-base">
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
            <div className="flex items-center justify-center gap-4 mt-4">
              <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" className="h-5 opacity-60" />
              <img src="https://img.icons8.com/color/24/mastercard.png" alt="Mastercard" className="h-5 opacity-60" />
              <span className="text-xs text-[#8B9BAD]">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
