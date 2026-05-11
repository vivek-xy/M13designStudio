'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Search, Edit2, Trash2, Calendar, X, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import toast from 'react-hot-toast';

interface BlogPost {
  id: number; title: string; excerpt: string;
  image: string; category: string; date: string; readTime: string;
  status: 'published' | 'draft';
}

import { api } from '@/lib/api';

const BLOG_CATEGORIES = ['Interior Design', 'Gift Guide', 'Culture', 'Art Tips', 'Behind the Scenes', 'Artist Spotlight'];

const EMPTY_FORM = { title: '', excerpt: '', category: '', readTime: '5 min', status: 'draft' as 'published' | 'draft', image: '' };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await api.blog.list();
        setPosts(data.map(p => ({ ...p, status: 'published' as const })));
      } catch (err) {
        toast.error('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      readTime: post.readTime,
      status: post.status,
      image: post.image,
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingPost(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }

    if (editingPost) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...form } : p));
      toast.success('Article updated!');
    } else {
      const newPost: BlogPost = {
        id: Date.now(),
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        category: form.category || 'Uncategorized',
        readTime: form.readTime,
        status: form.status,
        date: new Date().toISOString().split('T')[0],
        image: form.image || `https://picsum.photos/seed/blog${Date.now()}/800/450`,
      };
      setPosts(prev => [newPost, ...prev]);
      toast.success(`"${newPost.title}" ${newPost.status === 'published' ? 'published!' : 'saved as draft!'}`);
    }
    handleClose();
  };

  const handleDelete = (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"?`)) return;
    setPosts(prev => prev.filter(p => p.id !== post.id));
    toast.success('Article deleted');
  };

  const toggleStatus = (post: BlogPost) => {
    const next = post.status === 'published' ? 'draft' : 'published';
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: next } : p));
    toast.success(`"${post.title}" ${next === 'published' ? 'published' : 'moved to drafts'}`);
  };

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0D1117]">Blog Management</h2>
          <p className="text-sm text-[#8B9BAD]">
            {publishedCount} published · {draftCount} draft{draftCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2 h-11 px-6">
          <Plus size={16} /> New Article
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E5EBF4] p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9BAD]" />
          <input
            className="input-field pl-9 py-2.5 text-sm"
            placeholder="Search articles or categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th>Date</th>
                <th>Read Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-20">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-[#0A66FF] border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs text-[#8B9BAD] font-bold uppercase tracking-widest">Fetching Articles...</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <Image src={p.image} alt="" fill className="object-cover" />
                      </div>
                      <p className="font-semibold text-sm truncate max-w-[220px]">{p.title}</p>
                    </div>
                  </td>
                  <td><span className="badge badge-blue text-xs">{p.category}</span></td>
                  <td>
                    <p className="text-xs text-[#5A6472] flex items-center gap-1.5">
                      <Calendar size={11} />
                      {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  <td><p className="text-xs text-[#5A6472]">{p.readTime}</p></td>
                  <td>
                    <button
                      onClick={() => toggleStatus(p)}
                      className={`badge text-xs cursor-pointer hover:opacity-80 transition-opacity ${p.status === 'published' ? 'badge-green' : 'badge-yellow'}`}
                      title={`Click to ${p.status === 'published' ? 'unpublish' : 'publish'}`}
                    >
                      {p.status === 'published' ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => openEdit(p)}
                        className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all"
                        title="Edit article"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="w-8 h-8 rounded-lg bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all"
                        title="Delete article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-14 text-[#8B9BAD]">
                    <BookOpen size={36} strokeWidth={1} className="mx-auto mb-3 opacity-50" />
                    <p>No articles found.</p>
                    {search && (
                      <button onClick={() => setSearch('')} className="mt-2 text-[#0A66FF] text-sm font-bold hover:underline">
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Article Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-box max-h-[90vh] overflow-y-auto max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pt-1 pb-2 z-10 border-b border-[#F0F4F8]">
              <h3 className="font-black text-xl text-[#0D1117]">
                {editingPost ? 'Edit Article' : 'New Article'}
              </h3>
              <button onClick={handleClose} className="w-9 h-9 rounded-xl bg-[#F8FAFD] flex items-center justify-center text-[#5A6472] hover:bg-red-50 hover:text-red-500 transition-all" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Article Title *</label>
                <input
                  className="input-field py-3.5"
                  placeholder="e.g. How to Style Your Home with Art"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>

              {/* Category + Read Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Category *</label>
                  <select className="input-field py-3.5" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required>
                    <option value="">Select...</option>
                    {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Read Time</label>
                  <input className="input-field py-3.5" placeholder="5 min" value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Excerpt</label>
                <textarea
                  className="input-field py-3.5 min-h-[100px] resize-none"
                  placeholder="Brief summary of the article..."
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Cover Image URL</label>
                <input
                  className="input-field py-3.5"
                  placeholder="https://... (leave blank for auto)"
                  value={form.image}
                  onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                />
                {form.image && (
                  <div className="relative mt-2 w-full h-28 rounded-xl border border-[#E5EBF4] overflow-hidden">
                    <Image src={form.image} alt="" fill className="object-cover" />
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-black text-[#8B9BAD] uppercase tracking-[0.2em] mb-2">Publication Status</label>
                <div className="flex gap-3">
                  {(['draft', 'published'] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, status: s }))}
                      className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold capitalize transition-all ${
                        form.status === s ? 'border-[#0A66FF] bg-[#EEF4FF] text-[#0A66FF]' : 'border-[#E5EBF4] text-[#5A6472]'
                      }`}
                    >
                      {s === 'draft' ? '📝 Draft' : '🚀 Published'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-1 border-t border-[#F0F4F8]">
                <button type="button" onClick={handleClose} className="btn-ghost flex-1 justify-center py-3.5 h-auto">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center py-3.5 h-auto">
                  {editingPost ? 'Save Changes' : form.status === 'published' ? 'Publish Article' : 'Save Draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
