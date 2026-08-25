import Link from "next/link";
import { Sprout, ShoppingBag, TreePine, Wallet } from "lucide-react";
import { getAdminStats } from "@/lib/admin-data";
import { formatSom } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  converted: "Converted",
  closed: "Closed",
};

export default async function AdminOverviewPage() {
  const stats = await getAdminStats();

  const cards = [
    { label: "Investment inquiries", value: stats.inquiryCount, icon: Sprout },
    { label: "Trees requested", value: stats.treesRequested, icon: TreePine },
    { label: "Marketplace orders", value: stats.orderCount, icon: ShoppingBag },
    { label: "Paid revenue", value: formatSom(stats.revenueSom), icon: Wallet },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-primary-950">Overview</h1>
      <p className="mt-1 text-sm text-primary-800/70">
        Snapshot of Paulownia investment interest and marketplace activity.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-primary-100 bg-white p-5">
            <c.icon className="h-5 w-5 text-primary-600" />
            <p className="mt-3 text-2xl font-semibold text-primary-950">{c.value}</p>
            <p className="text-sm text-primary-800/70">{c.label}</p>
          </div>
        ))}
      </div>

      {Object.keys(stats.inquiriesByStatus).length > 0 && (
        <div className="mt-6 rounded-2xl border border-primary-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-primary-950">Inquiries by status</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {Object.entries(stats.inquiriesByStatus).map(([status, count]) => (
              <span
                key={status}
                className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-800"
              >
                {STATUS_LABEL[status] ?? status}: <strong>{count}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary-950">Recent inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs text-primary-600 hover:underline">
              View all
            </Link>
          </div>
          {stats.recentInquiries.length === 0 ? (
            <p className="mt-4 text-sm text-primary-800/60">No inquiries yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-primary-100">
              {stats.recentInquiries.map((i) => (
                <li key={i.id} className="py-3 text-sm">
                  <p className="font-medium text-primary-950">{i.full_name}</p>
                  <p className="text-primary-800/70">
                    {i.tree_count} tree{i.tree_count > 1 ? "s" : ""} · {i.email}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-primary-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary-950">Recent orders</h2>
            <Link href="/admin/orders" className="text-xs text-primary-600 hover:underline">
              View all
            </Link>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="mt-4 text-sm text-primary-800/60">No orders yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-primary-100">
              {stats.recentOrders.map((o) => (
                <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-primary-950">{o.customer_name}</p>
                    <p className="text-primary-800/70">{o.payment_status}</p>
                  </div>
                  <span className="font-semibold text-primary-900">{formatSom(o.total_som)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
