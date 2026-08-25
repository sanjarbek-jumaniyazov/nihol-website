/**
 * Data-access layer. Currently backed by mock data (src/lib/mock-data.ts)
 * so the app runs without any setup. Once Supabase is configured and seeded
 * (see supabase/schema.sql), swap the bodies of these functions for queries
 * against `createClient()` from "@/lib/supabase/server" — the return shapes
 * already match the `farms` / `products` tables in the schema.
 */
import { farms, products, testimonials, faqs, supportFaqs, trustStats } from "./mock-data";
import type { Farm, Product, ProductCategory } from "./types";

export async function getFarms(): Promise<Farm[]> {
  return farms;
}

export async function getFeaturedFarms(): Promise<Farm[]> {
  return farms.filter((f) => f.featured);
}

export async function getFarmBySlug(slug: string): Promise<Farm | undefined> {
  return farms.find((f) => f.slug === slug);
}

export async function getFarmById(id: string): Promise<Farm | undefined> {
  return farms.find((f) => f.id === id);
}

export async function getProducts(filters?: {
  category?: ProductCategory;
  farmId?: string;
  query?: string;
}): Promise<Product[]> {
  let result = products;

  if (filters?.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters?.farmId) {
    result = result.filter((p) => p.farmId === filters.farmId);
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductsByFarm(farmId: string): Promise<Product[]> {
  return products.filter((p) => p.farmId === farmId);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export async function getTestimonials() {
  return testimonials;
}

export async function getFaqs() {
  return faqs;
}

export async function getSupportFaqs() {
  return supportFaqs;
}

export async function getTrustStats() {
  return trustStats;
}
