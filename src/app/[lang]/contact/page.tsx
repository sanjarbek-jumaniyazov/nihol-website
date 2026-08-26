import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { Faq } from "@/components/paulownia/faq";
import { getSupportFaqs } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  return { title: dict.meta.contact.title, description: dict.meta.contact.description };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  const t = dict.contact;
  const faqs = await getSupportFaqs(lang);

  const CHANNELS = [
    { icon: Mail, label: t.channels.email, value: "hello@nihol.uz" },
    { icon: Phone, label: t.channels.phone, value: "+998 90 123 45 67" },
    { icon: MessageCircle, label: t.channels.whatsapp, value: "+998 90 123 45 67" },
    { icon: Clock, label: t.channels.supportHours, value: t.channels.supportHoursValue },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-background py-16 sm:py-20">
        <Container className="text-center">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-900/80">{t.description}</p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            {CHANNELS.map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <c.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                <div>
                  <p className="text-sm text-primary-800/60">{c.label}</p>
                  <p className="font-medium text-primary-950">{c.value}</p>
                </div>
              </div>
            ))}
            <p className="text-xs text-primary-800/50">{t.disclaimer}</p>
          </div>

          <div className="rounded-2xl border border-primary-100 bg-white p-6 sm:p-8 lg:col-span-2">
            <SectionHeading title={t.sendMessage} />
            <div className="mt-6">
              <ContactForm dict={t.form} />
            </div>
          </div>
        </Container>
      </section>

      <Faq items={faqs} dict={dict.paulownia.faq} />
    </>
  );
}
