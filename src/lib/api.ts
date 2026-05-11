import { PRODUCTS, CATEGORIES, BLOG_POSTS } from './data';
import { Product, Category } from './store';

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Simulated Persistence Layer
const getDB = <T>(key: string, fallback: T[]): T[] => {
  if (typeof window === 'undefined') return fallback;
  const data = localStorage.getItem(`m13_db_${key}`);
  return data ? JSON.parse(data) : fallback;
};

const saveDB = <T>(key: string, data: T[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`m13_db_${key}`, JSON.stringify(data));
};

export const api = {
  products: {
    list: async (): Promise<Product[]> => {
      await delay(800);
      return getDB('products', PRODUCTS);
    },
    get: async (id: string): Promise<Product | undefined> => {
      await delay(500);
      return getDB('products', PRODUCTS).find(p => p.id === id);
    },
    create: async (product: Product): Promise<Product> => {
      await delay(1000);
      const db = getDB('products', PRODUCTS);
      const updated = [product, ...db];
      saveDB('products', updated);
      return product;
    },
    update: async (product: Product): Promise<Product> => {
      await delay(1000);
      const db = getDB('products', PRODUCTS);
      const updated = db.map(p => p.id === product.id ? product : p);
      saveDB('products', updated);
      return product;
    },
    delete: async (id: string): Promise<boolean> => {
      await delay(800);
      const db = getDB('products', PRODUCTS);
      saveDB('products', db.filter(p => p.id !== id));
      return true;
    }
  },
  categories: {
    list: async (): Promise<Category[]> => {
      await delay(600);
      return getDB('categories', CATEGORIES);
    },
    create: async (category: Category): Promise<Category> => {
      await delay(800);
      const db = getDB('categories', CATEGORIES);
      saveDB('categories', [...db, category]);
      return category;
    },
    update: async (category: Category): Promise<Category> => {
      await delay(800);
      const db = getDB('categories', CATEGORIES);
      saveDB('categories', db.map(c => c.id === category.id ? category : c));
      return category;
    },
    delete: async (id: string): Promise<boolean> => {
      await delay(600);
      const db = getDB('categories', CATEGORIES);
      saveDB('categories', db.filter(c => c.id !== id));
      return true;
    }
  },
  blog: {
    list: async () => {
      await delay(700);
      return BLOG_POSTS;
    }
  },
  orders: {
    list: async () => {
      await delay(800);
      return getDB('orders', []);
    },
    create: async (orderData: any) => {
      await delay(1500);
      const db = getDB('orders', []);
      const newOrder = {
        ...orderData,
        id: 'M13-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        // Flatten items for the admin view to match Order interface
        customer: orderData.customer.name,
        email: orderData.customer.email,
        phone: orderData.customer.phone,
        city: orderData.customer.city,
        amount: orderData.total,
        product: orderData.items[0]?.name + (orderData.items.length > 1 ? ` +${orderData.items.length - 1}` : ''),
        items: orderData.items.reduce((s: any, i: any) => s + i.quantity, 0),
        customImages: orderData.items.flatMap((i: any) => i.customImages || [])
      };
      saveDB('orders', [newOrder, ...db]);
      return { success: true, orderId: newOrder.id };
    },
    updateStatus: async (id: string, status: string) => {
      await delay(500);
      const db = getDB('orders', []);
      saveDB('orders', db.map((o: any) => o.id === id ? { ...o, status } : o));
      return true;
    }
  },
  storage: {
    upload: async (file: File): Promise<string> => {
      console.log('Uploading High-Res Artwork:', file.name, file.size);
      await delay(1200);
      return URL.createObjectURL(file);
    }
  }
};
