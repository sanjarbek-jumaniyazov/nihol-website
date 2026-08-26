import { Link } from "@/components/ui/localized-link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { LinkButton } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function PaulowniaOverview({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home.paulowniaOverview;
  const price = formatSom(499000, lang);

  return (
    <section className="py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Link href="/paulownia" aria-label={t.altSeeDetails} className="group block">
          <PlaceholderImage
            seed="paulownia-home"
            emoji="🌱"
            photo={IMAGES.paulowniaNursery}
            className="aspect-[4/3] w-full transition-transform group-hover:scale-[1.01]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Link>

        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description.replace("{price}", price)} />

          <ul className="mt-6 space-y-3">
            {t.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-primary-900/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-primary-800/70">{t.priceNote.replace("{price}", price)}</p>

          <LinkButton href="/paulownia" className="mt-8" size="lg">
            {t.learnAboutInvestment}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
