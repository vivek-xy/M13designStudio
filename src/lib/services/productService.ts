import { PRODUCTS, CATEGORIES } from '../data';
import { Product } from '../store';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    await delay(500);
    return [...PRODUCTS];
  },

  async getProductById(id: string): Promise<Product | undefined> {
    await delay(300);
    return PRODUCTS.find(p => p.id === id);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    await delay(400);
    return PRODUCTS.filter(p => p.category === category);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await delay(500);
    return PRODUCTS.filter(p => p.isBestSeller).slice(0, 8);
  },

  async getNewArrivals(): Promise<Product[]> {
    await delay(500);
    return PRODUCTS.filter(p => p.isNew).slice(0, 8);
  },

  async getCategories() {
    await delay(300);
    return [...CATEGORIES];
  }
};
