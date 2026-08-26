import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FarmCard } from "@/components/marketplace/farm-card";
import type { Farm } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

export function FarmCarousel({ farms, dict }: { farms: Farm[]; dict: Dictionary["marketplace"] }) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow={dict.farmCarousel.eyebrow} title={dict.farmCarousel.title} />
        <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {farms.map((farm) => (
            <div key={farm.id} className="w-72 flex-shrink-0 snap-start">
              <FarmCard farm={farm} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
