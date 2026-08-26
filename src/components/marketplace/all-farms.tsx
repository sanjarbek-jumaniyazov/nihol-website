import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FarmCard } from "@/components/marketplace/farm-card";
import type { Farm } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

export function AllFarms({ farms, dict }: { farms: Farm[]; dict: Dictionary["marketplace"] }) {
  return (
    <section className="bg-primary-50/60 py-16">
      <Container>
        <SectionHeading eyebrow={dict.allFarms.eyebrow} title={dict.allFarms.title} />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {farms.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      </Container>
    </section>
  );
}
