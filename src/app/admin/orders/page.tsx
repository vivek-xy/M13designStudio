'use client';
import { useState } from 'react';
import { Search, Eye, ChevronDown, Truck, Package, CheckCircle, XCircle, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

const ORDERS = [
  { id: 'AB240401', customer: 'Priya Sharma', email: 'priya@email.com', phone: '+91 98765 43210', product: 'Custom Portrait Painting', amount: 4999, status: 'Processing' as OrderStatus, date: '2024-04-01', city: 'Mumbai', items: 1 },
  { id: 'AB240402', customer: 'Rahul Verma', email: 'rahul@email.com', phone: '+91 87654 32109', product: 'Ganesha Mandala Canvas', amount: 2199, status: 'Shipped' as OrderStatus, date: '2024-04-01', city: 'Delhi', items: 2 },
  { id: 'AB240403', customer: 'Sneha Patel', email: 'sneha@email.com', phone: '+91 76543 21098', product: 'Custom Photo Collage Frame', amount: 1499, status: 'Delivered' as OrderStatus, date: '2024-03-31', city: 'Bangalore', items: 1 },
  { id: 'AB240404', customer: 'Aditya Kumar', email: 'aditya@email.com', phone: '+91 65432 10987', product: 'Abstract Blue Harmony', amount: 2499, status: 'Confirmed' as OrderStatus, date: '2024-03-31', city: 'Pune', items: 1 },
  { id: 'AB240405', customer: 'Kavita Rao', email: 'kavita@email.com', phone: '+91 54321 09876', product: 'Watercolor Pet Portrait', amount: 3999, status: 'Delivered' as OrderStatus, date: '2024-03-30', city: 'Chennai', items: 1 },
  { id: 'AB240406', customer: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 43210 98765', product: 'Radha Krishna Canvas', amount: 3299, status: 'Cancelled' as OrderStatus, date: '2024-03-29', city: 'Jaipur', items: 1 },
  { id: 'AB240407', customer: 'Meera Nair', email: 'meera@email.com', phone: '+91 32109 87654', product: 'Family Name Wall Art', amount: 1999, status: 'Processing' as OrderStatus, date: '2024-03-29', city: 'Kochi', items: 2 },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  Processing: 'badge-yellow', Confirmed: 'badge-blue', Shipped: 'badge-blue',
  Delivered: 'badge-green', Cancelled: 'badge-red',
};

const STATUS_FLOW: OrderStatus[] = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDERS[0] | null>(null);

  const filtered = orders.filter(o =>
    (statusFilter === 'all' || o.status === statusFilter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${id} marked as ${status}`);
    if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status } : null);
  };

  const statusCounts: Record<string, number> = { all: orders.length, ...STATUS_FLOW.reduce((acc, s) => ({ ...acc, [s]: orders.filter(o => o.status === s).length }), {} as Record<string, number>), Cancelled: orders.filter(o => o.status === 'Cancelled').length };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Orders <span className="text-[#5A6472] font-normal text-base">({filtered.length})</span></h2>
        <p className="text-sm text-[#5A6472]">Manage and track all customer orders</p>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', ...STATUS_FLOW, 'Cancelled'] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s === 'all' ? 'all' : s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === s ? 'bg-[#0A66FF] text-white' : 'bg-white border border-[#E5EBF4] text-[#5A6472] hover:border-[#0A66FF] hover:text-[#0A66FF]'}`}>
            {s === 'all' ? 'All' : s} ({statusCounts[s] ?? 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E5EBF4] p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
          <input className="input-field pl-9 py-2.5 text-sm" placeholder="Search by order ID or customer..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className={`grid gap-5 ${selectedOrder ? 'lg:grid-cols-3' : 'grid-cols-1'}`}>
        {/* Table */}
        <div className={`bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden ${selectedOrder ? 'lg:col-span-2' : ''}`}>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} className={selectedOrder?.id === o.id ? 'bg-[#EEF4FF]' : ''}>
                    <td><p className="font-bold text-[#0A66FF] text-xs">#{o.id}</p><p className="text-[10px] text-[#8B9BAD]">{o.city}</p></td>
                    <td><p className="text-sm font-medium">{o.customer}</p><p className="text-[10px] text-[#8B9BAD]">{o.email}</p></td>
                    <td className="text-sm max-w-[140px] truncate">{o.product}</td>
                    <td className="font-bold text-sm">₹{o.amount.toLocaleString()}</td>
                    <td><span className={`badge ${STATUS_COLORS[o.status]} text-xs`}>{o.status}</span></td>
                    <td className="text-xs text-[#5A6472]">{new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    <td>
                      <button onClick={() => setSelectedOrder(selectedOrder?.id === o.id ? null : o)}
                        className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Panel */}
        {selectedOrder && (
          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-5 h-fit">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold">Order #{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="w-7 h-7 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-sm text-[#5A6472]">×</button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F8FAFD] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#5A6472] mb-2">CUSTOMER</p>
                <p className="font-semibold">{selectedOrder.customer}</p>
                <p className="text-sm text-[#5A6472]">{selectedOrder.email}</p>
                <p className="text-sm text-[#5A6472]">{selectedOrder.phone}</p>
                <p className="text-sm text-[#5A6472]">{selectedOrder.city}</p>
              </div>

              <div className="bg-[#F8FAFD] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#5A6472] mb-2">ORDER DETAILS</p>
                <p className="text-sm font-medium">{selectedOrder.product}</p>
                <p className="text-sm text-[#5A6472]">Qty: {selectedOrder.items}</p>
                <p className="font-bold text-[#0A66FF] mt-1">₹{selectedOrder.amount.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#5A6472] mb-3">UPDATE STATUS</p>
                <div className="flex flex-col gap-2">
                  {STATUS_FLOW.map(s => (
                    <button key={s} onClick={() => updateStatus(selectedOrder.id, s)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${selectedOrder.status === s ? 'border-[#0A66FF] bg-[#EEF4FF] text-[#0A66FF]' : 'border-[#E5EBF4] text-[#5A6472] hover:border-[#0A66FF]/40'}`}>
                      {s === 'Processing' && <Package size={14} />}
                      {s === 'Confirmed' && <CheckCircle size={14} />}
                      {s === 'Shipped' && <Truck size={14} />}
                      {s === 'Delivered' && <CheckCircle size={14} />}
                      {s}
                    </button>
                  ))}
                  <button onClick={() => updateStatus(selectedOrder.id, 'Cancelled')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${selectedOrder.status === 'Cancelled' ? 'border-red-400 bg-red-50 text-red-500' : 'border-[#E5EBF4] text-red-400 hover:border-red-300'}`}>
                    <XCircle size={14} /> Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
