import type { Metadata } from "next";
import { Leaf, Sprout, Users, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { CtaBanner } from "@/components/shared/cta-banner";
import { IMAGES } from "@/lib/images";
import { getTrustStats } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const VALUE_ICONS = [Sprout, Users, ShieldCheck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  return { title: dict.meta.about.title, description: dict.meta.about.description };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  const t = dict.about;
  const stats = await getTrustStats();

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-background py-16 sm:py-20">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800">
              <Leaf className="h-4 w-4" /> {t.eyebrow}
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-6 text-lg text-primary-900/80">
              {t.description
                .replace("{years}", String(stats.yearsInBusiness))
                .replace("{trees}", stats.treesPlanted.toLocaleString())
                .replace("{farms}", String(stats.farmPartners))}
            </p>
          </div>
          <PlaceholderImage
            seed="about-hero"
            emoji="🌾"
            photo={IMAGES.orchard}
            className="aspect-[4/3] w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.missionEyebrow} title={t.missionTitle} align="center" />
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div key={v.title} className="rounded-2xl border border-primary-100 p-6">
                  <Icon className="h-6 w-6 text-primary-600" />
                  <h3 className="mt-3 font-serif text-lg font-semibold text-primary-950">{v.title}</h3>
                  <p className="mt-2 text-sm text-primary-800/80">{v.detail}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-primary-50/60 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t.teamEyebrow}
            title={t.teamTitle}
            description={t.teamDescription}
            align="center"
          />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {t.team.map((member, i) => (
              <div key={i} className="text-center">
                <PlaceholderImage seed={member.name + i} emoji="🧑‍🌾" className="mx-auto aspect-square w-32" />
                <h3 className="mt-4 font-medium text-primary-950">{member.name}</h3>
                <p className="text-sm text-primary-800/70">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title={t.cta.title}
        description={t.cta.description}
        primaryHref="/contact"
        primaryLabel={t.cta.button}
      />
    </>
  );
}
