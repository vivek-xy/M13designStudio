import { Product } from './store';

const BASE = 'https://picsum.photos/seed';

export const PRODUCTS: Product[] = [
  // Wall Art
  { id: 'wa1', name: 'Abstract Blue Harmony', price: 2499, originalPrice: 3499, discount: 29, category: 'wall-art', subcategory: 'abstract', images: [`${BASE}/art1/600/750`, `${BASE}/art1b/600/750`], rating: 4.8, reviews: 124, description: 'A stunning abstract piece with deep blue tones and fluid shapes, perfect for modern living rooms.', variants: [{ size: '12x16 inches', price: 2499 }, { size: '18x24 inches', price: 3499 }, { size: '24x36 inches', price: 5499 }], inStock: true, isNew: true, tags: ['abstract', 'modern', 'blue'] },
  { id: 'wa2', name: 'Golden Sunrise Landscape', price: 3299, originalPrice: 4299, discount: 23, category: 'wall-art', subcategory: 'landscape', images: [`${BASE}/art2/600/750`, `${BASE}/art2b/600/750`], rating: 4.6, reviews: 89, description: 'Breathtaking golden sunrise over rolling hills, printed on premium canvas.', variants: [{ size: '16x20 inches', price: 3299 }, { size: '24x30 inches', price: 5199 }], inStock: true, isBestSeller: true, tags: ['landscape', 'nature'] },
  { id: 'wa3', name: 'Minimalist Geometric Set', price: 1899, originalPrice: 2499, discount: 24, category: 'wall-art', subcategory: 'geometric', images: [`${BASE}/art3/600/750`, `${BASE}/art3b/600/750`], rating: 4.7, reviews: 203, description: 'Set of 3 minimalist geometric prints. Perfect for gallery walls.', variants: [{ size: '8x10 inches', price: 1899 }, { size: '12x16 inches', price: 2999 }], inStock: true, isBestSeller: true, tags: ['geometric', 'minimalist', 'set'] },
  { id: 'wa4', name: 'Ocean Waves Canvas', price: 2799, category: 'wall-art', subcategory: 'nature', images: [`${BASE}/art4/600/750`, `${BASE}/art4b/600/750`], rating: 4.5, reviews: 67, description: 'Serene ocean waves captured in vibrant blues and whites.', variants: [{ size: '16x20 inches', price: 2799 }, { size: '20x24 inches', price: 3999 }], inStock: true, isNew: true, tags: ['ocean', 'nature', 'blue'] },

  // Personalized
  { id: 'pe1', name: 'Custom Portrait Painting', price: 4999, originalPrice: 6499, discount: 23, category: 'personalized', subcategory: 'portrait', images: [`${BASE}/port1/600/750`, `${BASE}/port1b/600/750`], rating: 4.9, reviews: 312, description: 'Hand-painted portrait from your photo. A truly unique, heirloom-quality piece.', variants: [{ size: '12x16 inches', price: 4999 }, { size: '18x24 inches', price: 7499 }, { size: '24x36 inches', price: 10999 }], inStock: true, isBestSeller: true, customizable: true, tags: ['portrait', 'custom', 'gift'] },
  { id: 'pe2', name: 'Couple Caricature Art', price: 3499, originalPrice: 4499, discount: 22, category: 'personalized', subcategory: 'caricature', images: [`${BASE}/port2/600/750`, `${BASE}/port2b/600/750`], rating: 4.8, reviews: 178, description: 'Fun and loving caricature art for couples. Makes the perfect anniversary gift.', variants: [{ size: '12x16 inches', price: 3499 }, { size: '18x24 inches', price: 5499 }], inStock: true, customizable: true, isNew: true, tags: ['couple', 'caricature', 'gift'] },
  { id: 'pe3', name: 'Family Name Wall Art', price: 1999, originalPrice: 2799, discount: 29, category: 'personalized', subcategory: 'name-art', images: [`${BASE}/name1/600/750`, `${BASE}/name1b/600/750`], rating: 4.7, reviews: 256, description: 'Personalized family name art with custom colors and font styles.', variants: [{ size: '12x18 inches', price: 1999 }, { size: '16x24 inches', price: 2999 }], inStock: true, customizable: true, isBestSeller: true, tags: ['family', 'name', 'custom'] },
  { id: 'pe4', name: 'Watercolor Pet Portrait', price: 3999, originalPrice: 5299, discount: 25, category: 'personalized', subcategory: 'pet', images: [`${BASE}/pet1/600/750`, `${BASE}/pet1b/600/750`], rating: 4.9, reviews: 445, description: 'Beautiful watercolor portrait of your beloved pet from a photo.', variants: [{ size: '12x16 inches', price: 3999 }, { size: '16x20 inches', price: 5499 }], inStock: true, customizable: true, tags: ['pet', 'watercolor', 'portrait'] },

  // Religious Art
  { id: 're1', name: 'Ganesha Mandala Canvas', price: 2199, originalPrice: 2999, discount: 27, category: 'religious', subcategory: 'ganesha', images: [`${BASE}/ganesha1/600/750`, `${BASE}/ganesha1b/600/750`], rating: 4.8, reviews: 389, description: 'Intricate Ganesha mandala art with gold accents on premium canvas.', variants: [{ size: '16x20 inches', price: 2199 }, { size: '20x24 inches', price: 3299 }, { size: '24x30 inches', price: 4499 }], inStock: true, isBestSeller: true, tags: ['ganesha', 'mandala', 'religious'] },
  { id: 're2', name: 'Om Symbol Gold Art', price: 1599, originalPrice: 2199, discount: 27, category: 'religious', subcategory: 'symbols', images: [`${BASE}/om1/600/750`, `${BASE}/om1b/600/750`], rating: 4.6, reviews: 234, description: 'Elegant Om symbol with gold foil detailing on deep blue background.', variants: [{ size: '12x12 inches', price: 1599 }, { size: '16x16 inches', price: 2499 }], inStock: true, tags: ['om', 'spiritual', 'symbol'] },
  { id: 're3', name: 'Radha Krishna Canvas', price: 3299, originalPrice: 4299, discount: 23, category: 'religious', subcategory: 'krishna', images: [`${BASE}/krishna1/600/750`, `${BASE}/krishna1b/600/750`], rating: 4.9, reviews: 521, description: 'Serene Radha Krishna painting with vibrant traditional colors.', variants: [{ size: '18x24 inches', price: 3299 }, { size: '24x36 inches', price: 5499 }], inStock: true, isBestSeller: true, tags: ['krishna', 'radha', 'devotional'] },
  { id: 're4', name: 'Lotus & Buddha Art', price: 1899, originalPrice: 2499, discount: 24, category: 'religious', subcategory: 'buddha', images: [`${BASE}/buddha1/600/750`, `${BASE}/buddha1b/600/750`], rating: 4.7, reviews: 167, description: 'Peaceful lotus and Buddha art for meditation spaces and living rooms.', variants: [{ size: '16x20 inches', price: 1899 }, { size: '20x24 inches', price: 2899 }], inStock: true, isNew: true, tags: ['buddha', 'lotus', 'meditation'] },

  // Photo Frames
  { id: 'pf1', name: 'Custom Photo Collage Frame', price: 1499, originalPrice: 2099, discount: 29, category: 'photo-frames', subcategory: 'collage', images: [`${BASE}/frame1/600/750`, `${BASE}/frame1b/600/750`], rating: 4.7, reviews: 892, description: 'Beautiful collage frame for up to 6 photos. Personalized with names and dates.', variants: [{ size: '6 photos - 12x16', price: 1499 }, { size: '9 photos - 18x24', price: 2199 }], inStock: true, isBestSeller: true, customizable: true, tags: ['collage', 'photo', 'frame'] },
  { id: 'pf2', name: 'Wood & Metal Combo Frame', price: 2299, originalPrice: 3099, discount: 26, category: 'photo-frames', subcategory: 'wooden', images: [`${BASE}/frame2/600/750`, `${BASE}/frame2b/600/750`], rating: 4.6, reviews: 345, description: 'Premium wood and metal combination frame for a sophisticated look.', variants: [{ size: '8x10 inches', price: 2299 }, { size: '12x16 inches', price: 3499 }], inStock: true, tags: ['wood', 'metal', 'premium'] },
  { id: 'pf3', name: 'Anniversary Memory Frame', price: 1799, originalPrice: 2399, discount: 25, category: 'photo-frames', subcategory: 'anniversary', images: [`${BASE}/frame3/600/750`, `${BASE}/frame3b/600/750`], rating: 4.8, reviews: 567, description: 'Romantic anniversary frame with custom text and heart accents.', variants: [{ size: '8x10 inches', price: 1799 }, { size: '12x16 inches', price: 2799 }], inStock: true, customizable: true, tags: ['anniversary', 'love', 'romantic'] },

  // Home Decor
  { id: 'hd1', name: 'Bohemian Macramé Wall Hanging', price: 1299, originalPrice: 1799, discount: 28, category: 'home-decor', subcategory: 'macrame', images: [`${BASE}/macro1/600/750`, `${BASE}/macro1b/600/750`], rating: 4.6, reviews: 423, description: 'Handcrafted bohemian macramé wall hanging with natural cotton rope.', variants: [{ size: 'Small (12 inches)', price: 1299 }, { size: 'Medium (18 inches)', price: 1799 }, { size: 'Large (24 inches)', price: 2499 }], inStock: true, isNew: true, tags: ['macrame', 'boho', 'handmade'] },
  { id: 'hd2', name: 'Ceramic Vase Set (3 pcs)', price: 2499, originalPrice: 3299, discount: 24, category: 'home-decor', subcategory: 'ceramic', images: [`${BASE}/vase1/600/750`, `${BASE}/vase1b/600/750`], rating: 4.5, reviews: 189, description: 'Elegant set of 3 ceramic vases in coordinating sizes. Perfect for modern interiors.', variants: [{ size: 'Set of 3 - Standard', price: 2499 }], inStock: true, isBestSeller: true, tags: ['ceramic', 'vase', 'set'] },
  { id: 'hd3', name: 'Scented Soy Candle Set', price: 999, originalPrice: 1399, discount: 29, category: 'home-decor', subcategory: 'candles', images: [`${BASE}/candle1/600/750`, `${BASE}/candle1b/600/750`], rating: 4.7, reviews: 678, description: 'Set of 4 premium scented soy candles. Lavender, Vanilla, Rose & Sandalwood.', variants: [{ size: 'Set of 4 - 100g each', price: 999 }, { size: 'Set of 4 - 200g each', price: 1699 }], inStock: true, isNew: true, tags: ['candle', 'scented', 'soy'] },
];

export const CATEGORIES = [
  { id: 'wall-art', name: 'Wall Art', icon: '🖼️', count: 48, description: 'Premium canvas prints & paintings', color: '#EEF4FF' },
  { id: 'personalized', name: 'Personalized', icon: '✍️', count: 32, description: 'Custom portraits & name art', color: '#EDF9F5' },
  { id: 'religious', name: 'Religious Art', icon: '🕉️', count: 56, description: 'Devotional & spiritual artwork', color: '#FFF8EE' },
  { id: 'photo-frames', name: 'Photo Frames', icon: '🪟', count: 24, description: 'Custom photo frame collections', color: '#FFF0F0' },
  { id: 'home-decor', name: 'Home Decor', icon: '🏡', count: 41, description: 'Handcrafted decor accents', color: '#F0EEFF' },
];

export const TESTIMONIALS = [
  { id: 1, name: 'Priya Sharma', city: 'Mumbai', rating: 5, text: 'The custom portrait of my family is absolutely stunning! The artists captured every detail perfectly. Will definitely order again.', avatar: `${BASE}/avatar1/80/80`, product: 'Custom Family Portrait' },
  { id: 2, name: 'Rahul Verma', city: 'Delhi', rating: 5, text: 'Ordered a Ganesha painting for our new home. The quality is outstanding and it arrived beautifully packed. Highly recommend!', avatar: `${BASE}/avatar2/80/80`, product: 'Ganesha Mandala Canvas' },
  { id: 3, name: 'Sneha Patel', city: 'Bangalore', rating: 4, text: 'The photo frame collage I ordered was perfect for my anniversary gift. My husband was so moved. Beautiful craftsmanship!', avatar: `${BASE}/avatar3/80/80`, product: 'Custom Photo Collage Frame' },
  { id: 4, name: 'Aditya Kumar', city: 'Pune', rating: 5, text: 'Exceptional quality and prompt delivery. The wall art transformed our living room completely. Already planning my next order!', avatar: `${BASE}/avatar4/80/80`, product: 'Abstract Blue Harmony' },
];

export const BLOG_POSTS = [
  { id: 1, title: 'How to Style Your Living Room with Wall Art', excerpt: 'Discover expert tips on creating stunning gallery walls that reflect your personality.', image: `${BASE}/blog1/800/450`, category: 'Interior Design', date: '2024-03-15', readTime: '5 min' },
  { id: 2, title: 'The Art of Gifting: Personalized Art Explained', excerpt: 'Why personalized artwork makes the most meaningful and memorable gift for every occasion.', image: `${BASE}/blog2/800/450`, category: 'Gift Guide', date: '2024-03-10', readTime: '4 min' },
  { id: 3, title: 'Religious Art in Indian Homes: A Timeless Tradition', excerpt: 'Explore the deep cultural significance of devotional art and how to incorporate it beautifully.', image: `${BASE}/blog3/800/450`, category: 'Culture', date: '2024-03-05', readTime: '6 min' },
];

export const COUPONS: Record<string, number> = {
  'WELCOME10': 10,
  'SAVE20': 20,
  'NEWUSER15': 15,
  'FESTIVE25': 25,
};
