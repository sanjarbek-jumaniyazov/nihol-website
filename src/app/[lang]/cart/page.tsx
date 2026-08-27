"use client";

import { Link } from "@/components/ui/localized-link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { LinkButton } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { PRODUCT_IMAGES, IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import { products as rawProducts, localizeProduct, treePackages as rawPackages, localizeTreePackage } from "@/lib/mock-data";
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
  const packages = rawPackages.map((p) => localizeTreePackage(p, lang));

  const resolvedLines = lines
    .map((line) => {
      if (line.kind === "product") {
        const product = products.find((p) => p.id === line.id);
        if (!product) return null;
        return {
          kind: "product" as const,
          id: product.id,
          name: product.name,
          meta: undefined as string | undefined,
          unitPrice: product.price,
          quantity: line.quantity,
          href: `/marketplace/products/${product.slug}`,
          photo: PRODUCT_IMAGES[product.slug],
          seed: product.id,
        };
      }
      const pkg = packages.find((p) => p.id === line.id);
      if (!pkg) return null;
      return {
        kind: "tree_package" as const,
        id: pkg.id,
        name: pkg.name,
        meta: "Plot J-14",
        unitPrice: pkg.priceSom,
        quantity: line.quantity,
        href: undefined,
        photo: IMAGES.paulowniaSeedling,
        seed: pkg.id,
      };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  const treesInCart = resolvedLines.filter((l) => l.kind === "tree_package").reduce((sum, l) => sum + l.quantity, 0);
  const treesSubtotal = resolvedLines
    .filter((l) => l.kind === "tree_package")
    .reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const plantsSubtotal = resolvedLines
    .filter((l) => l.kind === "product")
    .reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const total = treesSubtotal + plantsSubtotal;

  if (resolvedLines.length === 0) {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-primary-300" />
        <h1 className="mt-4 font-serif text-2xl font-semibold text-ink">{dict.empty}</h1>
        <p className="mt-2 text-muted">{dict.emptyDescription}</p>
        <LinkButton href="/marketplace" className="mt-6">
          {dict.shopMarketplace}
        </LinkButton>
      </Container>
    );
  }

  return (
    <Container className="py-14">
      <h1 className="font-serif text-3xl font-semibold text-ink">{dict.title}</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {resolvedLines.map((line) => {
            const category = line.kind === "product" ? PRODUCT_CATEGORIES.find((c) => c.value === rawProducts.find((p) => p.id === line.id)?.category) : undefined;
            return (
              <Card key={`${line.kind}:${line.id}`} className="flex items-center gap-4 p-4">
                <PlaceholderImage
                  seed={line.seed}
                  emoji={category?.emoji ?? "🌳"}
                  photo={line.photo}
                  className="h-20 w-20 flex-shrink-0"
                  sizes="80px"
                />
                <div className="flex-1">
                  {line.href ? (
                    <Link href={line.href} className="font-semibold text-ink hover:text-primary-700">
                      {line.name}
                    </Link>
                  ) : (
                    <span className="font-semibold text-ink">{line.name}</span>
                  )}
                  {line.meta && <p className="mt-1 font-mono text-xs text-label">{line.meta}</p>}
                  <p className="mt-1 text-sm text-muted">{formatSom(line.unitPrice, lang)}</p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-hairline px-2 py-1">
                  <button
                    aria-label={dict.decreaseQuantity}
                    onClick={() => setQuantity(line.kind, line.id, line.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-primary-700 hover:bg-panel"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-mono text-sm font-medium">{line.quantity}</span>
                  <button
                    aria-label={dict.increaseQuantity}
                    onClick={() => setQuantity(line.kind, line.id, line.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-primary-700 hover:bg-panel"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <p className="w-28 text-right font-mono font-semibold text-primary-700">
                  {formatSom(line.unitPrice * line.quantity, lang)}
                </p>

                <button
                  aria-label={dict.removeItem}
                  onClick={() => removeItem(line.kind, line.id)}
                  className="text-label hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </Card>
            );
          })}
        </div>

        <Card className="h-fit bg-panel-alt p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">{dict.orderSummary}</h2>
          <div className="mt-4 space-y-2 text-sm">
            {treesInCart > 0 && (
              <div className="flex items-center justify-between text-muted">
                <span>Trees ({treesInCart})</span>
                <span className="font-mono font-medium text-ink">{formatSom(treesSubtotal, lang)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-muted">
              <span>{dict.subtotal}</span>
              <span className="font-mono font-medium text-ink">{formatSom(plantsSubtotal, lang)}</span>
            </div>
          </div>
          <div className="my-3 h-px bg-hairline" />
          <div className="flex items-baseline justify-between">
            <span className="font-semibold text-ink">{dict.total}</span>
            <span className="font-mono text-lg font-semibold text-primary-700">{formatSom(total, lang)}</span>
          </div>
          <p className="mt-2 text-xs text-label">{dict.deliveryNote}</p>
          <LinkButton href="/checkout" size="lg" className="mt-6 w-full">
            {dict.proceedToCheckout}
          </LinkButton>
        </Card>
      </div>
    </Container>
  );
}
