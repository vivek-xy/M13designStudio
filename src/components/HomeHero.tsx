'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_SLIDES = [
  { 
    tag: 'New Collection', 
    heading: 'Transform Your Space\nWith Handcrafted Art', 
    sub: 'Discover 500+ premium artworks crafted by skilled Indian artists. Personalized, meaningful, and made for your home.', 
    cta: 'Shop Collection', 
    bg: 'from-[#F0F5FF] to-[#E2E8F0]', 
    accent: '#0A66FF',
    img: 'https://picsum.photos/seed/hero1/800/1000'
  },
  { 
    tag: 'Bestselling', 
    heading: 'Personalized Portraits\nThat Tell Your Story', 
    sub: 'Upload a photo and receive a stunning hand-painted or digital portrait. Perfect for gifts and memories.', 
    cta: 'Order Custom Art', 
    bg: 'from-[#F1F5F9] to-[#F8FAFC]', 
    accent: '#6366F1',
    img: 'https://picsum.photos/seed/hero2/800/1000'
  },
  { 
    tag: 'Festive Special', 
    heading: 'Sacred Art\nFor Your Sacred Space', 
    sub: 'Beautifully crafted religious and devotional artworks. Bless your home with divine energy and timeless beauty.', 
    cta: 'View Religious Art', 
    bg: 'from-[#FFFBF0] to-[#F59E0B05]', 
    accent: '#F59E0B',
    img: 'https://picsum.photos/seed/hero3/800/1000'
  },
];

export default function HomeHero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${current.bg}`}
        />
      </AnimatePresence>

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            key={`content-${slide}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-md border border-white shadow-sm mb-6">
              <Sparkles size={14} className="text-[#0A66FF]" />
              <span className="text-xs font-bold tracking-wider uppercase text-[#0A66FF]">{current.tag}</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 whitespace-pre-line text-[#0F172A]">
              {current.heading.split('\n')[0]}{'\n'}
              <span className="gradient-text">{current.heading.split('\n')[1]}</span>
            </h1>
            
            <p className="text-[#475569] text-xl leading-relaxed mb-10 max-w-xl">
              {current.sub}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary text-lg px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {current.cta} <ArrowRight size={20} />
              </Link>
              <Link href="/categories" className="btn-secondary text-lg px-10 py-5 rounded-2xl bg-white/50 backdrop-blur-md border-white/80 hover:bg-white transition-all duration-300">
                Browse Categories
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm font-medium text-[#64748B]">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <p>Trusted by <span className="text-[#0F172A] font-bold">10k+</span> art lovers across India</p>
            </div>
          </motion.div>

          <div className="relative hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${slide}`}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white/50 backdrop-blur-sm aspect-[4/5]">
                  <Image src={current.img} alt="Art" fill className="object-cover" priority />
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -left-10 glass p-5 rounded-2xl shadow-xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Handmade</p>
                      <p className="text-sm font-black text-slate-900">100% Authentic</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 glass p-5 rounded-2xl shadow-xl z-20"
                >
                  <p className="text-2xl font-black text-[#0A66FF]">4.9/5</p>
                  <p className="text-xs font-bold text-slate-500">Artist Rating</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
      
      {/* Slider indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${slide === i ? 'w-10 bg-[#0A66FF]' : 'w-2 bg-[#0A66FF]/20 hover:bg-[#0A66FF]/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
