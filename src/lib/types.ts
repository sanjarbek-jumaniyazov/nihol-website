export type ProductCategory =
  | "flowers"
  | "decorative-trees"
  | "fruit-trees"
  | "indoor-plants"
  | "supplies";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string; emoji: string }[] = [
  { value: "flowers", label: "Flowering Plants", emoji: "🌸" },
  { value: "decorative-trees", label: "Decorative Trees", emoji: "🌳" },
  { value: "fruit-trees", label: "Fruit Trees", emoji: "🍎" },
  { value: "indoor-plants", label: "Indoor Plants & Greenery", emoji: "🌿" },
  { value: "supplies", label: "Pots, Seeds & Supplies", emoji: "🪴" },
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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  treesOwned?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}
