import { getInquiries } from "@/lib/admin-data";
import { InquiryStatusSelect } from "@/components/admin/inquiry-status-select";
import { formatSom } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).admin;
  const t = dict.inquiries;
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-primary-950">{t.title}</h1>
      <p className="mt-1 text-sm text-primary-800/70">{t.description}</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-primary-100 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-primary-100 bg-primary-50/60 text-xs uppercase tracking-wide text-primary-700">
            <tr>
              <th className="px-4 py-3">{t.columns.name}</th>
              <th className="px-4 py-3">{t.columns.contact}</th>
              <th className="px-4 py-3">{t.columns.trees}</th>
              <th className="px-4 py-3">{t.columns.estTotal}</th>
              <th className="px-4 py-3">{t.columns.land}</th>
              <th className="px-4 py-3">{t.columns.submitted}</th>
              <th className="px-4 py-3">{t.columns.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-primary-800/60">
                  {t.noInquiries}
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
                  <td className="px-4 py-3 text-primary-800/80">{formatSom(499000 * i.tree_count, lang)}</td>
                  <td className="px-4 py-3 text-primary-800/80">
                    {dict.landOptionLabels[i.land_option as keyof typeof dict.landOptionLabels] ?? i.land_option}
                  </td>
                  <td className="px-4 py-3 text-primary-800/60">
                    {new Date(i.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <InquiryStatusSelect id={i.id} status={i.status} dict={dict.statusLabels} />
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
