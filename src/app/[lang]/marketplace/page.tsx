import type { Metadata } from "next";
import { MarketplaceHero } from "@/components/marketplace/marketplace-hero";
import { FarmCarousel } from "@/components/marketplace/farm-carousel";
import { ProductBrowser } from "@/components/marketplace/product-browser";
import { AllFarms } from "@/components/marketplace/all-farms";
import { SellWithUs } from "@/components/marketplace/sell-with-us";
import { getFarms, getFeaturedFarms, getProducts } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  return { title: dict.meta.marketplace.title, description: dict.meta.marketplace.description };
}

export default async function MarketplacePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  const [farms, featuredFarms, products] = await Promise.all([
    getFarms(lang),
    getFeaturedFarms(lang),
    getProducts(lang),
  ]);

  return (
    <>
      <MarketplaceHero dict={dict.marketplace} />
      <FarmCarousel farms={featuredFarms} dict={dict.marketplace} />
      <ProductBrowser products={products} dict={dict.marketplace} lang={lang} />
      <AllFarms farms={farms} dict={dict.marketplace} />
      <SellWithUs dict={dict.marketplace} />
    </>
  );
}
