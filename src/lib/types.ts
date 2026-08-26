import type { Locale } from "@/i18n/config";

/** A string translated into every supported locale. */
export type Localized = Record<Locale, string>;

export type ProductCategory =
  | "flowers"
  | "decorative-trees"
  | "fruit-trees"
  | "indoor-plants"
  | "supplies";

export const PRODUCT_CATEGORIES: { value: ProductCategory; emoji: string }[] = [
  { value: "flowers", emoji: "🌸" },
  { value: "decorative-trees", emoji: "🌳" },
  { value: "fruit-trees", emoji: "🍎" },
  { value: "indoor-plants", emoji: "🌿" },
  { value: "supplies", emoji: "🪴" },
];

export interface Farm {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  founded: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  accentColor: string;
}

export interface RawFarm extends Omit<Farm, "name" | "tagline" | "description" | "location"> {
  name: Localized;
  tagline: Localized;
  description: Localized;
  location: Localized;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  farmId: string;
  category: ProductCategory;
  price: number;
  description: string;
  careInstructions: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface RawProduct extends Omit<Product, "name" | "description" | "careInstructions"> {
  name: Localized;
  description: Localized;
  careInstructions: Localized;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  treesOwned?: number;
}

export interface RawTestimonial extends Omit<Testimonial, "role" | "quote"> {
  role: Localized;
  quote: Localized;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RawFaqItem {
  question: Localized;
  answer: Localized;
}

export interface CartLine {
  productId: string;
  quantity: number;
}
