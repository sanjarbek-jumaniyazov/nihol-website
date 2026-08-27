import { Hero } from "@/components/home/hero";
import { SignedInStrip } from "@/components/home/signed-in-strip";
import { TrustStats } from "@/components/home/trust-stats";
import { PaulowniaOverview } from "@/components/home/paulownia-overview";
import { MarketplaceHighlights } from "@/components/home/marketplace-highlights";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getCurrentCustomer } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  // Only a real (Supabase-backed) session personalizes the hero — in mock mode
  // getCurrentCustomer() always resolves to the fixed demo identity, which
  // would otherwise hide the marketing hero from every anonymous visitor.
  const customer = isSupabaseConfigured ? await getCurrentCustomer() : null;

  return (
    <>
      {customer ? <SignedInStrip customer={customer} dict={dict} /> : <Hero dict={dict} />}
      <TrustStats dict={dict} />
      <PaulowniaOverview lang={lang} dict={dict} />
      <MarketplaceHighlights lang={lang} dict={dict} />
      <CtaBanner
        title={dict.home.cta.title}
        description={dict.home.cta.description}
        primaryHref="/paulownia"
        primaryLabel={dict.home.cta.investNow}
        secondaryHref="/marketplace"
        secondaryLabel={dict.home.cta.shopMarketplace}
      />
    </>
  );
}
