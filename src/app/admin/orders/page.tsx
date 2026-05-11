'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Eye, Truck, Package, CheckCircle, XCircle, Clock, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

interface Order {
  id: string; customer: string; email: string; phone: string;
  product: string; amount: number; status: OrderStatus;
  date: string; city: string; items: number;
  customImages?: string[];
}

const MOCK_ORDERS: Order[] = [
  { id: 'M13-240401', customer: 'Priya Sharma',  email: 'priya@email.com',   phone: '+91 98765 43210', product: 'Custom Oil Portrait',      amount: 4999, status: 'Processing',  date: '2024-04-01', city: 'Mumbai',    items: 1, customImages: ['https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800'] },
  { id: 'M13-240402', customer: 'Rahul Verma',   email: 'rahul@email.com',   phone: '+91 87654 32109', product: 'Abstract Blue Harmony',        amount: 2199, status: 'Shipped',     date: '2024-04-01', city: 'Delhi',     items: 2 },
  { id: 'M13-240403', customer: 'Sneha Patel',   email: 'sneha@email.com',   phone: '+91 76543 21098', product: 'Pet Watercolor Art',           amount: 2499, status: 'Delivered',   date: '2024-03-31', city: 'Bangalore', items: 1, customImages: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800'] },
  { id: 'M13-240404', customer: 'Aditya Kumar',  email: 'aditya@email.com',  phone: '+91 65432 10987', product: 'Minimalist Geometric Set',      amount: 2499, status: 'Confirmed',   date: '2024-03-31', city: 'Pune',      items: 1 },
  { id: 'M13-240405', customer: 'Kavita Rao',    email: 'kavita@email.com',  phone: '+91 54321 09876', product: 'Bohemian Macramé Hanging',      amount: 3999, status: 'Delivered',   date: '2024-03-30', city: 'Chennai',   items: 1 },
  { id: 'M13-240406', customer: 'Vikram Singh',  email: 'vikram@email.com',  phone: '+91 43210 98765', product: 'Radha Krishna Canvas',          amount: 3299, status: 'Cancelled',   date: '2024-03-29', city: 'Jaipur',    items: 1 },
  { id: 'M13-240407', customer: 'Meera Nair',    email: 'meera@email.com',   phone: '+91 32109 87654', product: 'Fluid Ink Dance',              amount: 1999, status: 'Processing',  date: '2024-03-29', city: 'Kochi',     items: 2 },
  { id: 'M13-240408', customer: 'Arjun Reddy',   email: 'arjun@email.com',   phone: '+91 21098 76543', product: 'Gold Leaf Geometry',           amount: 3499, status: 'Shipped',     date: '2024-03-28', city: 'Hyderabad', items: 1 },
];

const STATUS_CONFIG: Record<OrderStatus, { badge: string; icon: React.ElementType }> = {
  Processing: { badge: 'badge-yellow', icon: Clock },
  Confirmed:  { badge: 'badge-blue',   icon: CheckCircle },
  Shipped:    { badge: 'badge-blue',   icon: Truck },
  Delivered:  { badge: 'badge-green',  icon: CheckCircle },
  Cancelled:  { badge: 'badge-red',    icon: XCircle },
};

const STATUS_FLOW: OrderStatus[] = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.orders.list();
        // Merge with mock orders for demo purposes if empty
        setOrders(data.length > 0 ? data : MOCK_ORDERS);
      } catch (err) {
        toast.error('Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filtered = orders.filter(o =>
    (statusFilter === 'all' || o.status === statusFilter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) ||
     o.customer.toLowerCase().includes(search.toLowerCase()) ||
     o.city.toLowerCase().includes(search.toLowerCase()))
  );

  // ── Status update with cancel confirmation ─────────────────────────────────
  const updateStatus = async (id: string, status: OrderStatus) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      if (!confirm(`Cancel order #${id} for ${order.customer}?\nThis action cannot be reversed.`)) return;
    }

    try {
      await api.orders.updateStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      toast.success(`Order #${id} → ${status}`);
      if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status } : null);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalRevenue = orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.amount, 0);
  const statusCounts = (['all', ...STATUS_FLOW, 'Cancelled'] as const).reduce((acc, s) => {
    acc[s] = s === 'all' ? orders.length : orders.filter(o => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0D1117]">Orders</h2>
          <p className="text-sm text-[#8B9BAD]">Track and manage all customer orders</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders',   value: orders.length,                                              color: '#0A66FF', bg: '#EEF4FF', icon: Package },
          { label: 'In Transit',     value: orders.filter(o => o.status === 'Shipped').length,          color: '#8B5CF6', bg: '#F3E8FF', icon: Truck },
          { label: 'Delivered',      value: orders.filter(o => o.status === 'Delivered').length,        color: '#10B981', bg: '#ECFDF5', icon: CheckCircle },
          { label: 'Total Revenue',  value: `₹${(totalRevenue / 1000).toFixed(1)}k`,                   color: '#F59E0B', bg: '#FFFBEB', icon: IndianRupee },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-[#5A6472] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', ...STATUS_FLOW, 'Cancelled'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              statusFilter === s
                ? 'bg-[#0A66FF] text-white shadow-sm'
                : 'bg-white border border-[#E5EBF4] text-[#5A6472] hover:border-[#0A66FF] hover:text-[#0A66FF]'
            }`}
          >
            {s === 'all' ? 'All' : s} <span className="opacity-70">({statusCounts[s] ?? 0})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E5EBF4] p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
          <input
            className="input-field pl-9 py-2.5 text-sm"
            placeholder="Search by order ID, customer or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table + Detail Panel */}
      <div className={`grid gap-5 ${selectedOrder ? 'lg:grid-cols-3' : 'grid-cols-1'}`}>
        <div className={`bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden ${selectedOrder ? 'lg:col-span-2' : ''}`}>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => {
                  const { badge, icon: Icon } = STATUS_CONFIG[o.status];
                  return (
                    <tr key={o.id} className={selectedOrder?.id === o.id ? 'bg-[#EEF4FF]' : ''}>
                      <td>
                        <p className="font-bold text-[#0A66FF] text-xs font-mono">#{o.id}</p>
                        <p className="text-[10px] text-[#8B9BAD]">{o.city}</p>
                      </td>
                      <td>
                        <p className="text-sm font-semibold">{o.customer}</p>
                        <p className="text-[10px] text-[#8B9BAD]">{o.email}</p>
                      </td>
                      <td className="text-sm max-w-[140px] truncate">{o.product}</td>
                      <td className="font-bold text-sm">₹{o.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${badge} text-xs flex items-center gap-1 w-fit`}>
                          <Icon size={10} />
                          {o.status}
                        </span>
                      </td>
                      <td className="text-xs text-[#5A6472]">
                        {new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td>
                        <button
                          onClick={() => setSelectedOrder(selectedOrder?.id === o.id ? null : o)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            selectedOrder?.id === o.id
                              ? 'bg-[#0A66FF] text-white'
                              : 'bg-[#F8FAFD] text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF]'
                          }`}
                          title={selectedOrder?.id === o.id ? 'Close detail' : 'View detail'}
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-[#8B9BAD]">
                      <Package size={40} strokeWidth={1} className="mx-auto mb-3 opacity-50" />
                      <p>No orders match your search.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-4 py-3 bg-[#F8FAFD] border-t border-[#E5EBF4] text-xs text-[#8B9BAD]">
              Showing <span className="font-bold text-[#0D1117]">{filtered.length}</span> of {orders.length} orders
            </div>
          )}
        </div>

        {/* Order Detail Side Panel */}
        {selectedOrder && (
          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-5 h-fit space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#0D1117]">#{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Current status pill */}
            <div>
              <span className={`badge ${STATUS_CONFIG[selectedOrder.status].badge} text-xs`}>
                {selectedOrder.status}
              </span>
            </div>

            {/* Customer info */}
            <div className="bg-[#F8FAFD] rounded-xl p-4">
              <p className="text-[10px] font-black text-[#8B9BAD] uppercase tracking-widest mb-2">Customer</p>
              <p className="font-bold text-sm">{selectedOrder.customer}</p>
              <p className="text-xs text-[#5A6472] mt-1">{selectedOrder.email}</p>
              <p className="text-xs text-[#5A6472]">{selectedOrder.phone}</p>
              <p className="text-xs text-[#5A6472]">{selectedOrder.city}</p>
            </div>

            {/* Order details */}
            <div className="bg-[#F8FAFD] rounded-xl p-4">
              <p className="text-[10px] font-black text-[#8B9BAD] uppercase tracking-widest mb-2">Order Details</p>
              <p className="text-sm font-semibold">{selectedOrder.product}</p>
              <p className="text-xs text-[#5A6472] mt-0.5">Qty: {selectedOrder.items}</p>
              <p className="font-black text-[#0A66FF] mt-2">₹{selectedOrder.amount.toLocaleString()}</p>
            </div>

            {/* Custom User Photos */}
            {selectedOrder.customImages && selectedOrder.customImages.length > 0 && (
              <div className="bg-[#EEF4FF] rounded-xl p-4 border border-[#0A66FF]/10">
                <p className="text-[10px] font-black text-[#0A66FF] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle size={10} /> User Uploads ({selectedOrder.customImages.length})
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedOrder.customImages.map((img, i) => (
                    <a 
                      key={i} 
                      href={img} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative aspect-square rounded-lg overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform group"
                    >
                      <Image src={img} alt={`Upload ${i+1}`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye size={16} className="text-white" />
                      </div>
                    </a>
                  ))}
                </div>
                <p className="text-[9px] text-blue-400 mt-3 font-medium italic">Click to view/download high-res version</p>
              </div>
            )}

            {/* Status update */}
            <div>
              <p className="text-[10px] font-black text-[#8B9BAD] uppercase tracking-widest mb-3">Update Status</p>
              <div className="flex flex-col gap-2">
                {STATUS_FLOW.map(s => {
                  const Icon = STATUS_CONFIG[s].icon;
                  return (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedOrder.id, s)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        selectedOrder.status === s
                          ? 'border-[#0A66FF] bg-[#EEF4FF] text-[#0A66FF]'
                          : 'border-[#E5EBF4] text-[#5A6472] hover:border-[#0A66FF]/40 hover:bg-[#F8FAFD]'
                      }`}
                    >
                      <Icon size={14} />
                      {s}
                      {selectedOrder.status === s && <span className="ml-auto text-[10px] font-black uppercase tracking-wider opacity-60">Current</span>}
                    </button>
                  );
                })}
                <button
                  onClick={() => updateStatus(selectedOrder.id, 'Cancelled')}
                  disabled={selectedOrder.status === 'Delivered'}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    selectedOrder.status === 'Cancelled'
                      ? 'border-red-400 bg-red-50 text-red-500'
                      : 'border-[#E5EBF4] text-red-400 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  <XCircle size={14} />
                  Cancel Order
                  {selectedOrder.status === 'Cancelled' && <span className="ml-auto text-[10px] font-black uppercase tracking-wider opacity-60">Current</span>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
