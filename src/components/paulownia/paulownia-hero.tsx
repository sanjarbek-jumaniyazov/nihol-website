import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function PaulowniaHero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.paulownia.hero;
  const price = formatSom(499000, lang);

  return (
    <section className="bg-gradient-to-b from-primary-50 to-background">
      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800">
            {t.eyebrow}
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-900/80">{t.description.replace("{price}", price)}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="#get-started" size="lg">
              {t.startWithOneTree}
            </LinkButton>
            <LinkButton href="#faq" variant="outline" size="lg">
              {t.seeFaq}
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
