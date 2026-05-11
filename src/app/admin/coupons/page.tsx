'use client';
import { useState } from 'react';
import { Plus, Trash2, Edit2, Tag, Calendar, ToggleLeft, ToggleRight, X, Percent, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

interface Coupon {
  id: string; code: string; discount: number; type: 'percent' | 'flat';
  minOrder: number; uses: number; maxUses: number; active: boolean; expiry: string;
}

const INITIAL_COUPONS: Coupon[] = [
  { id: '1', code: 'WELCOME10', discount: 10, type: 'percent', minOrder: 0,    uses: 234, maxUses: 1000, active: true,  expiry: '2026-12-31' },
  { id: '2', code: 'SAVE20',    discount: 20, type: 'percent', minOrder: 1999, uses: 89,  maxUses: 500,  active: true,  expiry: '2026-06-30' },
  { id: '3', code: 'NEWUSER15', discount: 15, type: 'percent', minOrder: 0,    uses: 445, maxUses: 1000, active: true,  expiry: '2026-12-31' },
  { id: '4', code: 'FESTIVE25', discount: 25, type: 'percent', minOrder: 2999, uses: 12,  maxUses: 200,  active: false, expiry: '2026-10-31' },
  { id: '5', code: 'FLAT500',   discount: 500, type: 'flat',   minOrder: 3000, uses: 67,  maxUses: 300,  active: true,  expiry: '2026-09-30' },
];

const EMPTY_FORM = { code: '', discount: '', type: 'percent' as 'percent' | 'flat', minOrder: '', maxUses: '1000', expiry: '' };

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openAdd = () => {
    setEditingCoupon(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (c: Coupon) => {
    setEditingCoupon(c);
    setForm({
      code: c.code,
      discount: String(c.discount),
      type: c.type,
      minOrder: c.minOrder ? String(c.minOrder) : '',
      maxUses: String(c.maxUses),
      expiry: c.expiry,
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingCoupon(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = form.code.toUpperCase().trim();
    if (!code) { toast.error('Coupon code is required'); return; }

    // Duplicate check (skip own ID when editing)
    if (coupons.some(c => c.code === code && c.id !== editingCoupon?.id)) {
      toast.error(`Code "${code}" already exists`);
      return;
    }

    if (editingCoupon) {
      setCoupons(prev => prev.map(c => c.id === editingCoupon.id
        ? { ...c, code, discount: Number(form.discount), type: form.type, minOrder: Number(form.minOrder) || 0, maxUses: Number(form.maxUses) || 1000, expiry: form.expiry }
        : c
      ));
      toast.success(`Coupon "${code}" updated!`);
    } else {
      const newCoupon: Coupon = {
        id: Date.now().toString(),
        code,
        discount: Number(form.discount),
        type: form.type,
        minOrder: Number(form.minOrder) || 0,
        uses: 0,
        maxUses: Number(form.maxUses) || 1000,
        active: true,
        expiry: form.expiry,
      };
      setCoupons(prev => [newCoupon, ...prev]);
      toast.success(`Coupon "${code}" created!`);
    }
    handleClose();
  };

  const toggle = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    const c = coupons.find(x => x.id === id);
    toast.success(`${c?.code} ${c?.active ? 'disabled' : 'enabled'}`);
  };

  const deleteCoupon = (c: Coupon) => {
    if (!confirm(`Delete coupon "${c.code}"?`)) return;
    setCoupons(prev => prev.filter(x => x.id !== c.id));
    toast.success(`"${c.code}" deleted`);
  };

  // ── Fix: guard against divide-by-zero in avg discount stat
  const percentCoupons = coupons.filter(c => c.type === 'percent');
  const avgDiscount = percentCoupons.length > 0
    ? Math.round(percentCoupons.reduce((s, c) => s + c.discount, 0) / percentCoupons.length)
    : 0;

  const isExpired = (expiry: string) => new Date(expiry) < new Date();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0D1117]">Coupons & Discounts</h2>
          <p className="text-sm text-[#8B9BAD]">Create and manage promotional codes</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2 h-11 px-6">
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Coupons',      value: coupons.length,                                        color: '#0A66FF' },
          { label: 'Active',             value: coupons.filter(c => c.active && !isExpired(c.expiry)).length, color: '#10B981' },
          { label: 'Total Redemptions',  value: coupons.reduce((s, c) => s + c.uses, 0),               color: '#8B5CF6' },
          { label: 'Avg % Discount',     value: percentCoupons.length > 0 ? `${avgDiscount}%` : 'N/A', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-[#5A6472] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Coupon Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(c => {
          const expired = isExpired(c.expiry);
          const usePct = Math.min(100, Math.round(c.uses / c.maxUses * 100));

          return (
            <div
              key={c.id}
              className={`bg-white rounded-2xl border-2 p-5 relative overflow-hidden transition-all ${
                c.active && !expired ? 'border-[#E5EBF4]' : 'border-dashed border-[#E5EBF4] opacity-60'
              }`}
            >
              {/* Perforated edge */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F8FAFD] border border-[#E5EBF4]" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F8FAFD] border border-[#E5EBF4]" />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={15} className="text-[#0A66FF]" />
                    <span className="font-black text-lg tracking-wider text-[#0A66FF]">{c.code}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`badge text-xs ${c.active && !expired ? 'badge-green' : 'badge-red'}`}>
                      {expired ? 'Expired' : c.active ? 'Active' : 'Disabled'}
                    </span>
                    {expired && <span className="badge badge-red text-xs">Expired</span>}
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex flex-col items-center justify-center shrink-0">
                  <span className="text-lg font-black text-[#0A66FF] leading-none">{c.discount}{c.type === 'percent' ? '%' : '₹'}</span>
                  <span className="text-[9px] text-[#5A6472] uppercase tracking-wider">OFF</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#5A6472] border-t border-dashed border-[#E5EBF4] pt-3 mb-4">
                {c.minOrder > 0 && <p>Min. order: ₹{c.minOrder.toLocaleString()}</p>}
                <p className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  Expires: {new Date(c.expiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>Used: {c.uses} / {c.maxUses}</span>
                    <span>{usePct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${usePct}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggle(c.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${c.active ? 'text-green-600' : 'text-[#8B9BAD]'}`}
                >
                  {c.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  {c.active ? 'Enabled' : 'Disabled'}
                </button>
                <div className="ml-auto flex gap-1">
                  <button
                    onClick={() => openEdit(c)}
                    className="w-7 h-7 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all"
                    title="Edit coupon"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => deleteCoupon(c)}
                    className="w-7 h-7 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all"
                    title="Delete coupon"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-box max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-xl text-[#0D1117]">
                {editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
              </h3>
              <button onClick={handleClose} className="w-9 h-9 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Code */}
              <div>
                <label className="block text-sm font-bold mb-1.5">Coupon Code *</label>
                <input
                  className="input-field uppercase tracking-widest font-bold"
                  placeholder="e.g. SUMMER30"
                  value={form.code}
                  onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                  required
                />
              </div>

              {/* Discount + Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1.5">Discount Amount *</label>
                  <input
                    className="input-field"
                    type="number"
                    min="1"
                    placeholder={form.type === 'percent' ? '20' : '500'}
                    value={form.discount}
                    onChange={e => setForm(f => ({ ...f, discount: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Discount Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: 'percent' }))}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                        form.type === 'percent' ? 'border-[#0A66FF] bg-[#EEF4FF] text-[#0A66FF]' : 'border-[#E5EBF4] text-[#5A6472]'
                      }`}
                    >
                      <Percent size={14} /> %
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: 'flat' }))}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                        form.type === 'flat' ? 'border-[#0A66FF] bg-[#EEF4FF] text-[#0A66FF]' : 'border-[#E5EBF4] text-[#5A6472]'
                      }`}
                    >
                      <IndianRupee size={14} /> ₹
                    </button>
                  </div>
                </div>
              </div>

              {/* Min Order + Max Uses */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1.5">Min. Order (₹)</label>
                  <input className="input-field" type="number" min="0" placeholder="0" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Max Uses</label>
                  <input className="input-field" type="number" min="1" placeholder="1000" value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))} />
                </div>
              </div>

              {/* Expiry */}
              <div>
                <label className="block text-sm font-bold mb-1.5">Expiry Date *</label>
                <input
                  className="input-field"
                  type="date"
                  min={new Date().toISOString().split('T')[0]} // Can't set past dates
                  value={form.expiry}
                  onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))}
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={handleClose} className="btn-ghost flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">
                  {editingCoupon ? 'Save Changes' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
