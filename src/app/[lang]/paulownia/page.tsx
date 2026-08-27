import type { Metadata } from "next";
import { PackageBrowser } from "@/components/paulownia/package-browser";
import { Timeline } from "@/components/paulownia/timeline";
import { Testimonials } from "@/components/paulownia/testimonials";
import { Faq } from "@/components/paulownia/faq";
import { getFaqs, getTestimonials, getTreePackages } from "@/lib/data";
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
  const [packages, faqs, testimonials] = await Promise.all([
    getTreePackages(lang),
    getFaqs(lang),
    getTestimonials(lang),
  ]);

  return (
    <>
      <PackageBrowser packages={packages} dict={dict} lang={lang} />
      <Timeline dict={dict} />
      <Testimonials items={testimonials} dict={dict} />
      <Faq items={faqs} dict={dict.paulownia.faq} />
    </>
  );
}
