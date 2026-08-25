import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { StarRating } from "@/components/ui/star-rating";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { formatSom } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const category = PRODUCT_CATEGORIES.find((c) => c.value === product.category);

  return (
    <Link
      href={`/marketplace/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-primary-100 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <PlaceholderImage
          seed={product.id}
          emoji={category?.emoji ?? "🌿"}
          className="aspect-square w-full rounded-none"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-primary-950/80 px-3 py-1 text-xs font-medium text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary-600">{category?.label}</p>
        <h3 className="mt-1 font-medium text-primary-950 group-hover:text-primary-700">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-primary-900">{formatSom(product.price)}</span>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </div>
    </Link>
  );
}
