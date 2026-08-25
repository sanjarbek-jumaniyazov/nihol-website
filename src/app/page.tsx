import { Hero } from "@/components/home/hero";
import { TrustStats } from "@/components/home/trust-stats";
import { PaulowniaOverview } from "@/components/home/paulownia-overview";
import { MarketplaceHighlights } from "@/components/home/marketplace-highlights";
import { CtaBanner } from "@/components/shared/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <PaulowniaOverview />
      <MarketplaceHighlights />
      <CtaBanner
        title="Ready to get started?"
        description="Whether you're planting your first Paulownia tree or shopping for your garden, Nihol makes it easy."
        primaryHref="/paulownia"
        primaryLabel="Invest Now"
        secondaryHref="/marketplace"
        secondaryLabel="Shop Marketplace"
      />
    </>
  );
}
