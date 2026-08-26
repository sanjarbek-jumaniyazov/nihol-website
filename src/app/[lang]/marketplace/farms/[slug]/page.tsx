import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Mail, Phone, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { StarRating } from "@/components/ui/star-rating";
import { ProductCard } from "@/components/marketplace/product-card";
import { FARM_IMAGES } from "@/lib/images";
import { getFarmBySlug, getFarms, getProductsByFarm } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, type Locale } from "@/i18n/config";

export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  for (const lang of locales) {
    const farms = await getFarms(lang);
    for (const f of farms) params.push({ lang, slug: f.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const farm = await getFarmBySlug(slug, lang);
  if (!farm) return {};
  return { title: farm.name, description: farm.tagline };
}

export default async function FarmPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = getDictionary(lang);
  const farm = await getFarmBySlug(slug, lang);
  if (!farm) notFound();

  const products = await getProductsByFarm(farm.id, lang);

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-background py-14">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
          <PlaceholderImage
            seed={farm.id}
            emoji="🏡"
            photo={FARM_IMAGES[farm.slug]}
            className="aspect-[4/3] w-full lg:col-span-1"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />
          <div className="lg:col-span-2">
            <h1 className="font-serif text-3xl font-semibold text-primary-950 sm:text-4xl">{farm.name}</h1>
            <p className="mt-2 text-lg text-primary-800/80">{farm.tagline}</p>
            <p className="mt-4 max-w-2xl text-primary-900/80">{farm.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-primary-800/70">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {farm.location}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> {dict.marketplace.farmPage.since} {farm.founded}
              </span>
              <StarRating rating={farm.rating} reviewCount={farm.reviewCount} />
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-primary-800/70">
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" /> {farm.slug}@nihol.uz
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" /> +998 90 000 00 00
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="font-serif text-2xl font-semibold text-primary-950">
            {dict.marketplace.farmPage.productsFrom.replace("{name}", farm.name)}
          </h2>
          {products.length === 0 ? (
            <p className="mt-6 text-primary-800/60">{dict.marketplace.farmPage.noProductsListed}</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} dict={dict.marketplace} lang={lang} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
