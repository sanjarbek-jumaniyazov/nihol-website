import { getInquiries } from "@/lib/admin-data";
import { InquiryStatusSelect } from "@/components/admin/inquiry-status-select";
import { formatSom } from "@/lib/utils";

export const dynamic = "force-dynamic";

const LAND_OPTION_LABEL: Record<string, string> = {
  "own-land": "Own land",
  "partner-farm": "Partner farm",
};

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-primary-950">Investment Inquiries</h1>
      <p className="mt-1 text-sm text-primary-800/70">
        Everyone who submitted the Paulownia investment form, most recent first.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-primary-100 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-primary-100 bg-primary-50/60 text-xs uppercase tracking-wide text-primary-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Trees</th>
              <th className="px-4 py-3">Est. total</th>
              <th className="px-4 py-3">Land</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-primary-800/60">
                  No inquiries yet.
                </td>
              </tr>
            ) : (
              inquiries.map((i) => (
                <tr key={i.id}>
                  <td className="px-4 py-3 font-medium text-primary-950">{i.full_name}</td>
                  <td className="px-4 py-3 text-primary-800/80">
                    <div>{i.email}</div>
                    {i.phone && <div className="text-xs text-primary-800/60">{i.phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-primary-800/80">{i.tree_count}</td>
                  <td className="px-4 py-3 text-primary-800/80">{formatSom(499000 * i.tree_count)}</td>
                  <td className="px-4 py-3 text-primary-800/80">
                    {LAND_OPTION_LABEL[i.land_option] ?? i.land_option}
                  </td>
                  <td className="px-4 py-3 text-primary-800/60">
                    {new Date(i.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <InquiryStatusSelect id={i.id} status={i.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
