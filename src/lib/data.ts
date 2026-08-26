/**
 * Data-access layer. Currently backed by mock data (src/lib/mock-data.ts)
 * so the app runs without any setup. Once Supabase is configured and seeded
 * (see supabase/schema.sql), swap the bodies of these functions for queries
 * against `createClient()` from "@/lib/supabase/server" — the return shapes
 * already match the `farms` / `products` tables in the schema.
 */
import type { Locale } from "@/i18n/config";
import {
  farms,
  products,
  testimonials,
  faqs,
  supportFaqs,
  trustStats,
  localizeFarm,
  localizeProduct,
  localizeTestimonial,
  localizeFaq,
} from "./mock-data";
import type { Farm, Product, ProductCategory } from "./types";

export async function getFarms(locale: Locale): Promise<Farm[]> {
  return farms.map((f) => localizeFarm(f, locale));
}

export async function getFeaturedFarms(locale: Locale): Promise<Farm[]> {
  return farms.filter((f) => f.featured).map((f) => localizeFarm(f, locale));
}

export async function getFarmBySlug(slug: string, locale: Locale): Promise<Farm | undefined> {
  const farm = farms.find((f) => f.slug === slug);
  return farm ? localizeFarm(farm, locale) : undefined;
}

export async function getFarmById(id: string, locale: Locale): Promise<Farm | undefined> {
  const farm = farms.find((f) => f.id === id);
  return farm ? localizeFarm(farm, locale) : undefined;
}

export async function getProducts(
  locale: Locale,
  filters?: {
    category?: ProductCategory;
    farmId?: string;
    query?: string;
  }
): Promise<Product[]> {
  let result = products.map((p) => localizeProduct(p, locale));

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

export async function getProductBySlug(slug: string, locale: Locale): Promise<Product | undefined> {
  const product = products.find((p) => p.slug === slug);
  return product ? localizeProduct(product, locale) : undefined;
}

export async function getProductsByFarm(farmId: string, locale: Locale): Promise<Product[]> {
  return products.filter((p) => p.farmId === farmId).map((p) => localizeProduct(p, locale));
}

export async function getRelatedProducts(product: Product, locale: Locale, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
    .map((p) => localizeProduct(p, locale));
}

export async function getTestimonials(locale: Locale) {
  return testimonials.map((t) => localizeTestimonial(t, locale));
}

export async function getFaqs(locale: Locale) {
  return faqs.map((f) => localizeFaq(f, locale));
}

export async function getSupportFaqs(locale: Locale) {
  return supportFaqs.map((f) => localizeFaq(f, locale));
}

export async function getTrustStats() {
  return trustStats;
}
