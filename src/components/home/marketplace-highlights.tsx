import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { ProductCard } from "@/components/marketplace/product-card";
import { FarmCard } from "@/components/marketplace/farm-card";
import { getFeaturedFarms, getProducts } from "@/lib/data";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export async function MarketplaceHighlights({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [farms, products] = await Promise.all([getFeaturedFarms(lang), getProducts(lang)]);
  const t = dict.marketplace;
  const th = dict.home.marketplaceHighlights;

  return (
    <section className="bg-primary-50/60 py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={th.eyebrow} title={th.title} description={th.description} />
          <LinkButton href="/marketplace" variant="outline">
            {th.browseMarketplace}
          </LinkButton>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-600">
            {th.featuredFarmBrands}
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {farms.slice(0, 3).map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-600">
            {th.popularProducts}
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} dict={t} lang={lang} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
