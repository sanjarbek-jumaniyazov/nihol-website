import type { Metadata } from "next";
import { PaulowniaHero } from "@/components/paulownia/paulownia-hero";
import { WhatsIncluded } from "@/components/paulownia/whats-included";
import { Timeline } from "@/components/paulownia/timeline";
import { ReturnsTable } from "@/components/paulownia/returns-table";
import { Testimonials } from "@/components/paulownia/testimonials";
import { Faq } from "@/components/paulownia/faq";
import { InvestmentForm } from "@/components/paulownia/investment-form";
import { getFaqs, getTestimonials } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  return { title: dict.meta.paulownia.title, description: dict.meta.paulownia.description };
}

export default async function PaulowniaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  const [faqs, testimonials] = await Promise.all([getFaqs(lang), getTestimonials(lang)]);

  return (
    <>
      <PaulowniaHero dict={dict} lang={lang} />
      <WhatsIncluded dict={dict} lang={lang} />
      <Timeline dict={dict} />
      <ReturnsTable dict={dict} />
      <Testimonials items={testimonials} dict={dict} />
      <Faq items={faqs} dict={dict.paulownia.faq} />
      <InvestmentForm dict={dict} lang={lang} />
    </>
  );
}
