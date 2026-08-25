import { Container } from "@/components/ui/container";
import { getTrustStats } from "@/lib/data";

export async function TrustStats() {
  const stats = await getTrustStats();

  const items = [
    { label: "Years in Business", value: `${stats.yearsInBusiness}+` },
    { label: "Trees Planted", value: stats.treesPlanted.toLocaleString() },
    { label: "Happy Customers", value: stats.customers.toLocaleString() },
    { label: "Partner Farm Brands", value: `${stats.farmPartners}+` },
  ];

  return (
    <section className="border-y border-primary-100 bg-primary-900">
      <Container className="grid grid-cols-2 gap-8 py-10 text-center sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="font-serif text-3xl font-semibold text-white sm:text-4xl">{item.value}</div>
            <div className="mt-1 text-sm text-primary-200">{item.label}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}
