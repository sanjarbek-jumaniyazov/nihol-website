import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/i18n/dictionaries";

export function MarketplaceHero({ dict }: { dict: Dictionary["marketplace"] }) {
  const t = dict.hero;

  return (
    <section className="bg-gradient-to-b from-primary-50 to-background py-16 sm:py-20">
      <Container className="text-center">
        <p className="mb-4 inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800">
          {t.eyebrow}
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl">
          {t.titleLine1} <br className="hidden sm:block" /> {t.titleLine2}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-900/80">{t.description}</p>
      </Container>
    </section>
  );
}
