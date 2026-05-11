'use client';
import { useState } from 'react';
import NextImage from 'next/image';
import { Plus, Image as ImageIcon, FileText, Star, Trash2, Edit2, Upload } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';
import toast from 'react-hot-toast';

const BANNERS = [
  { id: 1, title: 'Summer Sale – 25% Off', subtitle: 'On all wall art', active: true, img: 'https://picsum.photos/seed/banner1/400/100' },
  { id: 2, title: 'New Collection: Religious Art', subtitle: 'Handcrafted devotional pieces', active: true, img: 'https://picsum.photos/seed/banner2/400/100' },
  { id: 3, title: 'Free Shipping on ₹1999+', subtitle: 'Limited time offer', active: false, img: 'https://picsum.photos/seed/banner3/400/100' },
];

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'banners' | 'testimonials'>('banners');
  const [banners, setBanners] = useState(BANNERS);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);

  const toggleBanner = (id: number) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
    toast.success('Banner status updated');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Content Management</h2>
          <p className="text-sm text-[#5A6472]">Manage homepage banners and testimonials</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-xl border border-[#E5EBF4] p-1 w-fit">
        {(['banners', 'testimonials'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === t ? 'bg-[#0A66FF] text-white' : 'text-[#5A6472] hover:text-[#0D1117]'}`}>
            {t === 'banners' ? '🖼️ Banners' : '⭐ Testimonials'}
          </button>
        ))}
      </div>

      {activeTab === 'banners' && (
        <div className="space-y-4">
          <button className="btn-primary gap-2"><Upload size={16} /> Upload New Banner</button>
          {banners.map(b => (
            <div key={b.id} className={`bg-white rounded-2xl border-2 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all ${b.active ? 'border-[#E5EBF4]' : 'border-dashed border-[#E5EBF4] opacity-60'}`}>
              <div className="relative w-full sm:w-40 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <NextImage src={b.img} alt={b.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{b.title}</p>
                <p className="text-sm text-[#5A6472]">{b.subtitle}</p>
                <span className={`badge text-xs mt-2 ${b.active ? 'badge-green' : 'badge-red'}`}>{b.active ? 'Live' : 'Hidden'}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleBanner(b.id)} className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${b.active ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
                  {b.active ? 'Hide' : 'Show'}
                </button>
                <button className="w-9 h-9 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all"><Edit2 size={14} /></button>
                <button onClick={() => { setBanners(prev => prev.filter(bb => bb.id !== b.id)); toast.success('Banner deleted'); }} className="w-9 h-9 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'testimonials' && (
        <div className="space-y-4">
          <button className="btn-primary gap-2"><Plus size={16} /> Add Testimonial</button>
          {testimonials.map(t => (
            <div key={t.id} className="bg-white rounded-2xl border border-[#E5EBF4] p-5 flex flex-col sm:flex-row items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <NextImage src={t.avatar} alt={t.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-sm">{t.name}</p>
                  <span className="text-xs text-[#5A6472]">· {t.city}</span>
                  <div className="flex gap-0.5 ml-2">
                    {[...Array(t.rating)].map((_, i) => <span key={i} className="text-[#F59E0B] text-xs">★</span>)}
                  </div>
                </div>
                <p className="text-sm text-[#5A6472] leading-relaxed">"{t.text}"</p>
                <p className="text-xs text-[#0A66FF] mt-1">{t.product}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="w-9 h-9 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all"><Edit2 size={14} /></button>
                <button onClick={() => { setTestimonials(prev => prev.filter(tt => tt.id !== t.id)); toast.success('Removed'); }} className="w-9 h-9 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
