import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

export function Testimonials({ items, dict }: { items: Testimonial[]; dict: Dictionary }) {
  const t = dict.paulownia.testimonials;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} align="center" />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="rounded-2xl border border-primary-100 bg-white p-6">
              <Quote className="h-6 w-6 text-primary-300" />
              <blockquote className="mt-3 text-sm text-primary-900/90">{item.quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-primary-950">{item.name}</span>
                <span className="block text-primary-800/60">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-primary-800/50">{t.placeholder}</p>
      </Container>
    </section>
  );
}
