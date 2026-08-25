import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Mail, Phone, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { StarRating } from "@/components/ui/star-rating";
import { ProductCard } from "@/components/marketplace/product-card";
import { getFarmBySlug, getFarms, getProductsByFarm } from "@/lib/data";

export async function generateStaticParams() {
  const farms = await getFarms();
  return farms.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const farm = await getFarmBySlug(slug);
  if (!farm) return {};
  return { title: farm.name, description: farm.tagline };
}

export default async function FarmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const farm = await getFarmBySlug(slug);
  if (!farm) notFound();

  const products = await getProductsByFarm(farm.id);

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-background py-14">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
          <PlaceholderImage seed={farm.id} emoji="🏡" className="aspect-[4/3] w-full lg:col-span-1" />
          <div className="lg:col-span-2">
            <h1 className="font-serif text-3xl font-semibold text-primary-950 sm:text-4xl">{farm.name}</h1>
            <p className="mt-2 text-lg text-primary-800/80">{farm.tagline}</p>
            <p className="mt-4 max-w-2xl text-primary-900/80">{farm.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-primary-800/70">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {farm.location}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> Since {farm.founded}
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
            Products from {farm.name}
          </h2>
          {products.length === 0 ? (
            <p className="mt-6 text-primary-800/60">No products listed yet.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
