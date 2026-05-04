'use client';
import { useState } from 'react';
import { Search, Mail, Phone, User, ShoppingBag, Eye } from 'lucide-react';

const CUSTOMERS = [
  { id: '1', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 98765 43210', city: 'Mumbai', orders: 8, spent: 24680, joined: '2023-01-15', status: 'Active' },
  { id: '2', name: 'Rahul Verma', email: 'rahul@email.com', phone: '+91 87654 32109', city: 'Delhi', orders: 3, spent: 8450, joined: '2023-06-20', status: 'Active' },
  { id: '3', name: 'Sneha Patel', email: 'sneha@email.com', phone: '+91 76543 21098', city: 'Bangalore', orders: 12, spent: 41200, joined: '2022-11-05', status: 'VIP' },
  { id: '4', name: 'Aditya Kumar', email: 'aditya@email.com', phone: '+91 65432 10987', city: 'Pune', orders: 1, spent: 2499, joined: '2024-03-01', status: 'New' },
  { id: '5', name: 'Kavita Rao', email: 'kavita@email.com', phone: '+91 54321 09876', city: 'Chennai', orders: 5, spent: 14999, joined: '2023-04-12', status: 'Active' },
  { id: '6', name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 43210 98765', city: 'Jaipur', orders: 2, spent: 6198, joined: '2023-09-30', status: 'Active' },
];

const STATUS_COLORS: Record<string, string> = { Active: 'badge-green', VIP: 'bg-purple-50 text-purple-600', New: 'badge-blue' };

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Customers <span className="text-[#5A6472] font-normal text-base">({filtered.length})</span></h2>
          <p className="text-sm text-[#5A6472]">Manage your customer base</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: CUSTOMERS.length, icon: User, color: '#0A66FF', bg: '#EEF4FF' },
          { label: 'VIP Customers', value: CUSTOMERS.filter(c => c.status === 'VIP').length, icon: User, color: '#9333EA', bg: '#F3E8FF' },
          { label: 'New This Month', value: CUSTOMERS.filter(c => c.status === 'New').length, icon: User, color: '#10B981', bg: '#ECFDF5' },
          { label: 'Avg Spend', value: `₹${Math.round(CUSTOMERS.reduce((s, c) => s + c.spent, 0) / CUSTOMERS.length).toLocaleString()}`, icon: ShoppingBag, color: '#F59E0B', bg: '#FFFBEB' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-black">{s.value}</p>
            <p className="text-xs text-[#5A6472] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E5EBF4] p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
          <input className="input-field pl-9 py-2.5 text-sm" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Customer</th><th>Contact</th><th>City</th><th>Orders</th><th>Total Spent</th><th>Joined</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <p className="font-semibold text-sm">{c.name}</p>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs text-[#5A6472] flex items-center gap-1.5"><Mail size={11} />{c.email}</p>
                    <p className="text-xs text-[#5A6472] flex items-center gap-1.5 mt-0.5"><Phone size={11} />{c.phone}</p>
                  </td>
                  <td className="text-sm text-[#5A6472]">{c.city}</td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag size={13} className="text-[#0A66FF]" />
                      <span className="font-semibold text-sm">{c.orders}</span>
                    </div>
                  </td>
                  <td className="font-bold text-sm">₹{c.spent.toLocaleString()}</td>
                  <td className="text-xs text-[#5A6472]">{new Date(c.joined).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</td>
                  <td><span className={`badge ${STATUS_COLORS[c.status]} text-xs`}>{c.status}</span></td>
                  <td>
                    <button className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all">
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
