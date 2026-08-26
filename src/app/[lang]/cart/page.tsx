"use client";

import { Link } from "@/components/ui/localized-link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { LinkButton } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { PRODUCT_IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import { products as rawProducts, localizeProduct } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { useLocale } from "@/i18n/locale-context";
import { getDictionary } from "@/i18n/dictionaries";

export default function CartPage() {
  const mounted = useHydrated();
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const lang = useLocale();
  const dict = getDictionary(lang).cart;

  if (!mounted) return null;

  const products = rawProducts.map((p) => localizeProduct(p, lang));

  const resolvedLines = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      return product ? { product, quantity: line.quantity } : null;
    })
    .filter((l): l is { product: (typeof products)[number]; quantity: number } => l !== null);

  const subtotal = resolvedLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  if (resolvedLines.length === 0) {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-primary-300" />
        <h1 className="mt-4 font-serif text-2xl font-semibold text-primary-950">{dict.empty}</h1>
        <p className="mt-2 text-primary-800/70">{dict.emptyDescription}</p>
        <LinkButton href="/marketplace" className="mt-6">
          {dict.shopMarketplace}
        </LinkButton>
      </Container>
    );
  }

  return (
    <Container className="py-14">
      <h1 className="font-serif text-3xl font-semibold text-primary-950">{dict.title}</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {resolvedLines.map(({ product, quantity }) => {
            const category = PRODUCT_CATEGORIES.find((c) => c.value === product.category);
            return (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-primary-100 p-4"
              >
                <PlaceholderImage
                  seed={product.id}
                  emoji={category?.emoji ?? "🌿"}
                  photo={PRODUCT_IMAGES[product.slug]}
                  className="h-20 w-20 flex-shrink-0"
                  sizes="80px"
                />
                <div className="flex-1">
                  <Link
                    href={`/marketplace/products/${product.slug}`}
                    className="font-medium text-primary-950 hover:text-primary-700"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-primary-800/70">{formatSom(product.price, lang)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    aria-label={dict.decreaseQuantity}
                    onClick={() => setQuantity(product.id, quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-200 text-primary-700 hover:bg-primary-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                  <button
                    aria-label={dict.increaseQuantity}
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-200 text-primary-700 hover:bg-primary-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <p className="w-28 text-right font-semibold text-primary-950">
                  {formatSom(product.price * quantity, lang)}
                </p>

                <button
                  aria-label={dict.removeItem}
                  onClick={() => removeItem(product.id)}
                  className="text-primary-400 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-2xl border border-primary-100 bg-primary-50/60 p-6">
          <h2 className="font-serif text-xl font-semibold text-primary-950">{dict.orderSummary}</h2>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-primary-800/70">{dict.subtotal}</span>
            <span className="font-medium text-primary-950">{formatSom(subtotal, lang)}</span>
          </div>
          <p className="mt-2 text-xs text-primary-800/60">{dict.deliveryNote}</p>
          <LinkButton href="/checkout" size="lg" className="mt-6 w-full">
            {dict.proceedToCheckout}
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
