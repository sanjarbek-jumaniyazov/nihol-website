import { Link } from "@/components/ui/localized-link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { StarRating } from "@/components/ui/star-rating";
import { SaveToggleButton } from "@/components/marketplace/save-toggle-button";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { PRODUCT_IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import type { Product } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function ProductCard({
  product,
  dict,
  lang,
}: {
  product: Product;
  dict: Dictionary["marketplace"];
  lang: Locale;
}) {
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
          photo={PRODUCT_IMAGES[product.slug]}
          className="aspect-square w-full rounded-none"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-primary-950/80 px-3 py-1 text-xs font-medium text-white">
            {dict.outOfStock}
          </span>
        )}
        <SaveToggleButton productId={product.id} className="absolute right-2.5 top-2.5" />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
          {category ? dict.categories[category.value] : ""}
        </p>
        <h3 className="mt-1 font-medium text-primary-950 group-hover:text-primary-700">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-primary-900">{formatSom(product.price, lang)}</span>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </div>
    </Link>
  );
}
