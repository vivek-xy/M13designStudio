'use client';
import { useState } from 'react';
import { User, Package, MapPin, Heart, LogOut, ChevronRight, Star } from 'lucide-react';
import { useStore } from '@/lib/store';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';

const MOCK_ORDERS = [
  { id: 'AB240301', date: '2024-03-01', status: 'Delivered', total: 2499, items: [PRODUCTS[0]] },
  { id: 'AB240215', date: '2024-02-15', status: 'Processing', total: 4999, items: [PRODUCTS[4]] },
  { id: 'AB240110', date: '2024-01-10', status: 'Shipped', total: 1899, items: [PRODUCTS[2]] },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: 'badge-green', Processing: 'badge-yellow', Shipped: 'badge-blue', Cancelled: 'badge-red',
};

const TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
];

export default function AccountPage() {
  const { user, setUser, wishlist } = useStore();
  const [tab, setTab] = useState('overview');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const wishlisted = PRODUCTS.filter(p => wishlist.includes(p.id));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ id: '1', name: 'Priya Sharma', email: loginForm.email || 'priya@example.com', role: 'user' });
  };

  if (!user) return (
    <div className="min-h-screen bg-[#F8FAFD] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#E5EBF4] p-8 w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black">Welcome Back</h1>
          <p className="text-[#5A6472] mt-1">Sign in to your M13 Design Studio account</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div><label className="block text-sm font-medium mb-1.5">Email</label>
            <input className="input-field" type="email" placeholder="you@email.com" value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div><label className="block text-sm font-medium mb-1.5">Password</label>
            <input className="input-field" type="password" placeholder="••••••••" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          <div className="flex justify-end"><a href="#" className="text-sm text-[#0A66FF] hover:underline">Forgot password?</a></div>
          <button type="submit" className="btn-primary justify-center py-3.5">Sign In</button>
        </form>
        <p className="text-center text-sm text-[#5A6472] mt-5">Don&apos;t have an account? <a href="#" onClick={() => setUser({ id: '1', name: 'New User', email: 'new@email.com', role: 'user' })} className="text-[#0A66FF] font-medium hover:underline">Create account</a></p>
        <div className="mt-4 pt-4 border-t border-[#E5EBF4] flex flex-col gap-2">
          <button className="btn-ghost w-full justify-center gap-3 py-3">
            <Image src="https://img.icons8.com/color/20/google-logo.png" alt="Google" width={20} height={20} /> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-5 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] flex items-center justify-center text-white font-black text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-[#5A6472]">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`admin-nav-item w-full text-left ${tab === id ? 'active' : ''}`}>
                <Icon size={16} /> {label}
                <ChevronRight size={14} className="ml-auto" />
              </button>
            ))}
            <button onClick={() => setUser(null)} className="admin-nav-item w-full text-left text-red-400 hover:text-red-500 hover:bg-red-50">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
          {user.role === 'admin' && (
            <Link href="/admin" className="btn-primary w-full justify-center mt-4">Admin Dashboard</Link>
          )}
        </aside>

        {/* Content */}
        <div className="flex-1">
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#E5EBF4] p-6">
                <h2 className="font-bold text-lg mb-5">Account Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1.5">Full Name</label><input className="input-field" defaultValue={user.name} /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Email</label><input className="input-field" defaultValue={user.email} /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Phone</label><input className="input-field" placeholder="+91 98765 43210" /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Birthday</label><input className="input-field" type="date" /></div>
                </div>
                <button className="btn-primary mt-5">Save Changes</button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[{ label: 'Total Orders', value: MOCK_ORDERS.length }, { label: 'Wishlist Items', value: wishlist.length }, { label: 'Loyalty Points', value: 240 }].map(s => (
                  <div key={s.label} className="stat-card text-center">
                    <p className="text-3xl font-black text-[#0A66FF] mb-1">{s.value}</p>
                    <p className="text-sm text-[#5A6472]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden">
              <div className="p-5 border-b border-[#E5EBF4]"><h2 className="font-bold text-lg">Order History</h2></div>
              {MOCK_ORDERS.map(order => (
                <div key={order.id} className="p-5 border-b border-[#E5EBF4] last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-[#0A66FF]">#{order.id}</p>
                      <p className="text-sm text-[#5A6472]">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                      <span className={`badge ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                      <p className="font-bold mt-1">₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-2">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-tight">{item.name}</p>
                          <div className="flex gap-1 mt-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < item.rating ? '#F59E0B' : 'none'} stroke={i < item.rating ? '#F59E0B' : '#D1D5DB'} />)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {order.status === 'Delivered' && (
                    <button className="text-sm text-[#0A66FF] mt-2 hover:underline font-medium">Reorder</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'wishlist' && (
            <div>
              <h2 className="font-bold text-lg mb-5">My Wishlist ({wishlisted.length})</h2>
              {wishlisted.length === 0
                ? <div className="text-center py-16 bg-white rounded-2xl border border-[#E5EBF4]">
                    <Heart size={48} className="text-[#E5EBF4] mx-auto mb-4" />
                    <p className="text-[#5A6472]">No items in wishlist yet</p>
                    <Link href="/shop" className="btn-primary mt-4 inline-flex">Browse Products</Link>
                  </div>
                : <div className="products-grid">{wishlisted.map(p => <ProductCard key={p.id} product={p} />)}</div>
              }
            </div>
          )}

          {tab === 'addresses' && (
            <div className="bg-white rounded-2xl border border-[#E5EBF4] p-6">
              <h2 className="font-bold text-lg mb-5">Saved Addresses</h2>
              <div className="border-2 border-dashed border-[#E5EBF4] rounded-2xl p-8 text-center">
                <MapPin size={32} className="text-[#8B9BAD] mx-auto mb-3" />
                <p className="text-[#5A6472] mb-4">No addresses saved yet</p>
                <button className="btn-primary">Add New Address</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

