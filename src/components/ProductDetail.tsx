'use client';
import { useState, useEffect } from 'react';
import { 
  Star, Heart, ShoppingCart, Truck, Shield, RefreshCw, 
  ChevronRight, Plus, Minus, ZoomIn, Share2, MessageCircle, 
  Check, Info, Package, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

const REVIEWS = [
  { id: 1, name: 'Pooja M.', rating: 5, date: '2024-03-10', text: 'Absolutely beautiful! The quality is amazing and the colors are vibrant. Exceeded my expectations.', verified: true },
  { id: 2, name: 'Amit R.', rating: 4, date: '2024-02-28', text: 'Great artwork, arrived well-packaged. The size was perfect for my wall. Will order again.', verified: true },
  { id: 3, name: 'Kavita S.', rating: 5, date: '2024-02-15', text: 'Stunning collection. Every piece I have ordered so far has been museum-grade quality.', verified: true },
];

export default function ProductDetail({ product, related }: ProductDetailProps) {
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useStore();

  const [mounted, setMounted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [customPhotos, setCustomPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'shipping' | 'care'>('description');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isWishlisted = mounted && wishlist.includes(product.id);
  const price = product.variants?.[selectedVariant]?.price || product.price;
  const originalPrice = product.originalPrice || (price * 1.3); // Fallback for UI demo
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleAddToCart = () => {
    if (product.customizable && (customPhotos.length < (product.customPhotoCount || 0))) {
      toast.error(`Please upload all ${product.customPhotoCount} required photos`);
      return;
    }

    addToCart({ ...product, price }, qty, product.variants?.[selectedVariant]?.size, undefined, customPhotos);
    toast.success('Added to collection!', {
      icon: '🛍️',
      style: { borderRadius: '12px', background: '#0D1117', color: '#fff' }
    });
    setCartOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi M13 Design Studio, I'm interested in "${product.name}" (${product.variants?.[selectedVariant]?.size || 'Standard Size'}). Price: ₹${price}. Please let me know how to proceed.`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb - Slimmer & Darker */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-slate-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Column: Visuals (Sticky) */}
          <div className="flex-1 lg:max-w-[600px]">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl group border border-slate-200">
                <Image 
                  src={product.images[activeImg]} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {product.isBestSeller && (
                    <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Bestseller</span>
                  )}
                  {product.isNew && (
                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">New Arrival</span>
                  )}
                </div>
                <button 
                  onClick={handleShare}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-xl"
                >
                  <Share2 size={20} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImg(i)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${activeImg === i ? 'border-blue-600 scale-95 shadow-inner' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-md">
                  {product.category.replace(/-/g, ' ')}
                </span>
                <div className="flex items-center gap-1.5 text-orange-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-black">{product.rating}</span>
                  <span className="text-slate-400 text-xs font-medium">({product.reviews} Reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{price.toLocaleString()}</span>
                <span className="text-xl text-slate-400 line-through font-medium">₹{originalPrice.toLocaleString()}</span>
                <span className="text-sm font-black text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-tighter">{discount}% OFF</span>
              </div>
            </div>

            {/* Selection Sections */}
            <div className="space-y-6">
              {/* Variants */}
              {product.variants && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Available Sizes</label>
                    <button className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1 hover:underline">
                      <Info size={12} /> Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((v, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSelectedVariant(i)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${
                          selectedVariant === i 
                            ? 'border-blue-600 bg-blue-50/50' 
                            : 'border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <p className={`text-sm font-black ${selectedVariant === i ? 'text-blue-700' : 'text-slate-800'}`}>{v.size}</p>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">₹{v.price.toLocaleString()}</p>
                        {selectedVariant === i && (
                          <div className="absolute top-2 right-2">
                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <Check size={10} className="text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Customization: Photo Uploads */}
              {product.customizable && product.customPhotoCount && product.customPhotoCount > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Personalize Your Art</label>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      Requires {product.customPhotoCount} Photo{product.customPhotoCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[...Array(product.customPhotoCount)].map((_, i) => (
                      <div key={i} className={`relative aspect-square rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group ${customPhotos[i] ? 'border-green-400 bg-green-50/20' : 'border-blue-100 bg-blue-50/20 hover:border-blue-400'}`}>
                        {customPhotos[i] ? (
                          <>
                            <Image src={customPhotos[i]} alt="Upload" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button onClick={(e) => { e.stopPropagation(); setCustomPhotos(prev => prev.filter((_, idx) => idx !== i)); }} className="w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center shadow-lg"><Plus size={16} className="rotate-45" /></button>
                            </div>
                          </>
                        ) : (
                          <>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                              disabled={isUploading !== null}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setIsUploading(i);
                                  try {
                                    const url = await api.storage.upload(file);
                                    setCustomPhotos(prev => {
                                      const next = [...prev];
                                      next[i] = url;
                                      return next;
                                    });
                                    toast.success(`Photo ${i + 1} ready!`);
                                  } catch (err) {
                                    toast.error('Upload failed');
                                  } finally {
                                    setIsUploading(null);
                                  }
                                }
                              }}
                            />
                            <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center pointer-events-none group-hover:scale-105 transition-transform duration-300">
                              {isUploading === i ? (
                                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
                              ) : (
                                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-2 shadow-sm">
                                  <Plus size={20} />
                                </div>
                              )}
                              <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.1em] leading-tight">
                                {isUploading === i ? 'Uploading...' : `Upload Photo ${i + 1}`}
                              </p>
                              <p className="text-[8px] text-blue-300 mt-1 font-bold uppercase">Tap to browse</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 italic">High resolution photos (JPG/PNG) work best for museum-quality results.</p>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Order Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1.5 shadow-inner">
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-500 disabled:opacity-30"
                      disabled={qty <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-black text-lg text-slate-900">{qty}</span>
                    <button 
                      onClick={() => setQty(qty + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-500"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="text-slate-900">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Subtotal</span>
                    <span className="text-xl font-black">₹{(price * qty).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-[2] bg-slate-900 text-white h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200"
              >
                <ShoppingCart size={22} /> Add to Collection
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 h-16 rounded-2xl border-2 flex items-center justify-center transition-all ${
                  isWishlisted 
                    ? 'border-red-500 bg-red-50 text-red-500 shadow-inner' 
                    : 'border-slate-100 text-slate-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* WhatsApp Integration */}
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full h-16 rounded-2xl border-2 border-[#25D366]/20 bg-[#25D366]/5 text-[#075E54] font-black flex items-center justify-center gap-3 hover:bg-[#25D366]/10 transition-all"
            >
              <MessageCircle size={22} /> Order via WhatsApp
            </button>

            {/* Info Tabs */}
            <div className="pt-6">
              <div className="flex gap-8 border-b border-slate-100 mb-6">
                {(['description', 'shipping', 'care'] as const).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-in fade-in slide-in-from-left-2" />
                    )}
                  </button>
                ))}
              </div>
              <div className="text-sm leading-relaxed text-slate-500 animate-in fade-in duration-500">
                {activeTab === 'description' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <ul className="grid grid-cols-2 gap-y-2 mt-4">
                      {['Premium Canvas', 'Fade-resistant Inks', 'Museum Quality', 'Hand-finished'].map(feat => (
                        <li key={feat} className="flex items-center gap-2 text-[12px] font-bold text-slate-700">
                          <Check size={14} className="text-green-500" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Truck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-900 mb-0.5">Free Premium Shipping</p>
                        <p>Orders above ₹1,999 qualify for free door-step delivery across India. Dispatch within 48 hours.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-900 mb-0.5">Safe Arrival Guarantee</p>
                        <p>Multi-layer shockproof packaging ensures your art arrives in pristine condition.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-2">
                    <p>• Avoid direct sunlight to prevent color fading over decades.</p>
                    <p>• Use a soft, dry micro-fiber cloth for dusting.</p>
                    <p>• Keep away from high humidity areas like bathrooms.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-3 gap-3 pt-8 border-t border-slate-100">
              {[
                { icon: Package, label: 'Secured' },
                { icon: Shield, label: 'Authentic' },
                { icon: RefreshCw, label: '7-Day Return' }
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <b.icon size={18} className="text-slate-400 mb-2" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section - Modernized */}
        <section className="mt-24 pt-20 border-t border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Collectors Feedback</h2>
              <p className="text-slate-400 font-medium italic">Join 5,000+ happy art collectors across the globe.</p>
            </div>
            <div className="flex items-center gap-6 bg-slate-900 text-white px-8 py-6 rounded-[2rem] shadow-2xl">
              <div className="text-center">
                <p className="text-4xl font-black leading-none">4.8</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Average</p>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />)}
                </div>
                <p className="text-xs font-bold text-slate-400">{product.reviews} Global Reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map(r => (
              <div key={r.id} className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-100 hover:shadow-2xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{r.name}</p>
                      <div className="flex items-center gap-1 text-[10px] text-green-500 font-black uppercase tracking-widest">
                        <Shield size={10} fill="currentColor" /> Verified
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < r.rating ? "#F59E0B" : "none"} stroke={i < r.rating ? "#F59E0B" : "#cbd5e1"} />)}
                  </div>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">"{r.text}"</p>
                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  <span>Collector Since 2023</span>
                  <span className="text-slate-400">{new Date(r.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related - Modern Carousel Grid */}
        {related.length > 0 && (
          <section className="mt-24 pt-20 border-t border-slate-100">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Complete the Vibe</h2>
                <p className="text-slate-400 font-medium">Pieces that pair perfectly with this artwork.</p>
              </div>
              <Link href="/shop" className="group flex items-center gap-2 text-sm font-black text-blue-600 uppercase tracking-widest transition-all">
                Explore Full Gallery <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Mobile Bar - Optional Implementation Idea */}
      <div className="lg:hidden sticky bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 flex items-center justify-between gap-4 z-50">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Size</p>
          <p className="font-black text-slate-900">₹{price.toLocaleString()}</p>
        </div>
        <button 
          onClick={handleAddToCart}
          className="bg-slate-900 text-white px-8 h-12 rounded-xl font-black text-sm flex items-center gap-2"
        >
          <ShoppingCart size={16} /> Add
        </button>
      </div>
    </div>
  );
}
