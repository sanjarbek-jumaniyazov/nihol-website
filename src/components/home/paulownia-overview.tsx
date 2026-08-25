import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { LinkButton } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";

const HIGHLIGHTS = [
  "Disease-free 2–3 year old seedling, professionally planted",
  "8 years of complete tree care & agronomist oversight",
  "Ongoing documentation — photos, health & growth records",
  "Harvest coordination and timber transport included",
];

export function PaulowniaOverview() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Link
          href="/paulownia"
          aria-label="See full Paulownia investment details"
          className="group block"
        >
          <PlaceholderImage
            seed="paulownia-home"
            emoji="🌱"
            photo={IMAGES.paulowniaNursery}
            className="aspect-[4/3] w-full transition-transform group-hover:scale-[1.01]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Link>

        <div>
          <SectionHeading
            eyebrow="Paulownia Timber Investment"
            title="Plant today, harvest tomorrow"
            description="Purchase a Paulownia seedling for 499,000 SOM and let our agronomists manage its full 8-year growth cycle — from planting to harvest."
          />

          <ul className="mt-6 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-primary-900/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-primary-800/70">
            Package price: <span className="font-semibold text-primary-900">{formatSom(499000)}</span> per tree.
            Expected selling price at maturity: $200–$600 USD per tree — an estimate, not a guarantee.
          </p>

          <LinkButton href="/paulownia" className="mt-8" size="lg">
            Learn About the Investment
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
