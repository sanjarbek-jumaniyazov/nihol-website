import type { Metadata } from "next";
import { MarketplaceHero } from "@/components/marketplace/marketplace-hero";
import { FarmCarousel } from "@/components/marketplace/farm-carousel";
import { ProductBrowser } from "@/components/marketplace/product-browser";
import { AllFarms } from "@/components/marketplace/all-farms";
import { SellWithUs } from "@/components/marketplace/sell-with-us";
import { getFarms, getFeaturedFarms, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse flowers, decorative trees, fruit trees, and ornamental plants from vetted, independent local farm brands on Nihol.",
};

export default async function MarketplacePage() {
  const [farms, featuredFarms, products] = await Promise.all([
    getFarms(),
    getFeaturedFarms(),
    getProducts(),
  ]);

  return (
    <>
      <MarketplaceHero />
      <FarmCarousel farms={featuredFarms} />
      <ProductBrowser products={products} />
      <AllFarms farms={farms} />
      <SellWithUs />
    </>
  );
}
