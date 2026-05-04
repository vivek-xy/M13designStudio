import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  customization?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  isCartOpen: boolean;
  addToCart: (product: Product, qty?: number, size?: string, custom?: string) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  setUser: (user: User | null) => void;
  setCartOpen: (open: boolean) => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,
      isCartOpen: false,

      addToCart: (product, qty = 1, size, custom) => {
        set((state) => {
          const existing = state.cart.find(
            (i) => i.id === product.id && i.selectedSize === size
          );
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id && i.selectedSize === size
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: qty, selectedSize: size, customization: custom }],
          };
        });
      },

      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((state) => ({
          cart: qty <= 0
            ? state.cart.filter((i) => i.id !== id)
            : state.cart.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
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
    { name: 'm13-design-studio', partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, user: s.user }) }
  )
);
