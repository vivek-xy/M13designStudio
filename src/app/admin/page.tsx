'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Package, Star, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/data';

const REVENUE_DATA = [
  { month: 'Oct', revenue: 82000, orders: 34 },
  { month: 'Nov', revenue: 95000, orders: 42 },
  { month: 'Dec', revenue: 148000, orders: 68 },
  { month: 'Jan', revenue: 112000, orders: 51 },
  { month: 'Feb', revenue: 135000, orders: 59 },
  { month: 'Mar', revenue: 163000, orders: 74 },
];

const CAT_DATA = [
  { name: 'Wall Art', value: 38 },
  { name: 'Personalized', value: 27 },
  { name: 'Religious', value: 20 },
  { name: 'Frames', value: 9 },
  { name: 'Decor', value: 6 },
];
const PIE_COLORS = ['#0A66FF', '#4D8FFF', '#00D4AA', '#F59E0B', '#EF4444'];

const RECENT_ORDERS = [
  { id: 'AB240401', customer: 'Priya Sharma', product: 'Custom Portrait', amount: 4999, status: 'Processing', date: '2024-04-01' },
  { id: 'AB240402', customer: 'Rahul Verma', product: 'Ganesha Canvas', amount: 2199, status: 'Shipped', date: '2024-04-01' },
  { id: 'AB240403', customer: 'Sneha Patel', product: 'Photo Frame', amount: 1499, status: 'Delivered', date: '2024-03-31' },
  { id: 'AB240404', customer: 'Aditya Kumar', product: 'Abstract Art', amount: 2499, status: 'Processing', date: '2024-03-31' },
  { id: 'AB240405', customer: 'Kavita Rao', product: 'Pet Portrait', amount: 3999, status: 'Delivered', date: '2024-03-30' },
];

const STATUS_STYLE: Record<string, string> = {
  Processing: 'badge-yellow', Shipped: 'badge-blue', Delivered: 'badge-green', Cancelled: 'badge-red',
};

const STATS = [
  { label: 'Total Revenue', value: '₹7,35,000', change: '+18.4%', up: true, icon: DollarSign, color: '#0A66FF', bg: '#EEF4FF' },
  { label: 'Total Orders', value: '328', change: '+12.2%', up: true, icon: ShoppingBag, color: '#00D4AA', bg: '#EDF9F5' },
  { label: 'Active Customers', value: '1,842', change: '+9.1%', up: true, icon: Users, color: '#F59E0B', bg: '#FFFBEB' },
  { label: 'Avg Order Value', value: '₹2,241', change: '-3.2%', up: false, icon: Package, color: '#EF4444', bg: '#FEF2F2' },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [soldCounts, setSoldCounts] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setSoldCounts(PRODUCTS.filter(p => p.isBestSeller).slice(0, 4).map(() => Math.floor(Math.random() * 50 + 20)));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="p-6 text-[#5A6472]">Loading Dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={20} style={{ color: s.color }} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{s.change}
              </span>
            </div>
            <p className="text-2xl font-black text-[#0D1117] mb-1">{s.value}</p>
            <p className="text-sm text-[#5A6472]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-[#0D1117]">Revenue Overview</h3>
              <p className="text-sm text-[#5A6472]">Last 6 months</p>
            </div>
            <select className="text-sm border border-[#E5EBF4] rounded-lg px-3 py-1.5 outline-none text-[#5A6472]">
              <option>6 Months</option><option>12 Months</option><option>This Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A66FF" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0A66FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8B9BAD' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#8B9BAD' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`₹${v?.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #E5EBF4', fontSize: 13 }} />
              <Area type="monotone" dataKey="revenue" stroke="#0A66FF" strokeWidth={2.5} fill="url(#revGrad)" dot={{ fill: '#0A66FF', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="stat-card">
          <h3 className="font-bold text-[#0D1117] mb-1">Sales by Category</h3>
          <p className="text-sm text-[#5A6472] mb-4">Current month</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CAT_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {CAT_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, '']} contentStyle={{ borderRadius: 12, border: '1px solid #E5EBF4', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1.5 mt-2">
            {CAT_DATA.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-[#5A6472]">{c.name}</span>
                </div>
                <span className="font-semibold">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Chart */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-5">
          <div><h3 className="font-bold">Orders per Month</h3><p className="text-sm text-[#5A6472]">Last 6 months</p></div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={REVENUE_DATA} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8B9BAD' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#8B9BAD' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5EBF4', fontSize: 13 }} formatter={(v: any) => [v, 'Orders']} />
            <Bar dataKey="orders" fill="#0A66FF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders + Top Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recent Orders</h3>
            <Link href="/admin/orders" className="text-sm text-[#0A66FF] flex items-center gap-1">View All <ArrowRight size={14} /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {RECENT_ORDERS.map(o => (
                  <tr key={o.id}>
                    <td><p className="font-semibold text-[#0A66FF] text-xs">#{o.id}</p><p className="text-[10px] text-[#8B9BAD]">{o.product}</p></td>
                    <td className="text-sm">{o.customer}</td>
                    <td className="font-semibold text-sm">₹{o.amount.toLocaleString()}</td>
                    <td><span className={`badge ${STATUS_STYLE[o.status]} text-xs`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Top Products</h3>
            <Link href="/admin/products" className="text-sm text-[#0A66FF] flex items-center gap-1">Manage <ArrowRight size={14} /></Link>
          </div>
          <div className="flex flex-col gap-4">
            {PRODUCTS.filter(p => p.isBestSeller).slice(0, 4).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#EEF4FF] text-[#0A66FF] font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{p.name}</p>
                  <div className="flex items-center gap-1">
                    <Star size={10} fill="#F59E0B" stroke="#F59E0B" />
                    <span className="text-xs text-[#8B9BAD]">{p.rating} ({p.reviews})</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm">₹{p.price.toLocaleString()}</p>
                  <p className="text-xs text-[#8B9BAD]">{soldCounts[i] || 0} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
