import type { Metadata } from "next";
import { Leaf, Sprout, Users, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getTrustStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nihol's mission, our agronomist team, and why we built both a Paulownia investment product and a local plant marketplace.",
};

const TEAM = [
  {
    name: "Placeholder Name",
    role: "Lead Agronomist, 15+ years in commercial forestry",
  },
  {
    name: "Placeholder Name",
    role: "Farm Operations Manager, orchard & nursery management",
  },
  {
    name: "Placeholder Name",
    role: "Marketplace Partnerships Lead",
  },
];

const VALUES = [
  {
    icon: Sprout,
    title: "Why Paulownia",
    detail:
      "Paulownia is one of the fastest-growing hardwood trees, making it well suited to long-term timber investment with a defined, multi-year growth cycle we can actively manage and document.",
  },
  {
    icon: Users,
    title: "Why the marketplace model",
    detail:
      "Independent farm brands often struggle to reach customers beyond their local area. Nihol aggregates trusted growers into one platform so customers get variety and farms get reach.",
  },
  {
    icon: ShieldCheck,
    title: "Why transparency matters",
    detail:
      "Agricultural investing carries real risk. We disclose it clearly, document tree health continuously, and never present estimated returns as guarantees.",
  },
];

export default async function AboutPage() {
  const stats = await getTrustStats();

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-background py-16 sm:py-20">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800">
              <Leaf className="h-4 w-4" /> About Nihol
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl">
              Sustainable agribusiness, built on trust
            </h1>
            <p className="mt-6 text-lg text-primary-900/80">
              Nihol exists to make two things possible: long-term, professionally managed tree
              farming as an investment, and a fair, direct route to market for independent farm
              brands. Over {stats.yearsInBusiness} years we&apos;ve planted{" "}
              {stats.treesPlanted.toLocaleString()} trees and worked with {stats.farmPartners}+ farm
              partners.
            </p>
          </div>
          <PlaceholderImage seed="about-hero" emoji="🌾" className="aspect-[4/3] w-full" />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Our Mission" title="Why we do this" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-primary-100 p-6">
                <v.icon className="h-6 w-6 text-primary-600" />
                <h3 className="mt-3 font-serif text-lg font-semibold text-primary-950">{v.title}</h3>
                <p className="mt-2 text-sm text-primary-800/80">{v.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary-50/60 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Team"
            title="Agronomists behind every tree"
            description="Placeholder team profiles — replace with real credentials and photos."
            align="center"
          />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <PlaceholderImage seed={member.name} emoji="🧑‍🌾" className="mx-auto aspect-square w-32" />
                <h3 className="mt-4 font-medium text-primary-950">{member.name}</h3>
                <p className="text-sm text-primary-800/70">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Have questions about investing or selling with us?"
        description="Our team is happy to walk you through the details."
        primaryHref="/contact"
        primaryLabel="Contact Us"
      />
    </>
  );
}
