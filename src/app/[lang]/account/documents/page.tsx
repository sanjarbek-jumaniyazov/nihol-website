import { FileText } from "lucide-react";
import { BackHeader } from "@/components/ui/back-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { requireCustomer } from "@/lib/auth";
import { getMyOrders, getMyTrees } from "@/lib/data";
import { formatSom } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function DocumentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).account.documents;
  const customer = await requireCustomer(lang);
  const [orders, trees] = await Promise.all([getMyOrders(customer.id), getMyTrees(customer.id)]);

  const docs = [
    ...(trees.length
      ? [{ name: `Care agreement — ${trees.length} trees`, meta: `PLOT J-14 · ${trees.length} TREES` }]
      : []),
    ...orders.map((o) => ({ name: `Receipt ${o.id}`, meta: `${formatSom(o.totalSom, lang)} · ${o.paymentStatus.toUpperCase()}` })),
    { name: "Risk disclosure statement", meta: "VERSION 2.1" },
  ];

  return (
    <div className="pb-16">
      <BackHeader title={dict.title} backHref="/account" />
      <Container className="max-w-xl py-6">
        <Card className="overflow-hidden">
          {docs.map((d) => (
            <div key={d.name} className="flex items-center gap-3.5 border-b border-hairline p-4 last:border-b-0">
              <div className="flex h-10.5 w-8.5 flex-none items-center justify-center rounded bg-panel">
                <FileText className="h-4 w-4 text-label" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-ink">{d.name}</div>
                <div className="mt-0.5 font-mono text-[11px] text-label">{d.meta}</div>
              </div>
              <span className="text-xs font-semibold text-primary-700">PDF</span>
            </div>
          ))}
        </Card>
      </Container>
    </div>
  );
}
