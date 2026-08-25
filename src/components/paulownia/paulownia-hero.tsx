import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";

export function PaulowniaHero() {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-background">
      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800">
            Paulownia Timber Investment
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl">
            Plant Today, Harvest Tomorrow
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-900/80">
            Grow your investment with Paulownia. Purchase a 2–3 year old seedling for{" "}
            {formatSom(499000)} and let our agronomists manage 8 years of complete tree care —
            from planting to harvest.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="#get-started" size="lg">
              Start with One Tree
            </LinkButton>
            <LinkButton href="#faq" variant="outline" size="lg">
              See FAQ
            </LinkButton>
          </div>
        </div>
        <PlaceholderImage
          seed="paulownia-hero"
          emoji="🌳"
          photo={IMAGES.paulowniaNursery}
          className="aspect-[4/3] w-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </Container>
    </section>
  );
}
