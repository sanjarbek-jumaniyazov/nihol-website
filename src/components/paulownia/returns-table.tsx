import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const ROWS = [
  { years: "5 years", price: "$200–$300 USD", note: "Lower price — smaller trunk diameter, plywood-grade wood" },
  { years: "6–7 years", price: "$300–$450 USD", note: "Mid-range — improving trunk diameter and wood grade" },
  { years: "8 years (optimal)", price: "$450–$600 USD", note: "Premium price — maximum trunk diameter, construction/premium-grade wood" },
];

export function ReturnsTable() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Expected Return"
          title="What a tree could be worth at harvest"
          description="Selling price depends on tree maturity, trunk diameter, wood grade, and market demand at time of sale."
          align="center"
        />

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-primary-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary-900 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Harvest Timing</th>
                <th className="px-6 py-4 font-semibold">Estimated Price / Tree</th>
                <th className="px-6 py-4 font-semibold">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100 bg-white">
              {ROWS.map((row) => (
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
            <strong>Important disclaimer:</strong> Prices are estimates based on current global
            timber markets and are <strong>not guaranteed</strong>. Actual returns depend on market
            conditions, tree health, and harvest timing. Past performance does not guarantee future
            results. Paulownia farming involves agricultural risks including weather, pests, and
            disease.
          </p>
        </div>
      </Container>
    </section>
  );
}
