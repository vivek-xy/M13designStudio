'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Truck, RefreshCw, Headphones, ChevronRight, Upload } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import HomeHero from '@/components/HomeHero';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, BLOG_POSTS } from '@/lib/data';
import { useStore } from '@/lib/store';

const FEATURES = [
  { icon: Shield, title: '100% Authentic', desc: 'Every piece verified and quality-checked' },
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹1999 across India' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '7-day hassle-free return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Expert help whenever you need it' },
];

export default function HomePage() {
  const { products, fetchProducts, categories, fetchCategories, isLoading } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (products.length === 0) fetchProducts();
      if (categories.length === 0) fetchCategories();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProducts, fetchCategories, products.length, categories.length]);

  if (!mounted) return null;

  const featured = products.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 8);

  return (
    <div className="bg-white">
      <HomeHero />

      {/* Features */}
      <section className="py-12 bg-white border-b border-[#E5EBF4]">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center shrink-0">
                  <f.icon size={22} className="text-[#0A66FF]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0D1117]">{f.title}</h3>
                  <p className="text-xs text-[#5A6472] mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#6366F1] font-black text-[10px] uppercase tracking-[0.2em]">Curated Collections</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Shop by Category</h2>
            </div>
            <Link href="/shop" className="text-slate-900 text-sm font-bold flex items-center gap-2 group">
              View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-3xl bg-slate-100 animate-pulse" />
              ))
            ) : (
              categories.slice(0, 8).map((cat) => (
                <Link 
                  key={cat.id}
                  href={`/shop?category=${cat.id}`} 
                  aria-label={`Browse ${cat.name} collection`}
                  className="group relative overflow-hidden rounded-3xl aspect-square shadow-md hover:shadow-xl transition-all"
                >
                  {/* Background Image */}
                  {cat.image ? (
                    <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ backgroundColor: cat.color }} />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-[#0D1117]/10 to-transparent" />
                  
                  <div className="relative h-full p-6 flex flex-col justify-end z-10">
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:translate-x-1 transition-transform leading-tight">{cat.name}</h3>
                      <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">Browse Art</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-pad bg-white overflow-hidden">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#0A66FF] font-black text-xs uppercase tracking-[0.2em]">Community Favorites</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">Bestselling Art</h2>
            </div>
            <Link href="/shop?sort=bestseller" className="btn-ghost group">
              View Collection <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="products-grid">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] rounded-3xl bg-slate-50 animate-pulse border border-slate-100" />
              ))
            ) : (
              featured.map(p => <ProductCard key={p.id} product={p} />)
            )}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-secondary h-12 px-8 shadow-md">View All Products <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mb-16">
        <div className="rounded-[3rem] bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] p-10 md:p-14 relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <span className="badge bg-white/20 text-white mb-4 backdrop-blur-md border-white/10 uppercase tracking-widest text-[10px] font-black">Collector&apos;s Offer</span>
              <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">Elevate Your Space with <br />25% Off Your First Order</h2>
              <p className="text-blue-100 text-lg opacity-80">Use code <strong className="text-white bg-white/20 px-3 py-1 rounded-xl mx-1">WELCOME10</strong> at checkout</p>
            </div>
            <Link href="/shop" className="btn-secondary bg-white text-[#0A66FF] border-white hover:bg-blue-50 shrink-0 text-lg px-10 py-5 rounded-2xl shadow-xl">
              Start Shopping <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-pad bg-[#F8FAFD]">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#00D4AA] font-black text-xs uppercase tracking-[0.2em]">Fresh From The Studio</span>
              <h2 className="text-4xl font-black text-[#0D1117] mt-3">New Arrivals</h2>
            </div>
            <Link href="/shop?sort=newest" className="text-[#00D4AA] font-bold flex items-center gap-1 hover:underline text-sm uppercase tracking-widest">
              Browse New <ChevronRight size={16} />
            </Link>
          </div>
          <div className="products-grid">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] rounded-3xl bg-white animate-pulse border border-slate-100" />
              ))
            ) : (
              newArrivals.map(p => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#F59E0B] font-black text-xs uppercase tracking-[0.2em]">Wall Of Love</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0D1117] mt-4">Collector Testimonials</h2>
            <div className="w-20 h-1.5 bg-[#F59E0B] mx-auto mt-6 rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-white p-8 rounded-3xl border border-[#F0F4F8] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-[#5A6472] leading-relaxed mb-8 italic flex-1">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-[#F0F4F8]">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-sm shrink-0">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0D1117]">{t.name}</p>
                    <p className="text-[10px] text-[#8B9BAD] font-bold uppercase tracking-widest">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Art Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container">
          <div className="bg-[#0D1117] rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0A66FF] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00D4AA] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2" />

            {/* Left Content */}
            <div className="relative z-10 flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00D4AA] text-[10px] font-black uppercase tracking-[0.2em] mb-6">Unique To You</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
                Turn Your Memories <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A66FF] to-[#4D8FFF]">Into Masterpieces</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Upload your favorite photos and let our expert artists transform them into breathtaking custom portraits, hand-painted canvases, or digital masterpieces.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: Upload, title: 'Upload', desc: 'Share your photos' },
                  { icon: Star, title: 'Craft', desc: 'Expertly refined' },
                  { icon: Truck, title: 'Deliver', desc: 'To your doorstep' },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start gap-3 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                      <step.icon size={18} className="text-[#0A66FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{step.title}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/shop?category=personalized" className="btn-primary bg-[#0A66FF] border-[#0A66FF] hover:bg-[#0052D1] text-white h-16 px-10 text-lg rounded-2xl shadow-xl shadow-blue-900/20">
                Start Your Custom Order <ArrowRight size={20} />
              </Link>
            </div>

            {/* Right Visuals */}
            <div className="relative z-10 flex-1 w-full lg:max-w-md">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                <Image 
                  src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop" 
                  alt="Custom Art Preview" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-white overflow-hidden shrink-0">
                      <Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100" alt="Reference" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Before & After</p>
                      <p className="text-xs font-bold text-white italic">"The likeness is uncanny!"</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-3xl overflow-hidden shadow-2xl -rotate-6 border-4 border-white/10 animate-float">
                <Image src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400" alt="Art Detail" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white py-4 px-6 rounded-2xl shadow-2xl animate-float-slow">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-[#0D1117] uppercase tracking-widest">500+ Ordered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / News */}
      <section className="section-pad bg-[#F8FAFD]">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#0A66FF] font-black text-xs uppercase tracking-[0.2em]">Design Insights</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0D1117] mt-4">The Art Journal</h2>
            </div>
            <Link href="/blog" className="text-sm font-bold text-[#0A66FF] hover:underline uppercase tracking-widest">Visit Blog</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {BLOG_POSTS.map(post => (
              <article key={post.id} className="group cursor-pointer">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-lg transition-transform group-hover:scale-[1.02]">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-[#0D1117] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">{post.category}</span>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-black text-[#0D1117] mb-4 group-hover:text-[#0A66FF] transition-colors leading-tight">{post.title}</h3>
                  <p className="text-[#5A6472] leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-[#8B9BAD] uppercase tracking-[0.2em]">
                    <span>{post.date}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E5EBF4]" />
                    <span>{post.readTime} Read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
