'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw, ChevronRight, Plus, Minus, ZoomIn, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import toast from 'react-hot-toast';

const REVIEWS = [
  { id: 1, name: 'Pooja M.', rating: 5, date: '2024-03-10', text: 'Absolutely beautiful! The quality is amazing and the colors are vibrant. Exceeded my expectations.', verified: true },
  { id: 2, name: 'Amit R.', rating: 4, date: '2024-02-28', text: 'Great artwork, arrived well-packaged. The size was perfect for my wall. Will order again.', verified: true },
  { id: 3, name: 'Kavita S.', rating: 5, date: '2024-02-15', text: 'Ordered the custom portrait and it was just stunning. Every detail was captured perfectly!', verified: true },
];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useStore();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [customText, setCustomText] = useState('');
  const [zoom, setZoom] = useState(false);

  if (!product) return (
    <div className="container py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      <Link href="/shop" className="btn-primary">Back to Shop</Link>
    </div>
  );

  const isWishlisted = wishlist.includes(product.id);
  const price = product.variants ? product.variants[selectedVariant].price : product.price;
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({ ...product, price }, qty, product.variants?.[selectedVariant].size, customText || undefined);
    toast.success('Added to cart!', { style: { borderRadius: '12px', background: '#0D1117', color: '#fff' } });
    setCartOpen(true);
  };

  const avgRating = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFD] border-b border-[#E5EBF4] mb-8">
        <div className="container py-4">
          <nav className="breadcrumb text-sm">
            <Link href="/" className="hover:text-[#0A66FF] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#8B9BAD]" />
            <Link href="/shop" className="hover:text-[#0A66FF] transition-colors">Shop</Link>
            <ChevronRight size={14} className="text-[#8B9BAD]" />
            <Link href={`/shop?category=${product.category}`} className="capitalize hover:text-[#0A66FF] transition-colors">{product.category.replace('-', ' ')}</Link>
            <ChevronRight size={14} className="text-[#8B9BAD]" />
            <span className="text-[#0D1117] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 cursor-zoom-in" onClick={() => setZoom(!zoom)}>
              <img src={product.images[activeImg]} alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${zoom ? 'scale-150' : 'scale-100'}`} />
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-md">
                <ZoomIn size={18} className="text-[#5A6472]" />
              </button>
              {product.discount && (
                <div className="absolute top-4 left-4 badge badge-red text-sm">-{product.discount}% OFF</div>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${activeImg === i ? 'border-[#0A66FF]' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <span className="badge badge-blue capitalize">{product.category.replace('-', ' ')}</span>
              {product.isBestSeller && <span className="badge badge-green">Bestseller</span>}
            </div>

            <h1 className="text-3xl font-black text-[#0D1117] mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(avgRating) ? '#F59E0B' : 'none'} stroke={i < Math.floor(avgRating) ? '#F59E0B' : '#D1D5DB'} />
                ))}
              </div>
              <span className="font-semibold text-[#0D1117]">{avgRating.toFixed(1)}</span>
              <span className="text-[#8B9BAD] text-sm">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-black text-[#0D1117]">₹{price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-[#8B9BAD] line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount && (
                <span className="badge badge-red">Save {product.discount}%</span>
              )}
            </div>

            <p className="text-[#5A6472] leading-relaxed mb-6">{product.description}</p>

            {/* Variants */}
            {product.variants && (
              <div className="mb-6">
                <p className="font-semibold text-sm mb-3">
                  Size: <span className="text-[#0A66FF]">{product.variants[selectedVariant].size}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button key={i} onClick={() => setSelectedVariant(i)}
                      className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${selectedVariant === i ? 'border-[#0A66FF] bg-[#EEF4FF] text-[#0A66FF]' : 'border-[#E5EBF4] text-[#5A6472] hover:border-[#0A66FF]'}`}>
                      {v.size} — ₹{v.price.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization */}
            {product.customizable && (
              <div className="mb-6 p-4 bg-[#EEF4FF] rounded-2xl border border-[#0A66FF]/20">
                <p className="font-semibold text-sm text-[#0A66FF] mb-2 flex items-center gap-2">
                  <MessageSquare size={14} /> Personalization Details
                </p>
                <textarea
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="E.g. Names, dates, special message or upload instructions..."
                  className="input-field min-h-[80px] resize-none text-sm"
                  rows={3}
                />
                <p className="text-xs text-[#5A6472] mt-2">📸 Share your photo via WhatsApp after ordering</p>
              </div>
            )}

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <p className="font-semibold text-sm">Quantity:</p>
              <div className="flex items-center border-2 border-[#E5EBF4] rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-[#EEF4FF] transition-all text-[#5A6472]">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-[#EEF4FF] transition-all text-[#5A6472]">
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-sm text-[#8B9BAD]">
                Total: <strong className="text-[#0D1117]">₹{(price * qty).toLocaleString()}</strong>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={handleAddToCart} className="btn-primary flex-1 justify-center py-4 text-base">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <Link href="/checkout" onClick={handleAddToCart} className="btn-secondary flex-1 justify-center py-4 text-base text-center">
                Buy Now — ₹{(price * qty).toLocaleString()}
              </Link>
              <button onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 shrink-0 rounded-2xl border-2 flex items-center justify-center transition-all ${isWishlisted ? 'border-red-300 bg-red-50 text-red-500' : 'border-[#E5EBF4] text-[#5A6472] hover:border-red-300 hover:text-red-500'}`}>
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'Above ₹1999' },
                { icon: Shield, label: 'Secure Payment', sub: '100% Protected' },
                { icon: RefreshCw, label: 'Easy Returns', sub: '7-Day Policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 bg-[#F8FAFD] rounded-xl border border-[#E5EBF4] text-center">
                  <Icon size={20} className="text-[#0A66FF]" />
                  <div>
                    <p className="font-semibold text-sm">{label}</p>
                    <p className="text-xs text-[#8B9BAD] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16 pt-12 border-t border-[#E5EBF4]">
          <h2 className="text-2xl font-bold text-[#0D1117] mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#EEF4FF] rounded-2xl p-6 text-center">
              <p className="text-6xl font-black text-[#0A66FF] mb-2">{avgRating.toFixed(1)}</p>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.round(avgRating) ? '#F59E0B' : 'none'} stroke={i < Math.round(avgRating) ? '#F59E0B' : '#D1D5DB'} />
                ))}
              </div>
              <p className="text-[#5A6472] text-sm">{product.reviews} total reviews</p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-4">
              {REVIEWS.map(r => (
                <div key={r.id} className="p-5 bg-white rounded-2xl border border-[#E5EBF4]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] flex items-center justify-center text-white font-bold text-sm">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{r.name}</p>
                        {r.verified && <p className="text-[10px] text-green-500 font-medium">✓ Verified Purchase</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#F59E0B" stroke="#F59E0B" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#5A6472] leading-relaxed">{r.text}</p>
                  <p className="text-xs text-[#8B9BAD] mt-2">{new Date(r.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E5EBF4]">
            <h2 className="text-2xl font-bold text-[#0D1117] mb-8">You May Also Like</h2>
            <div className="products-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
