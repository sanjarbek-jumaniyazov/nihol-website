import { getContactMessages } from "@/lib/admin-data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function AdminContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const t = getDictionary(lang).admin.contactMessages;
  const messages = await getContactMessages();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-primary-950">{t.title}</h1>
      <p className="mt-1 text-sm text-primary-800/70">{t.description}</p>

      {messages.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-primary-100 bg-white p-8 text-center text-primary-800/60">
          {t.noMessages}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="rounded-2xl border border-primary-100 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-primary-950">{m.full_name}</p>
                  <p className="text-sm text-primary-800/70">{m.email}</p>
                </div>
                <p className="text-xs text-primary-800/50">{new Date(m.created_at).toLocaleString()}</p>
              </div>
              {m.subject && <p className="mt-2 text-sm font-medium text-primary-900">{m.subject}</p>}
              <p className="mt-1 text-sm text-primary-800/80">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
