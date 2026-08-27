import { BackHeader } from "@/components/ui/back-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/localized-link";
import { requireCustomer } from "@/lib/auth";
import { getMyOrders } from "@/lib/data";
import { formatSom } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function AccountOrdersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).account;
  const customer = await requireCustomer(lang);
  const orders = await getMyOrders(customer.id);

  return (
    <div className="pb-16">
      <BackHeader title={dict.orders.title} backHref="/account" />
      <Container className="max-w-xl py-6">
        {orders.length === 0 && <p className="text-sm text-muted">{dict.orders.empty}</p>}
        <div className="space-y-3">
          {orders.map((order) => {
            const itemsLabel = order.items.map((i) => i.name).join(" · ");
            const action =
              order.status === "delivered"
                ? { href: `/account/orders/${order.id}/review`, label: dict.orders.review }
                : { href: `/account/orders/${order.id}/track`, label: dict.orders.track };
            return (
              <Card key={order.id} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-label">{order.id}</span>
                  <span className="rounded-md bg-panel px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-ink">
                    {dict.orders.statusLabels[order.status]}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">{itemsLabel}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-primary-700">{formatSom(order.totalSom, lang)}</span>
                  <Link href={action.href} className="rounded-lg border border-hairline px-3.5 py-2 text-xs font-semibold text-primary-700">
                    {action.label}
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
