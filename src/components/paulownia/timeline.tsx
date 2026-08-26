import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/dictionaries";

export function Timeline({ dict }: { dict: Dictionary }) {
  const t = dict.paulownia.timeline;

  return (
    <section className="bg-primary-50/60 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} align="center" />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-5">
          {t.stages.map((stage, i) => (
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
