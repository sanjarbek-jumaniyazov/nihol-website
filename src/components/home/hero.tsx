import { Link } from "@/components/ui/localized-link";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { IMAGES } from "@/lib/images";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.home.hero;

  return (
    <section className="overflow-hidden bg-gradient-to-b from-primary-50 to-background">
      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800">
            {t.eyebrow}
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl">
            {t.titleLine1} <br /> {t.titleLine2}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-900/80">{t.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/paulownia" size="lg">
              {t.investNow}
            </LinkButton>
            <LinkButton href="/marketplace" variant="outline" size="lg">
              {t.shopMarketplace}
            </LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/paulownia" aria-label={t.altPaulownia} className="block">
            <PlaceholderImage
              seed="hero-1"
              emoji="🌳"
              photo={IMAGES.paulowniaNursery}
              className="aspect-square"
              priority
            />
          </Link>
          <Link href="/marketplace" aria-label={t.altFlowers} className="mt-8 block">
            <PlaceholderImage seed="hero-2" emoji="🌸" photo={IMAGES.roses} className="aspect-square" priority />
          </Link>
          <Link href="/marketplace" aria-label={t.altFruitTrees} className="block">
            <PlaceholderImage seed="hero-3" emoji="🍎" photo={IMAGES.appleTree} className="aspect-square" />
          </Link>
          <Link href="/marketplace" aria-label={t.altIndoorPlants} className="mt-8 block">
            <PlaceholderImage seed="hero-4" emoji="🪴" photo={IMAGES.monstera} className="aspect-square" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
