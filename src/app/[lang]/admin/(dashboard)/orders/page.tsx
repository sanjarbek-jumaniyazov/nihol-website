import { getOrders } from "@/lib/admin-data";
import { formatSom, cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  paid: "bg-primary-100 text-primary-800",
  pending: "bg-accent-100 text-accent-800",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-stone-200 text-stone-700",
};

export default async function AdminOrdersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).admin;
  const t = dict.orders;
  const orders = await getOrders();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-primary-950">{t.title}</h1>
      <p className="mt-1 text-sm text-primary-800/70">{t.description}</p>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-primary-100 bg-white p-8 text-center text-primary-800/60">
          {t.noOrders}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-primary-100 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-primary-950">{o.customer_name}</p>
                  <p className="text-sm text-primary-800/70">{o.customer_email}</p>
                  {o.customer_phone && (
                    <p className="text-sm text-primary-800/70">{o.customer_phone}</p>
                  )}
                  <p className="mt-1 text-sm text-primary-800/60">{o.delivery_address}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary-950">{formatSom(o.total_som, lang)}</p>
                  <span
                    className={cn(
                      "mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      STATUS_STYLE[o.payment_status] ?? "bg-primary-50 text-primary-700"
                    )}
                  >
                    {o.payment_status}
                  </span>
                  <p className="mt-1 text-xs text-primary-800/50">
                    {o.payment_provider ?? t.noProvider}
                    {o.payment_reference ? ` · ${o.payment_reference}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-primary-800/50">
                    {new Date(o.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {o.order_items.length > 0 && (
                <ul className="mt-4 divide-y divide-primary-100 border-t border-primary-100 pt-3 text-sm">
                  {o.order_items.map((item) => (
                    <li key={item.id} className="flex justify-between py-1.5 text-primary-800/80">
                      <span>
                        {item.products?.name ?? t.unknownProduct} × {item.quantity}
                      </span>
                      <span>{formatSom(item.unit_price_som * item.quantity, lang)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
