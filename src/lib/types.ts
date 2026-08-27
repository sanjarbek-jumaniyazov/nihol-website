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

/** A cart line is either a marketplace product or a Paulownia tree package. */
export type CartLine =
  | { kind: "product"; id: string; quantity: number }
  | { kind: "tree_package"; id: string; quantity: number };

export interface TreePackage {
  id: string;
  slug: string;
  name: string;
  quantity: number;
  tag: string;
  blurb: string;
  priceSom: number;
  returnLowUsd: number;
  returnHighUsd: number;
  stockLabel: string;
  imageUrl?: string;
}

export interface RawTreePackage extends Omit<TreePackage, "name" | "tag" | "blurb"> {
  name: Localized;
  tag: Localized;
  blurb: Localized;
}

export type TreeStage = "seedling" | "sapling" | "maturing" | "harvest_ready";

export interface Tree {
  id: string;
  code: string;
  plot: string;
  plantedAt: string;
  heightCm: number;
  girthCm: number;
  stage: TreeStage;
  harvestEstimateDate: string | null;
  co2KgTarget: number;
}

export interface TreeCareLogEntry {
  id: string;
  loggedAt: string;
  note: string;
}

export interface Address {
  id: string;
  label: string;
  line: string;
  city: string;
  isDefault: boolean;
}

export type PaymentProvider = "payme" | "click" | "card";

export interface PaymentMethodLabel {
  id: string;
  provider: PaymentProvider;
  label: string;
  meta: string;
  isDefault: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  rating: number;
  body: string;
  createdAt: string;
  reviewerName: string;
}

export interface NotificationPreferences {
  growth: boolean;
  milestones: boolean;
  payments: boolean;
  delivery: boolean;
  promos: boolean;
}

export interface SavedProduct {
  productId: string;
}

export type OrderStatus = "placed" | "packed" | "in_transit" | "out_for_delivery" | "delivered";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderLineItem {
  itemType: "product" | "tree_package";
  productId: string | null;
  treePackageId: string | null;
  name: string;
  quantity: number;
  unitPriceSom: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalSom: number;
  createdAt: string;
  items: OrderLineItem[];
}

export interface OrderTrackingStep {
  status: OrderStatus;
  label: string;
  at: string | null;
  done: boolean;
}
