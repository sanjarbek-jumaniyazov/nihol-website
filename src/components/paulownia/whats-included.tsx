import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatSom } from "@/lib/utils";

const ITEMS = [
  "High-quality Paulownia seedling (2–3 years old, disease-free)",
  "Professional planting on your land (or on our partner farm)",
  "Monthly health monitoring and pest management",
  "Irrigation system setup & maintenance (Year 1)",
  "Seasonal fertilizer application (NPK, micronutrients)",
  "Professional pruning and thinning (Years 3–7)",
  "Disease prevention & early detection",
  "Soil health management",
  "Expert agronomist oversight (quarterly visits)",
  "Tree documentation (photos, health records, growth tracking)",
  "Harvest coordination (Year 8)",
  "Transportation of timber to buyer (included in package)",
];

export function WhatsIncluded() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What's Included"
          title={`Everything covered in ${formatSom(499000)}`}
          description="One upfront payment covers the full 8-year growth cycle — no surprise fees along the way."
          align="center"
        />

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <span className="text-primary-900/90">{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
