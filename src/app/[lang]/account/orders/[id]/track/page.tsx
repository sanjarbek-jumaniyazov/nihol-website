import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/back-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/localized-link";
import { requireCustomer } from "@/lib/auth";
import { getMyOrders, getOrderTracking } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = (await params) as { lang: Locale; id: string };
  const dict = getDictionary(lang).account;
  const customer = await requireCustomer(lang);
  const [orders, steps] = await Promise.all([getMyOrders(customer.id), getOrderTracking(id, customer.id)]);
  const order = orders.find((o) => o.id === id);
  if (!order || !steps) notFound();

  return (
    <div className="pb-16">
      <BackHeader title={dict.tracking.title} backHref="/account/orders" meta={order.id} />
      <Container className="max-w-xl py-6">
        <Card className="p-4">
          <p className="text-sm font-semibold text-ink">{order.items.map((i) => i.name).join(" · ")}</p>
        </Card>

        <div className="mt-5">
          {steps.map((step, i) => (
            <div key={step.status} className="flex gap-3.5">
              <div className="flex w-5.5 flex-none flex-col items-center">
                <span className={"mt-1 h-3.5 w-3.5 rounded-full " + (step.done ? "bg-primary-700" : "bg-hairline")} />
                {i < steps.length - 1 && <span className="w-0.5 flex-1 bg-hairline" />}
              </div>
              <div className="pb-5">
                <p className={"text-sm font-semibold " + (step.done ? "text-ink" : "text-label")}>
                  {dict.tracking.steps[step.status]}
                </p>
                <p className="mt-0.5 text-xs text-label">{step.at ? new Date(step.at).toLocaleDateString(lang) : "—"}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          className="flex h-12 items-center justify-center rounded-2xl border border-hairline text-sm font-semibold text-primary-700"
        >
          {dict.tracking.contactFarm}
        </Link>
      </Container>
    </div>
  );
}
