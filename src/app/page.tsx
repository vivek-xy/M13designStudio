'use client';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Truck, RefreshCw, Headphones, Sparkles, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, BLOG_POSTS } from '@/lib/data';

const HERO_SLIDES = [
  { tag: 'New Collection', heading: 'Transform Your Space\nWith Handcrafted Art', sub: 'Discover 500+ premium artworks crafted by skilled Indian artists. Personalized, meaningful, and made for your home.', cta: 'Shop Collection', bg: 'from-[#EEF4FF] to-[#F0F7FF]', accent: '#0A66FF' },
  { tag: 'Bestselling', heading: 'Personalized Portraits\nThat Tell Your Story', sub: 'Upload a photo and receive a stunning hand-painted or digital portrait. Perfect for gifts and memories.', cta: 'Order Custom Art', bg: 'from-[#EDF9F5] to-[#F0FFF9]', accent: '#00D4AA' },
  { tag: 'Festive Special', heading: 'Sacred Art\nFor Your Sacred Space', sub: 'Beautifully crafted religious and devotional artworks. Bless your home with divine energy and timeless beauty.', cta: 'View Religious Art', bg: 'from-[#FFF8EE] to-[#FFFBF0]', accent: '#F59E0B' },
];

const FEATURES = [
  { icon: Shield, title: '100% Authentic', desc: 'Every piece verified and quality-checked' },
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹1999 across India' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '7-day hassle-free return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Expert help whenever you need it' },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const featured = PRODUCTS.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <div>
      {/* Hero */}
      <section className={`bg-gradient-to-br ${current.bg} min-h-[90vh] flex items-center transition-all duration-700`}>
        <div className="container py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="badge badge-blue text-sm mb-4 inline-flex">{current.tag} ✨</span>
              <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6 whitespace-pre-line text-[#0D1117]">
                {current.heading.split('\n')[0]}{'\n'}
                <span className="gradient-text">{current.heading.split('\n')[1]}</span>
              </h1>
              <p className="text-[#5A6472] text-lg leading-relaxed mb-8 max-w-xl">{current.sub}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop" className="btn-primary text-base px-8 py-4">
                  {current.cta} <ArrowRight size={18} />
                </Link>
                <Link href="/categories" className="btn-secondary text-base px-8 py-4">
                  Explore All
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div>
                  <p className="font-black text-2xl text-[#0D1117]">50K+</p>
                  <p className="text-sm text-[#8B9BAD]">Happy Customers</p>
                </div>
                <div className="w-px h-10 bg-[#E5EBF4]" />
                <div>
                  <p className="font-black text-2xl text-[#0D1117]">500+</p>
                  <p className="text-sm text-[#8B9BAD]">Artworks</p>
                </div>
                <div className="w-px h-10 bg-[#E5EBF4]" />
                <div className="flex items-center gap-1">
                  <Star size={18} fill="#F59E0B" stroke="#F59E0B" />
                  <p className="font-black text-2xl text-[#0D1117]">4.9</p>
                  <p className="text-sm text-[#8B9BAD] ml-1">Rating</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                <div className="absolute top-0 right-0 w-80 h-96 rounded-3xl overflow-hidden shadow-2xl animate-float">
                  <img src={`https://picsum.photos/seed/hero${slide}a/400/500`} alt="Featured art" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 left-0 w-64 h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-white animate-float animation-delay-300">
                  <img src={`https://picsum.photos/seed/hero${slide}b/320/360`} alt="Art" className="w-full h-full object-cover" />
                </div>
                {/* Floating badge */}
                <div className="absolute top-4 left-4 glass rounded-2xl px-4 py-3 shadow-lg animate-fade-in animation-delay-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] flex items-center justify-center">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0D1117]">Handcrafted</p>
                      <p className="text-[10px] text-[#5A6472]">By Indian Artists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Slide dots */}
          <div className="flex justify-center gap-2 mt-8">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${i === slide ? 'w-8 bg-[#0A66FF]' : 'w-2 bg-[#E5EBF4]'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="bg-white border-b border-[#E5EBF4] py-8 md:py-12 relative z-10 -mt-6 mx-4 md:mx-auto max-w-7xl rounded-2xl shadow-sm border border-[#E5EBF4]">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-[#0A66FF]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0D1117] mb-1">{title}</p>
                  <p className="text-sm text-[#8B9BAD]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-pad bg-[#F8FAFD]">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue mb-3">Collections</span>
            <h2>Shop by Category</h2>
            <div className="section-divider" />
            <p>Explore our curated collections crafted with love</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} href={`/shop?category=${cat.id}`}
                className="card-hover rounded-2xl p-6 text-center flex flex-col items-center gap-3 border border-[#E5EBF4] bg-white group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                  style={{ background: cat.color }}>
                  {cat.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0D1117]">{cat.name}</p>
                  <p className="text-xs text-[#8B9BAD] mt-0.5">{cat.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Bestsellers */}
      <section className="section-pad">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="badge badge-green mb-2">Bestsellers</span>
              <h2 className="text-3xl font-bold text-[#0D1117]">Most Loved Artworks</h2>
              <div className="section-divider mx-0 mt-3" />
            </div>
            <Link href="/shop?sort=bestseller" className="hidden md:flex items-center gap-1 text-[#0A66FF] font-medium hover:gap-2 transition-all">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-8">
            <Link href="/shop" className="btn-secondary">View All Products <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mb-16">
        <div className="rounded-3xl bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <span className="badge bg-white/20 text-white mb-3">Limited Time</span>
              <h2 className="text-3xl md:text-4xl font-black mb-2">Get 25% Off Your First Order</h2>
              <p className="text-blue-100 text-lg">Use code <strong className="text-white bg-white/20 px-2 py-0.5 rounded-lg">WELCOME10</strong> at checkout</p>
            </div>
            <Link href="/shop" className="btn-secondary bg-white text-[#0A66FF] border-white hover:bg-blue-50 shrink-0 text-base px-8 py-4">
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-pad bg-[#F8FAFD]">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="badge badge-blue mb-2">Fresh</span>
              <h2 className="text-3xl font-bold text-[#0D1117]">New Arrivals</h2>
              <div className="section-divider mx-0 mt-3" />
            </div>
            <Link href="/shop?sort=newest" className="hidden md:flex items-center gap-1 text-[#0A66FF] font-medium hover:gap-2 transition-all">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-yellow mb-3">Reviews</span>
            <h2>What Our Customers Say</h2>
            <div className="section-divider" />
            <p>50,000+ happy customers across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="card-hover bg-white rounded-2xl p-6 border border-[#E5EBF4]">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />
                  ))}
                </div>
                <p className="text-[#5A6472] text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#E5EBF4]">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-[#8B9BAD]">{t.city} · {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section-pad bg-[#F8FAFD]">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="badge badge-blue mb-2">Blog</span>
              <h2 className="text-3xl font-bold text-[#0D1117]">Art & Décor Insights</h2>
              <div className="section-divider mx-0 mt-3" />
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-[#0A66FF] font-medium">
              Read All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
