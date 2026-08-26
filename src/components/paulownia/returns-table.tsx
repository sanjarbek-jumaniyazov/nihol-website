import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/dictionaries";

export function ReturnsTable({ dict }: { dict: Dictionary }) {
  const t = dict.paulownia.returns;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} align="center" />

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-primary-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary-900 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">{t.harvestTiming}</th>
                <th className="px-6 py-4 font-semibold">{t.estimatedPrice}</th>
                <th className="px-6 py-4 font-semibold">{t.why}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100 bg-white">
              {t.rows.map((row) => (
                <tr key={row.years}>
                  <td className="px-6 py-4 font-medium text-primary-950">{row.years}</td>
                  <td className="px-6 py-4 font-semibold text-primary-700">{row.price}</td>
                  <td className="px-6 py-4 text-primary-800/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-accent-300 bg-accent-50 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
          <p className="text-sm text-accent-900">
            <strong>{t.disclaimerLabel}</strong> {t.disclaimer}
          </p>
        </div>
      </Container>
    </section>
  );
}
