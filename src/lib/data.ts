import { Product, Category } from './store';

const BASE = 'https://picsum.photos/seed';

export const PRODUCTS: Product[] = [
  // Wall Art
  {
    id: 'wa1', name: 'Abstract Blue Harmony', price: 2499, originalPrice: 3499, discount: 29,
    category: 'wall-art', subcategory: 'abstract',
    images: [`${BASE}/art1/600/750`, `${BASE}/art1b/600/750`],
    rating: 4.8, reviews: 124,
    description: 'A stunning abstract piece with deep blue tones and fluid shapes, perfect for modern living rooms.',
    variants: [{ size: '12x16 inches', price: 2499 }, { size: '18x24 inches', price: 3499 }, { size: '24x36 inches', price: 5499 }],
    inStock: true, isNew: true, isBestSeller: true,
    tags: ['abstract', 'modern', 'blue'],
  },
  {
    id: 'wa2', name: 'Golden Sunrise Landscape', price: 3299, originalPrice: 4299, discount: 23,
    category: 'wall-art', subcategory: 'landscape',
    images: [`${BASE}/art2/600/750`, `${BASE}/art2b/600/750`],
    rating: 4.6, reviews: 89,
    description: 'Breathtaking golden sunrise over rolling hills, printed on premium canvas.',
    variants: [{ size: '16x20 inches', price: 3299 }, { size: '24x30 inches', price: 5199 }],
    inStock: true, isBestSeller: true,
    tags: ['landscape', 'nature', 'golden'],
  },
  {
    id: 'wa3', name: 'Minimalist Geometric Set', price: 1899, originalPrice: 2499, discount: 24,
    category: 'wall-art', subcategory: 'geometric',
    images: [`${BASE}/art3/600/750`, `${BASE}/art3b/600/750`],
    rating: 4.7, reviews: 203,
    description: 'Set of 3 minimalist geometric prints. Perfect for gallery walls.',
    variants: [{ size: '8x10 inches', price: 1899 }, { size: '12x16 inches', price: 2999 }],
    inStock: true, isBestSeller: true,
    tags: ['geometric', 'minimalist', 'set'],
  },
  {
    id: 'wa4', name: 'Ocean Waves Canvas', price: 2799,
    category: 'wall-art', subcategory: 'nature',
    images: [`${BASE}/art4/600/750`, `${BASE}/art4b/600/750`],
    rating: 4.5, reviews: 67,
    description: 'Serene ocean waves captured in vibrant blues and whites.',
    variants: [{ size: '16x20 inches', price: 2799 }, { size: '20x24 inches', price: 3999 }],
    inStock: true, isNew: true,
    tags: ['ocean', 'nature', 'blue'],
  },
  {
    id: 'wa5', name: 'Forest Path in Autumn', price: 2199, originalPrice: 2899, discount: 24,
    category: 'wall-art', subcategory: 'landscape',
    images: [`${BASE}/art5/600/750`, `${BASE}/art5b/600/750`],
    rating: 4.6, reviews: 98,
    description: 'A serene autumn forest path in warm amber and ochre tones.',
    variants: [{ size: '16x20 inches', price: 2199 }, { size: '24x30 inches', price: 3999 }],
    inStock: true, isNew: true,
    tags: ['forest', 'autumn', 'landscape'],
  },

  // Religious Art
  {
    id: 're1', name: 'Ganesha Mandala Canvas', price: 2199, originalPrice: 2999, discount: 27,
    category: 'religious', subcategory: 'ganesha',
    images: [`${BASE}/ganesha1/600/750`, `${BASE}/ganesha1b/600/750`],
    rating: 4.8, reviews: 389,
    description: 'Intricate Ganesha mandala art with gold accents on premium canvas.',
    variants: [{ size: '16x20 inches', price: 2199 }, { size: '20x24 inches', price: 3299 }, { size: '24x30 inches', price: 4499 }],
    inStock: true, isBestSeller: true,
    tags: ['ganesha', 'mandala', 'religious'],
  },
  {
    id: 're2', name: 'Om Symbol Gold Art', price: 1599, originalPrice: 2199, discount: 27,
    category: 'religious', subcategory: 'symbols',
    images: [`${BASE}/om1/600/750`, `${BASE}/om1b/600/750`],
    rating: 4.6, reviews: 234,
    description: 'Elegant Om symbol with gold foil detailing on deep blue background.',
    variants: [{ size: '12x12 inches', price: 1599 }, { size: '16x16 inches', price: 2499 }],
    inStock: true, isNew: true,
    tags: ['om', 'spiritual', 'symbol'],
  },
  {
    id: 're3', name: 'Radha Krishna Canvas', price: 3299, originalPrice: 4299, discount: 23,
    category: 'religious', subcategory: 'krishna',
    images: [`${BASE}/krishna1/600/750`, `${BASE}/krishna1b/600/750`],
    rating: 4.9, reviews: 521,
    description: 'Serene Radha Krishna painting with vibrant traditional colors.',
    variants: [{ size: '18x24 inches', price: 3299 }, { size: '24x36 inches', price: 5499 }],
    inStock: true, isBestSeller: true,
    tags: ['krishna', 'radha', 'devotional'],
  },
  {
    id: 're4', name: 'Lotus & Buddha Art', price: 1899, originalPrice: 2499, discount: 24,
    category: 'religious', subcategory: 'buddha',
    images: [`${BASE}/buddha1/600/750`, `${BASE}/buddha1b/600/750`],
    rating: 4.7, reviews: 167,
    description: 'Peaceful lotus and Buddha art for meditation spaces and living rooms.',
    variants: [{ size: '16x20 inches', price: 1899 }, { size: '20x24 inches', price: 2899 }],
    inStock: true, isNew: true,
    tags: ['buddha', 'lotus', 'meditation'],
  },

  // Photo Frames
  {
    id: 'pf1', name: 'Classic Wood Frame Set', price: 1499, originalPrice: 2099, discount: 29,
    category: 'photo-frames', subcategory: 'wooden',
    images: [`${BASE}/frame1/600/750`, `${BASE}/frame1b/600/750`],
    rating: 4.7, reviews: 892,
    description: 'Beautiful hand-crafted wooden frames for your favorite prints.',
    variants: [{ size: '8x10 inches', price: 1499 }, { size: '12x16 inches', price: 2199 }],
    inStock: true, isBestSeller: true,
    tags: ['photo', 'frame', 'wood'],
  },
  {
    id: 'pf2', name: 'Wood & Metal Combo Frame', price: 2299, originalPrice: 3099, discount: 26,
    category: 'photo-frames', subcategory: 'wooden',
    images: [`${BASE}/frame2/600/750`, `${BASE}/frame2b/600/750`],
    rating: 4.6, reviews: 345,
    description: 'Premium wood and metal combination frame for a sophisticated look.',
    variants: [{ size: '8x10 inches', price: 2299 }, { size: '12x16 inches', price: 3499 }],
    inStock: true, isNew: true,
    tags: ['wood', 'metal', 'premium'],
  },
  {
    id: 'pf3', name: 'Premium Gallery Frame', price: 1799, originalPrice: 2399, discount: 25,
    category: 'photo-frames', subcategory: 'anniversary',
    images: [`${BASE}/frame3/600/750`, `${BASE}/frame3b/600/750`],
    rating: 4.8, reviews: 567,
    description: 'Minimalist gallery-style frames with museum-grade acrylic.',
    variants: [{ size: '8x10 inches', price: 1799 }, { size: '12x16 inches', price: 2799 }],
    inStock: true, isBestSeller: true,
    tags: ['frame', 'minimalist', 'premium'],
  },

  // Home Decor
  {
    id: 'hd1', name: 'Bohemian Macramé Wall Hanging', price: 1299, originalPrice: 1799, discount: 28,
    category: 'home-decor', subcategory: 'macrame',
    images: [`${BASE}/macro1/600/750`, `${BASE}/macro1b/600/750`],
    rating: 4.6, reviews: 423,
    description: 'Handcrafted bohemian macramé wall hanging with natural cotton rope.',
    variants: [{ size: 'Small (12 inches)', price: 1299 }, { size: 'Medium (18 inches)', price: 1799 }, { size: 'Large (24 inches)', price: 2499 }],
    inStock: true, isNew: true, isBestSeller: true,
    tags: ['macrame', 'boho', 'handmade'],
  },
  {
    id: 'hd2', name: 'Ceramic Vase Set (3 pcs)', price: 2499, originalPrice: 3299, discount: 24,
    category: 'home-decor', subcategory: 'ceramic',
    images: [`${BASE}/vase1/600/750`, `${BASE}/vase1b/600/750`],
    rating: 4.5, reviews: 189,
    description: 'Elegant set of 3 ceramic vases in coordinating sizes. Perfect for modern interiors.',
    variants: [{ size: 'Set of 3 - Standard', price: 2499 }],
    inStock: true, isBestSeller: true,
    tags: ['ceramic', 'vase', 'set'],
  },
  {
    id: 'hd3', name: 'Scented Soy Candle Set', price: 999, originalPrice: 1399, discount: 29,
    category: 'home-decor', subcategory: 'candles',
    images: [`${BASE}/candle1/600/750`, `${BASE}/candle1b/600/750`],
    rating: 4.7, reviews: 678,
    description: 'Set of 4 premium scented soy candles. Lavender, Vanilla, Rose & Sandalwood.',
    variants: [{ size: 'Set of 4 - 100g each', price: 999 }, { size: 'Set of 4 - 200g each', price: 1699 }],
    inStock: true, isNew: true,
    tags: ['candle', 'scented', 'soy'],
  },

  // Abstract Art
  {
    id: 'ab1', name: 'Fluid Ink Dance', price: 2799, originalPrice: 3599, discount: 22,
    category: 'abstract', subcategory: 'fluid',
    images: [`${BASE}/abstract1/600/750`, `${BASE}/abstract1b/600/750`],
    rating: 4.7, reviews: 112,
    description: 'Bold fluid ink patterns swirling in rich jewel tones — a conversation piece for any room.',
    variants: [{ size: '16x20 inches', price: 2799 }, { size: '24x30 inches', price: 4299 }],
    inStock: true, isBestSeller: true, isNew: true,
    tags: ['abstract', 'fluid', 'colorful'],
  },
  {
    id: 'ab2', name: 'Gold Leaf Geometry', price: 3499, originalPrice: 4499, discount: 22,
    category: 'abstract', subcategory: 'geometric',
    images: [`${BASE}/abstract2/600/750`, `${BASE}/abstract2b/600/750`],
    rating: 4.9, reviews: 87,
    description: 'Luxury gold leaf geometric shapes on deep navy — timeless and dramatic.',
    variants: [{ size: '18x24 inches', price: 3499 }, { size: '24x36 inches', price: 5499 }],
    inStock: true, isBestSeller: true,
    tags: ['abstract', 'gold', 'geometric'],
  },
  {
    id: 'ab3', name: 'Monochrome Brushwork', price: 1999, originalPrice: 2699, discount: 26,
    category: 'abstract', subcategory: 'brushwork',
    images: [`${BASE}/abstract3/600/750`, `${BASE}/abstract3b/600/750`],
    rating: 4.5, reviews: 65,
    description: 'Expressive monochrome brushwork — minimal, zen, and powerful.',
    variants: [{ size: '12x16 inches', price: 1999 }, { size: '20x24 inches', price: 3199 }],
    inStock: true, isNew: true,
    tags: ['abstract', 'monochrome', 'minimal'],
  },

  // Personalized Art
  {
    id: 'pers1', name: 'Custom Oil Portrait', price: 4999, originalPrice: 6999, discount: 28,
    category: 'personalized', subcategory: 'portrait',
    images: [`${BASE}/portrait1/600/750`],
    rating: 5.0, reviews: 42,
    description: 'A museum-grade oil portrait hand-painted from your photo. Captures every emotion and detail.',
    variants: [{ size: '12x16 inches', price: 4999 }, { size: '18x24 inches', price: 7499 }],
    inStock: true, isBestSeller: true, customizable: true, customPhotoCount: 1,
    tags: ['custom', 'portrait', 'gift'],
  },
  {
    id: 'pers2', name: 'Pet Watercolor Art', price: 2499, originalPrice: 3499, discount: 28,
    category: 'personalized', subcategory: 'pet',
    images: [`${BASE}/pet1/600/750`],
    rating: 4.9, reviews: 128,
    description: 'Cherish your furry friend with a vibrant watercolor illustration. Perfect for pet lovers.',
    variants: [{ size: '8x10 inches', price: 2499 }, { size: '12x16 inches', price: 3499 }],
    inStock: true, customizable: true, customPhotoCount: 3,
    tags: ['pet', 'watercolor', 'custom'],
  },
];

export const CATEGORIES: Category[] = [
  { id: 'personalized', name: 'Personalized Art', image: `${BASE}/category_custom/800/600`, count: 12, description: 'Hand-painted memories from your photos', color: '#F0FDF4' },
  { id: 'wall-art', name: 'Wall Art', image: `${BASE}/category_wall/800/600`, count: 48, description: 'Premium canvas prints & paintings', color: '#EEF4FF' },
  { id: 'religious', name: 'Religious Art', image: `${BASE}/category_religious/800/600`, count: 56, description: 'Devotional & spiritual artwork', color: '#FFF8EE' },
  { id: 'photo-frames', name: 'Photo Frames', image: `${BASE}/category_frames/800/600`, count: 24, description: 'Custom photo frame collections', color: '#FFF0F0' },
  { id: 'home-decor', name: 'Home Decor', image: `${BASE}/category_decor/800/600`, count: 41, description: 'Handcrafted decor accents', color: '#F0EEFF' },
  { id: 'abstract', name: 'Abstract Art', image: `${BASE}/category_abstract/800/600`, count: 32, description: 'Modern minimalist & expressive art', color: '#F5F3FF' },
];

export const TESTIMONIALS = [
  { id: 1, name: 'Priya Sharma', city: 'Mumbai', rating: 5, text: 'The Abstract Blue Harmony piece is absolutely stunning! The colors are vibrant and true to the pictures. Will definitely order again.', avatar: `${BASE}/avatar1/80/80`, product: 'Abstract Blue Harmony' },
  { id: 2, name: 'Rahul Verma', city: 'Delhi', rating: 5, text: 'Ordered a Ganesha painting for our new home. The quality is outstanding and it arrived beautifully packed. Highly recommend!', avatar: `${BASE}/avatar2/80/80`, product: 'Ganesha Mandala Canvas' },
  { id: 3, name: 'Sneha Patel', city: 'Bangalore', rating: 5, text: 'The wood frame set I ordered was perfect for my gallery wall. Beautiful craftsmanship!', avatar: `${BASE}/avatar3/80/80`, product: 'Classic Wood Frame Set' },
  { id: 4, name: 'Aditya Kumar', city: 'Pune', rating: 5, text: 'Exceptional quality and prompt delivery. The wall art transformed our living room completely. Already planning my next order!', avatar: `${BASE}/avatar4/80/80`, product: 'Abstract Blue Harmony' },
];

export const BLOG_POSTS = [
  { id: 1, title: 'How to Style Your Living Room with Wall Art', excerpt: 'Discover expert tips on creating stunning gallery walls that reflect your personality.', image: `${BASE}/blog1/800/450`, category: 'Interior Design', date: '2024-03-15', readTime: '5 min' },
  { id: 2, title: 'The Art of Gifting: Why Wall Art Matters', excerpt: 'How choosing the right artwork can make the most meaningful and memorable gift for every occasion.', image: `${BASE}/blog2/800/450`, category: 'Gift Guide', date: '2024-03-10', readTime: '4 min' },
  { id: 3, title: 'Religious Art in Indian Homes: A Timeless Tradition', excerpt: 'Explore the deep cultural significance of devotional art and how to incorporate it beautifully.', image: `${BASE}/blog3/800/450`, category: 'Culture', date: '2024-03-05', readTime: '6 min' },
];

export const COUPONS: Record<string, number> = {
  'WELCOME10': 10,
  'SAVE20': 20,
  'NEWUSER15': 15,
  'FESTIVE25': 25,
};
