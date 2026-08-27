"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Link } from "@/components/ui/localized-link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { IMAGES } from "@/lib/images";
import { formatSom, formatUsdRange } from "@/lib/utils";
import type { TreePackage } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Filter = "all" | "oneTree" | "fiveTrees" | "twentyPlusTrees" | "gift";

const PACKAGE_IMAGES = [IMAGES.paulowniaSeedling, IMAGES.paulowniaNursery, IMAGES.paulowniaFlowers];

export function PackageBrowser({
  packages,
  dict,
  lang,
}: {
  packages: TreePackage[];
  dict: Dictionary;
  lang: Locale;
}) {
  const t = dict.packages;
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = packages.filter((p) => {
    if (filter === "all") return true;
    if (filter === "gift") return p.tag.toUpperCase().includes("GIFT");
    if (filter === "oneTree") return p.quantity === 1 && !p.tag.toUpperCase().includes("GIFT");
    if (filter === "fiveTrees") return p.quantity === 5;
    return p.quantity >= 20;
  });

  const FILTERS: { id: Filter; label: string }[] = [
    { id: "all", label: t.filters.all },
    { id: "oneTree", label: t.filters.oneTree },
    { id: "fiveTrees", label: t.filters.fiveTrees },
    { id: "twentyPlusTrees", label: t.filters.twentyPlusTrees },
    { id: "gift", label: t.filters.gift },
  ];

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">{t.title}</h1>
        <p className="mt-2 max-w-xl text-muted">{t.subtitle.replace("{price}", formatSom(499000, lang))}</p>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <Chip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </Chip>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {filtered.map((pkg, i) => (
            <Link key={pkg.id} href={`/paulownia/packages/${pkg.slug}`}>
              <Card className="flex gap-4 p-4 transition-shadow hover:shadow-md">
                <PlaceholderImage
                  seed={pkg.id}
                  emoji="🌳"
                  photo={PACKAGE_IMAGES[i % PACKAGE_IMAGES.length]}
                  className="h-21 w-21 flex-none rounded-2xl"
                  sizes="84px"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-ink">{pkg.name}</h3>
                    {pkg.tag && (
                      <span className="rounded-md bg-accent-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-accent-700">
                        {pkg.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">{pkg.blurb}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-sm font-medium text-ink">{formatSom(pkg.priceSom, lang)}</span>
                    <span className="font-mono text-xs text-label">{formatUsdRange(50, 50)}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex gap-2.5 rounded-2xl border border-warning-500/30 bg-warning-50 p-4">
          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-warning-500" />
          <p className="text-sm text-warning-700">{t.disclaimer}</p>
        </div>
      </Container>
    </section>
  );
}
