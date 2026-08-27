import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ReturnCalculator } from "@/components/paulownia/return-calculator";
import { IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import { getTreePackageBySlug, getTreePackages } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, type Locale } from "@/i18n/config";

export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  for (const lang of locales) {
    const packages = await getTreePackages(lang);
    for (const pkg of packages) params.push({ lang, slug: pkg.slug });
  }
  return params;
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = getDictionary(lang);
  const t = dict.packages;
  const pkg = await getTreePackageBySlug(slug, lang);
  if (!pkg) notFound();

  return (
    <div className="pb-16">
      <div className="relative h-56 sm:h-72">
        <PlaceholderImage seed={pkg.id} emoji="🌳" photo={IMAGES.paulowniaNursery} className="h-full w-full rounded-none" />
        <span className="absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[11px] text-white">
          {t.plotLabel}
        </span>
      </div>

      <Container className="max-w-3xl">
        <div className="-mt-8 rounded-t-3xl bg-white pt-6">
          <h1 className="font-serif text-3xl text-ink">{pkg.name}</h1>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-lg font-medium text-primary-700">{formatSom(pkg.priceSom, lang)}</span>
            <span className="font-mono text-xs text-label">
              ≈ ${pkg.returnLowUsd}–${pkg.returnHighUsd}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{pkg.blurb}</p>

          <h2 className="mt-7 font-mono text-xs font-semibold uppercase tracking-widest text-label">
            {t.whatCovers.replace("{price}", formatSom(pkg.priceSom, lang))}
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {t.included.map((item) => (
              <div key={item.title} className="rounded-2xl bg-panel p-3">
                <div className="h-2 w-2 rotate-45 bg-primary-600" />
                <p className="mt-2 text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-7 font-mono text-xs font-semibold uppercase tracking-widest text-label">{t.timelineTitle}</h2>
          <div className="mt-3.5 space-y-4">
            {dict.paulownia.timeline.stages.map((stage) => (
              <div key={stage.year} className="flex gap-3.5">
                <div className="flex w-6 flex-none flex-col items-center">
                  <span className="h-3.5 w-3.5 rounded-full bg-primary-600" />
                  <span className="w-0.5 flex-1 bg-hairline" />
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-label">{stage.year}</span>
                    <span className="text-sm font-semibold text-ink">{stage.title}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{stage.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <ReturnCalculator pkg={pkg} dict={dict} lang={lang} />
          </div>

          <div className="mt-5 rounded-2xl border border-warning-500/30 bg-warning-50 p-3.5">
            <p className="text-sm font-semibold text-warning-700">{t.risksTitle}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-warning-700">{t.risksBody}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
