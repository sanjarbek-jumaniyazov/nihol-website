import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FarmCard } from "@/components/marketplace/farm-card";
import type { Farm } from "@/lib/types";

export function FarmCarousel({ farms }: { farms: Farm[] }) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Featured Brands" title="Meet the farms on Nihol" />
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
