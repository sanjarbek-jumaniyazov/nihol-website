import type { Metadata } from "next";
import { PaulowniaHero } from "@/components/paulownia/paulownia-hero";
import { WhatsIncluded } from "@/components/paulownia/whats-included";
import { Timeline } from "@/components/paulownia/timeline";
import { ReturnsTable } from "@/components/paulownia/returns-table";
import { Testimonials } from "@/components/paulownia/testimonials";
import { Faq } from "@/components/paulownia/faq";
import { InvestmentForm } from "@/components/paulownia/investment-form";
import { getFaqs, getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Paulownia Timber Investment",
  description:
    "Invest in Paulownia tree farming for 499,000 SOM per tree — includes 8 years of professional care, agronomist oversight, and harvest coordination. Expected return $200–$600 USD per tree, not guaranteed.",
};

export default async function PaulowniaPage() {
  const [faqs, testimonials] = await Promise.all([getFaqs(), getTestimonials()]);

  return (
    <>
      <PaulowniaHero />
      <WhatsIncluded />
      <Timeline />
      <ReturnsTable />
      <Testimonials items={testimonials} />
      <Faq items={faqs} />
      <InvestmentForm />
    </>
  );
}
