'use client';
import { useState } from 'react';
import { FileText, Plus, Search, Edit2, Trash2, Eye, Calendar, User } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import toast from 'react-hot-toast';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [search, setSearch] = useState('');

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Blog Management</h2>
          <p className="text-sm text-[#5A6472]">Create and edit your articles</p>
        </div>
        <button className="btn-primary gap-2"><Plus size={16} /> New Article</button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EBF4] p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
          <input className="input-field pl-9 py-2.5 text-sm" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Article</th><th>Category</th><th>Date</th><th>Read Time</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <p className="font-semibold text-sm truncate max-w-[200px]">{p.title}</p>
                    </div>
                  </td>
                  <td><span className="badge badge-blue text-xs">{p.category}</span></td>
                  <td><p className="text-xs text-[#5A6472] flex items-center gap-1.5"><Calendar size={11} /> {p.date}</p></td>
                  <td><p className="text-xs text-[#5A6472]">{p.readTime}</p></td>
                  <td><span className="badge badge-green text-xs">Published</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all"><Edit2 size={14} /></button>
                      <button onClick={() => { setPosts(prev => prev.filter(pp => pp.id !== p.id)); toast.success('Post deleted'); }} className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                    </div>
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
