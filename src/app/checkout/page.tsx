'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { CheckCircle, CreditCard, MapPin, Package, ChevronRight, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const STEPS = ['Address', 'Payment', 'Confirm'];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [payment, setPayment] = useState('card');
  const [ordered, setOrdered] = useState(false);

  const shipping = cartTotal() >= 1999 ? 0 : 99;
  const total = cartTotal() + shipping;

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleOrder = () => {
    setTimeout(() => {
      setOrdered(true);
      clearCart();
    }, 1500);
    toast.loading('Processing your order...', { duration: 1500 });
  };

  if (ordered) return (
    <div className="container py-20 text-center max-w-lg mx-auto">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-fade-in">
        <CheckCircle size={48} className="text-green-500" />
      </div>
      <h1 className="text-3xl font-black text-[#0D1117] mb-3">Order Placed! 🎉</h1>
      <p className="text-[#5A6472] mb-2">Thank you, {form.name || 'Customer'}!</p>
      <p className="text-[#5A6472] mb-8">Your order <strong className="text-[#0D1117]">#AB{Date.now().toString().slice(-6)}</strong> has been confirmed. You'll receive a confirmation on <strong>{form.email || 'your email'}</strong>.</p>
      <div className="bg-[#F8FAFD] rounded-2xl p-6 border border-[#E5EBF4] mb-8 text-left space-y-2">
        <p className="text-sm text-[#5A6472]">Estimated delivery: <strong className="text-[#0D1117]">5–7 business days</strong></p>
        <p className="text-sm text-[#5A6472]">Shipping to: <strong className="text-[#0D1117]">{form.city || 'Your city'}</strong></p>
      </div>
      <a href="/" className="btn-primary">Back to Home</a>
    </div>
  );

  return (
    <div className="container py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-[#0A66FF] text-white' : 'bg-[#E5EBF4] text-[#8B9BAD]'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs mt-1.5 font-medium ${i === step ? 'text-[#0A66FF]' : 'text-[#8B9BAD]'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 mb-4 ${i < step ? 'bg-green-500' : 'bg-[#E5EBF4]'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="bg-white rounded-2xl border border-[#E5EBF4] p-6">
              <h2 className="font-bold text-lg mb-5 flex items-center gap-2"><MapPin size={18} className="text-[#0A66FF]" /> Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1.5">Full Name *</label><input className="input-field" placeholder="Priya Sharma" value={form.name} onChange={e => update('name', e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-1.5">Email *</label><input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={e => update('email', e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-1.5">Phone *</label><input className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-1.5">Pincode *</label><input className="input-field" placeholder="400001" value={form.pincode} onChange={e => update('pincode', e.target.value)} /></div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium mb-1.5">Address *</label><textarea className="input-field" rows={3} placeholder="House No., Street, Landmark..." value={form.address} onChange={e => update('address', e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-1.5">City *</label><input className="input-field" placeholder="Mumbai" value={form.city} onChange={e => update('city', e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-1.5">State *</label>
                  <select className="input-field" value={form.state} onChange={e => update('state', e.target.value)}>
                    <option value="">Select State</option>
                    {['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => { if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) { toast.error('Please fill all required fields'); return; } setStep(1); }}
                className="btn-primary mt-6 px-8">Continue to Payment <ChevronRight size={16} /></button>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white rounded-2xl border border-[#E5EBF4] p-6">
              <h2 className="font-bold text-lg mb-5 flex items-center gap-2"><CreditCard size={18} className="text-[#0A66FF]" /> Payment Method</h2>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'upi', label: 'UPI / Google Pay / PhonePe', icon: '📱' },
                  { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                ].map(opt => (
                  <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === opt.id ? 'border-[#0A66FF] bg-[#EEF4FF]' : 'border-[#E5EBF4] hover:border-[#0A66FF]/40'}`}>
                    <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id)} className="hidden" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment === opt.id ? 'border-[#0A66FF]' : 'border-[#E5EBF4]'}`}>
                      {payment === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#0A66FF]" />}
                    </div>
                    <span className="text-xl">{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
              {payment === 'card' && (
                <div className="grid gap-4 mb-6">
                  <div><label className="block text-sm font-medium mb-1.5">Card Number</label><input className="input-field" placeholder="1234 5678 9012 3456" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1.5">Expiry</label><input className="input-field" placeholder="MM/YY" /></div>
                    <div><label className="block text-sm font-medium mb-1.5">CVV</label><input className="input-field" type="password" placeholder="•••" /></div>
                  </div>
                </div>
              )}
              {payment === 'upi' && (
                <div className="mb-6"><label className="block text-sm font-medium mb-1.5">UPI ID</label><input className="input-field" placeholder="yourname@upi" /></div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-ghost">← Back</button>
                <button onClick={() => setStep(2)} className="btn-primary px-8">Review Order <ChevronRight size={16} /></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl border border-[#E5EBF4] p-6">
              <h2 className="font-bold text-lg mb-5 flex items-center gap-2"><Package size={18} className="text-[#0A66FF]" /> Order Review</h2>
              <div className="bg-[#F8FAFD] rounded-xl p-4 mb-5">
                <p className="text-sm font-semibold mb-1">Delivering to:</p>
                <p className="text-sm text-[#5A6472]">{form.name} • {form.phone}</p>
                <p className="text-sm text-[#5A6472]">{form.address}, {form.city}, {form.state} – {form.pincode}</p>
              </div>
              <div className="flex flex-col gap-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.images[0]} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-[#5A6472]">Qty: {item.quantity} {item.selectedSize ? `· ${item.selectedSize}` : ''}</p>
                    </div>
                    <span className="font-bold shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
                <button onClick={handleOrder} className="btn-primary flex-1 justify-center py-4 text-base">
                  <Lock size={16} /> Place Order – ₹{total.toLocaleString()}
                </button>
              </div>
              <p className="text-xs text-[#8B9BAD] mt-3 text-center flex items-center justify-center gap-1">
                <Lock size={11} /> Your payment is secured with 256-bit SSL encryption
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-5 sticky top-24">
            <h3 className="font-bold mb-4">Order Summary</h3>
            <div className="flex flex-col gap-3 max-h-48 overflow-y-auto mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-2 text-sm">
                  <img src={item.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <span className="flex-1 truncate text-[#5A6472]">{item.name}</span>
                  <span className="font-semibold shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E5EBF4] pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#5A6472]">Subtotal</span><span>₹{cartTotal().toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#5A6472]">Shipping</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="flex justify-between font-black text-base pt-2 border-t border-[#E5EBF4]">
                <span>Total</span><span className="text-[#0A66FF]">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
