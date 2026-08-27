import { BackHeader } from "@/components/ui/back-header";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/localized-link";
import { Card } from "@/components/ui/card";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { AddToCartButton } from "@/components/marketplace/add-to-cart-button";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { PRODUCT_IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import { requireCustomer } from "@/lib/auth";
import { getSavedProducts } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function SavedPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).saved;
  const customer = await requireCustomer(lang);
  const products = await getSavedProducts(customer.id, lang);

  return (
    <div className="pb-16">
      <BackHeader title={dict.title} backHref="/marketplace" />
      <Container className="max-w-xl space-y-2.5 py-6">
        {products.length === 0 && (
          <div className="rounded-2xl border border-dashed border-hairline p-8 text-center">
            <p className="font-serif text-lg text-ink">{dict.empty}</p>
            <p className="mt-1.5 text-sm text-muted">{dict.emptyDescription}</p>
          </div>
        )}
        {products.map((p) => {
          const category = PRODUCT_CATEGORIES.find((c) => c.value === p.category);
          return (
            <Card key={p.id} className="flex gap-3 p-3">
              <Link href={`/marketplace/products/${p.slug}`}>
                <PlaceholderImage seed={p.id} emoji={category?.emoji ?? "🌿"} photo={PRODUCT_IMAGES[p.slug]} className="h-16.5 w-16.5 flex-none" sizes="66px" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/marketplace/products/${p.slug}`} className="text-sm font-semibold text-ink">
                  {p.name}
                </Link>
                <p className="mt-1 font-mono text-sm font-medium text-primary-700">{formatSom(p.price, lang)}</p>
                <div className="mt-2">
                  <AddToCartButton productId={p.id} inStock={p.inStock} />
                </div>
              </div>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}
