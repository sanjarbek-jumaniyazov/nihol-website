import { notFound } from "next/navigation";
import { CertificateView } from "@/components/grove/certificate-view";
import { requireCustomer } from "@/lib/auth";
import { getMyTrees } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function TreeCertificatePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = (await params) as { lang: Locale; id: string };
  const dict = getDictionary(lang);
  const customer = await requireCustomer(lang);
  const trees = await getMyTrees(customer.id);
  const initial = trees.find((t) => t.id === id);
  if (!initial) notFound();

  return <CertificateView trees={trees} initialTreeId={id} customerName={customer.fullName} dict={dict} lang={lang} />;
}
