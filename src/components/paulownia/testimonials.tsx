import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Investor Stories" title="What our investors say" align="center" />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.id} className="rounded-2xl border border-primary-100 bg-white p-6">
              <Quote className="h-6 w-6 text-primary-300" />
              <blockquote className="mt-3 text-sm text-primary-900/90">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-primary-950">{t.name}</span>
                <span className="block text-primary-800/60">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-primary-800/50">
          Placeholder testimonials — replace with real investor stories before launch.
        </p>
      </Container>
    </section>
  );
}
