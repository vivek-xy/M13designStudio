'use client';
import { useState } from 'react';
import { Plus, Trash2, Edit2, Tag, Percent, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { COUPONS } from '@/lib/data';

interface Coupon {
  id: string; code: string; discount: number; type: 'percent' | 'flat';
  minOrder: number; uses: number; maxUses: number; active: boolean; expiry: string;
}

const INITIAL_COUPONS: Coupon[] = [
  { id: '1', code: 'WELCOME10', discount: 10, type: 'percent', minOrder: 0, uses: 234, maxUses: 1000, active: true, expiry: '2024-12-31' },
  { id: '2', code: 'SAVE20', discount: 20, type: 'percent', minOrder: 1999, uses: 89, maxUses: 500, active: true, expiry: '2024-06-30' },
  { id: '3', code: 'NEWUSER15', discount: 15, type: 'percent', minOrder: 0, uses: 445, maxUses: 1000, active: true, expiry: '2024-12-31' },
  { id: '4', code: 'FESTIVE25', discount: 25, type: 'percent', minOrder: 2999, uses: 12, maxUses: 200, active: false, expiry: '2024-04-01' },
  { id: '5', code: 'FLAT500', discount: 500, type: 'flat', minOrder: 3000, uses: 67, maxUses: 300, active: true, expiry: '2024-09-30' },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: '', discount: '', type: 'percent', minOrder: '', maxUses: '', expiry: '' });

  const toggle = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    toast.success('Coupon status updated');
  };
  const deleteCoupon = (id: string) => { setCoupons(prev => prev.filter(c => c.id !== id)); toast.success('Coupon deleted'); };

  const addCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const c: Coupon = { id: Date.now().toString(), code: form.code.toUpperCase(), discount: Number(form.discount), type: form.type as 'percent' | 'flat', minOrder: Number(form.minOrder) || 0, uses: 0, maxUses: Number(form.maxUses) || 1000, active: true, expiry: form.expiry };
    setCoupons(prev => [c, ...prev]);
    setShowModal(false);
    setForm({ code: '', discount: '', type: 'percent', minOrder: '', maxUses: '', expiry: '' });
    toast.success(`Coupon ${c.code} created!`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Coupons & Discounts</h2>
          <p className="text-sm text-[#5A6472]">Create and manage discount codes</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary gap-2"><Plus size={16} /> Create Coupon</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Coupons', value: coupons.length },
          { label: 'Active Coupons', value: coupons.filter(c => c.active).length },
          { label: 'Total Redemptions', value: coupons.reduce((s, c) => s + c.uses, 0) },
          { label: 'Avg Discount', value: `${Math.round(coupons.filter(c => c.type === 'percent').reduce((s, c) => s + c.discount, 0) / coupons.filter(c => c.type === 'percent').length)}%` },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <p className="text-2xl font-black text-[#0A66FF]">{s.value}</p>
            <p className="text-xs text-[#5A6472] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Coupons Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(c => (
          <div key={c.id} className={`bg-white rounded-2xl border-2 p-5 relative overflow-hidden transition-all ${c.active ? 'border-[#E5EBF4]' : 'border-dashed border-[#E5EBF4] opacity-60'}`}>
            {/* Perforated edge visual */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F8FAFD] border border-[#E5EBF4]" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F8FAFD] border border-[#E5EBF4]" />

            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={16} className="text-[#0A66FF]" />
                  <span className="font-black text-xl tracking-wider text-[#0A66FF]">{c.code}</span>
                </div>
                <span className={`badge px-3 py-1 text-sm ${c.active ? 'badge-green' : 'badge-red'}`}>{c.active ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex flex-col items-center justify-center">
                <span className="text-lg font-black text-[#0A66FF]">{c.discount}{c.type === 'percent' ? '%' : '₹'}</span>
                <span className="text-[9px] text-[#5A6472]">OFF</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#5A6472] border-t border-dashed border-[#E5EBF4] pt-3 mb-4">
              {c.minOrder > 0 && <p>Min. order: ₹{c.minOrder.toLocaleString()}</p>}
              <p className="flex items-center gap-1.5"><Calendar size={11} /> Expires: {new Date(c.expiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              <div className="mt-2">
                <div className="flex justify-between text-[10px] mb-1"><span>Used: {c.uses}/{c.maxUses}</span><span>{Math.round(c.uses / c.maxUses * 100)}%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(100, c.uses / c.maxUses * 100)}%` }} /></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => toggle(c.id)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${c.active ? 'text-green-600' : 'text-[#8B9BAD]'}`}>
                {c.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />} {c.active ? 'Enabled' : 'Disabled'}
              </button>
              <div className="ml-auto flex gap-1">
                <button className="w-7 h-7 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all"><Edit2 size={12} /></button>
                <button onClick={() => deleteCoupon(c.id)} className="w-7 h-7 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Create Coupon</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center">×</button>
            </div>
            <form onSubmit={addCoupon} className="flex flex-col gap-4">
              <div><label className="block text-sm font-medium mb-1.5">Coupon Code *</label>
                <input className="input-field uppercase" placeholder="e.g. SUMMER30" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1.5">Discount *</label>
                  <input className="input-field" type="number" placeholder="20" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} required />
                </div>
                <div><label className="block text-sm font-medium mb-1.5">Type</label>
                  <select className="input-field" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1.5">Min. Order (₹)</label>
                  <input className="input-field" type="number" placeholder="0" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))} />
                </div>
                <div><label className="block text-sm font-medium mb-1.5">Max Uses</label>
                  <input className="input-field" type="number" placeholder="1000" value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))} />
                </div>
              </div>
              <div><label className="block text-sm font-medium mb-1.5">Expiry Date *</label>
                <input className="input-field" type="date" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} required />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Create Coupon</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
