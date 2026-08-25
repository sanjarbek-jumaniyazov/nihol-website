import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const STAGES = [
  { year: "Year 0", title: "Planting", detail: "Seedling planted, irrigation system installed." },
  { year: "Years 1–2", title: "Establishment", detail: "Monthly monitoring, fertilization, pest management." },
  { year: "Years 3–7", title: "Growth & Pruning", detail: "Professional pruning and thinning, quarterly agronomist visits." },
  { year: "Year 5", title: "Early Harvest Option", detail: "Lower price point — smaller trunk diameter, earlier liquidity." },
  { year: "Year 8", title: "Optimal Harvest", detail: "Premium pricing — greater trunk diameter and timber quality." },
];

export function Timeline() {
  return (
    <section className="bg-primary-50/60 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Growth Timeline"
          title="From seedling to harvest"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-5">
          {STAGES.map((stage, i) => (
            <div key={stage.year} className="relative">
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <div className="hidden h-px flex-1 bg-primary-200 sm:mt-5 sm:block sm:w-full sm:flex-none" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary-600">
                {stage.year}
              </p>
              <h3 className="mt-1 font-serif text-lg font-semibold text-primary-950">{stage.title}</h3>
              <p className="mt-1 text-sm text-primary-800/70">{stage.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
