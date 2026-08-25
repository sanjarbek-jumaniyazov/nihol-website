import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { Faq } from "@/components/paulownia/faq";
import { getSupportFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "Get in touch with Nihol by email, phone, or WhatsApp, or browse frequently asked questions.",
};

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hello@nihol.uz" },
  { icon: Phone, label: "Phone", value: "+998 90 123 45 67" },
  { icon: MessageCircle, label: "WhatsApp", value: "+998 90 123 45 67" },
  { icon: Clock, label: "Support hours", value: "Mon–Sat, 9:00–18:00 (GMT+5)" },
];

export default async function ContactPage() {
  const faqs = await getSupportFaqs();

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-background py-16 sm:py-20">
        <Container className="text-center">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl">
            Contact & Support
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-900/80">
            Questions about investing in Paulownia, an order, or selling on the marketplace? We&apos;re
            here to help.
          </p>
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
            <p className="text-xs text-primary-800/50">
              Placeholder contact details — replace with real company info. Live chat can be added
              here once a provider is chosen.
            </p>
          </div>

          <div className="rounded-2xl border border-primary-100 bg-white p-6 sm:p-8 lg:col-span-2">
            <SectionHeading title="Send us a message" />
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <Faq items={faqs} />
    </>
  );
}
