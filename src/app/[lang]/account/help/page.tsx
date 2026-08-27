import { BackHeader } from "@/components/ui/back-header";
import { Faq } from "@/components/paulownia/faq";
import { getSupportFaqs, getFaqs } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function AccountHelpPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  const [faqs, supportFaqs] = await Promise.all([getFaqs(lang), getSupportFaqs(lang)]);

  return (
    <div className="pb-16">
      <BackHeader title={dict.account.help.title} backHref="/account" />
      <Faq items={[...faqs, ...supportFaqs]} dict={dict.paulownia.faq} />
      <div className="mx-4 mt-6 rounded-2xl bg-primary-700 p-4 text-white sm:mx-auto sm:max-w-3xl">
        <p className="font-serif text-base">Talk to an agronomist</p>
        <p className="mt-1.5 text-sm text-white/75">{dict.contact.channels.supportHoursValue} · {dict.contact.channels.phone}: +998 71 200 11 22</p>
      </div>
    </div>
  );
}
