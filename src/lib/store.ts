import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Category {
  id: string;
  name: string;
  image?: string;
  icon?: string;
  count: number;
  description: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subcategory?: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  variants?: { size: string; price: number }[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  customizable?: boolean;
  customPhotoCount?: number; // Number of photos required from user
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  customization?: string;
  customImages?: string[]; // Array of high-quality URLs
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface StoreState {
  // Core data
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  isCartOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Product actions
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Category actions
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Cart actions
  addToCart: (product: Product, qty?: number, size?: string, custom?: string, customImages?: string[]) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQty: (id: string, qty: number, size?: string) => void;
  clearCart: () => void;

  // Other actions
  toggleWishlist: (id: string) => void;
  setUser: (user: User | null) => void;
  setCartOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed
  cartTotal: () => number;
  cartCount: () => number;
}

import { api } from './api';

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      categories: [],
      products: [],
      cart: [],
      wishlist: [],
      user: null,
      isCartOpen: false,
      isLoading: false,
      error: null,

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      setCategories: (categories) => set({ categories }),
      fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
          const categories = await api.categories.list();
          set({ categories, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },
      addCategory: async (category) => {
        set({ isLoading: true });
        try {
          const res = await api.categories.create(category);
          set((state) => ({ categories: [...state.categories, res], isLoading: false }));
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },
      updateCategory: async (category) => {
        set({ isLoading: true });
        try {
          const res = await api.categories.update(category);
          set((state) => ({
            categories: state.categories.map((c) => (c.id === category.id ? res : c)),
            isLoading: false
          }));
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },
      deleteCategory: async (id) => {
        set({ isLoading: true });
        try {
          await api.categories.delete(id);
          set((state) => ({
            categories: state.categories.filter((c) => c.id !== id),
            isLoading: false
          }));
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      setProducts: (products) => set({ products }),
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const products = await api.products.list();
          set({ products, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },
      addProduct: async (product) => {
        set({ isLoading: true });
        try {
          const res = await api.products.create(product);
          set((state) => ({ products: [res, ...state.products], isLoading: false }));
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },
      updateProduct: async (product) => {
        set({ isLoading: true });
        try {
          const res = await api.products.update(product);
          set((state) => ({
            products: state.products.map((p) => (p.id === product.id ? res : p)),
            isLoading: false
          }));
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },
      deleteProduct: async (id) => {
        set({ isLoading: true });
        try {
          await api.products.delete(id);
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            isLoading: false
          }));
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      addToCart: (product, qty = 1, size, custom, customImages) => {
        set((state) => {
          const existing = state.cart.find(
            (i) => i.id === product.id && i.selectedSize === size && i.customization === custom && JSON.stringify(i.customImages) === JSON.stringify(customImages)
          );
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                (i.id === product.id && i.selectedSize === size && i.customization === custom && JSON.stringify(i.customImages) === JSON.stringify(customImages))
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: qty, selectedSize: size, customization: custom, customImages: customImages }],
          };
        });
      },

      removeFromCart: (id, size) =>
        set((state) => ({
          cart: state.cart.filter((i) => !(i.id === id && (size === undefined || i.selectedSize === size))),
        })),

      updateQty: (id, qty, size) =>
        set((state) => ({
          cart: qty <= 0
            ? state.cart.filter((i) => !(i.id === id && (size === undefined || i.selectedSize === size)))
            : state.cart.map((i) =>
                i.id === id && (size === undefined || i.selectedSize === size)
                  ? { ...i, quantity: qty }
                  : i
              ),
        })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((w) => w !== id)
            : [...state.wishlist, id],
        })),

      setUser: (user) => set({ user }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      cartTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { 
      name: 'm13-design-studio', 
      partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, user: s.user }) 
    }
  )
);
