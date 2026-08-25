import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { IMAGES } from "@/lib/images";

export function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-primary-50 to-background">
      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800">
            Sustainable agribusiness, built on transparency
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl">
            Invest in Paulownia. <br /> Shop Local Plants.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-900/80">
            Grow a long-term timber investment with 8 years of guaranteed professional care, or
            shop flowers, trees, and plants delivered straight from trusted local farms.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/paulownia" size="lg">
              Invest Now
            </LinkButton>
            <LinkButton href="/marketplace" variant="outline" size="lg">
              Shop Marketplace
            </LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/paulownia" aria-label="Paulownia investment" className="block">
            <PlaceholderImage
              seed="hero-1"
              emoji="🌳"
              photo={IMAGES.paulowniaNursery}
              className="aspect-square"
              priority
            />
          </Link>
          <Link href="/marketplace" aria-label="Shop flowers" className="mt-8 block">
            <PlaceholderImage seed="hero-2" emoji="🌸" photo={IMAGES.roses} className="aspect-square" priority />
          </Link>
          <Link href="/marketplace" aria-label="Shop fruit trees" className="block">
            <PlaceholderImage seed="hero-3" emoji="🍎" photo={IMAGES.appleTree} className="aspect-square" />
          </Link>
          <Link href="/marketplace" aria-label="Shop indoor plants" className="mt-8 block">
            <PlaceholderImage seed="hero-4" emoji="🪴" photo={IMAGES.monstera} className="aspect-square" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
