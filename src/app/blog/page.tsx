'use client';
import { BLOG_POSTS } from '@/lib/data';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFD] py-16 text-center">
        <span className="badge badge-blue mb-3">Insights</span>
        <h1 className="text-4xl font-black text-[#0D1117] mb-3">Art & Décor Blog</h1>
        <p className="text-[#5A6472]">Expert tips, inspiration, and stories from the world of art</p>
      </div>
      <div className="container py-16">
        {/* Featured */}
        <div className="mb-16">
          <Link href={`/blog/1`} className="group grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden border border-[#E5EBF4] card-hover">
            <div className="aspect-video md:aspect-auto overflow-hidden">
              <img src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="badge badge-blue mb-3">{BLOG_POSTS[0].category}</span>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[#0A66FF] transition-colors">{BLOG_POSTS[0].title}</h2>
              <p className="text-[#5A6472] mb-5">{BLOG_POSTS[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-[#8B9BAD]">
                <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(BLOG_POSTS[0].date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{BLOG_POSTS[0].readTime} read</span>
              </div>
              <div className="mt-5 flex items-center gap-2 text-[#0A66FF] font-medium">Read Article <ArrowRight size={16} /></div>
            </div>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map(post => (
            <Link key={post.id} href={`/blog/${post.id}`} className="card-hover bg-white rounded-2xl overflow-hidden border border-[#E5EBF4] group">
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-blue text-xs">{post.category}</span>
                  <span className="text-xs text-[#8B9BAD]">{post.readTime} read</span>
                </div>
                <h3 className="font-bold text-[#0D1117] mb-2 group-hover:text-[#0A66FF] transition-colors">{post.title}</h3>
                <p className="text-sm text-[#5A6472] line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-[#8B9BAD] mt-3">{new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
