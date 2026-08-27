import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/localized-link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { IMAGES } from "@/lib/images";
import { requireCustomer } from "@/lib/auth";
import { getTree, getTreeCareLog } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const STAGE_BARS = [
  { key: "seedling" as const, h: "26px" },
  { key: "sapling" as const, h: "52px" },
  { key: "maturing" as const, h: "76px" },
  { key: "harvest_ready" as const, h: "100px" },
];

export default async function TreeDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = (await params) as { lang: Locale; id: string };
  const dict = getDictionary(lang);
  const t = dict.grove.tree;
  const customer = await requireCustomer(lang);
  const tree = await getTree(id, customer.id);
  if (!tree) notFound();
  const careLog = await getTreeCareLog(tree.id);

  const stageIndex = STAGE_BARS.findIndex((s) => s.key === tree.stage);

  return (
    <div className="pb-16">
      <div className="relative h-56">
        <PlaceholderImage seed={tree.id} emoji="🌳" photo={IMAGES.paulowniaNursery} className="h-full w-full rounded-none" />
        <Link
          href="/grove"
          className="absolute left-4 top-4.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-primary-700"
        >
          ‹
        </Link>
      </div>

      <Container className="max-w-2xl">
        <div className="-mt-5 rounded-t-3xl bg-white pt-5">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl text-ink">
              {dict.grove.impact.trees.replace(/s$/, "")} {tree.code}
            </h1>
            <span className="rounded-md bg-success-50 px-2.5 py-1.5 text-[9px] font-bold text-success-700">{t.stages[tree.stage]}</span>
          </div>
          <p className="mt-2 text-sm text-muted">
            {t.plot} · {t.planted} {new Date(tree.plantedAt).toLocaleDateString(lang)} · {(tree.heightCm / 100).toFixed(1)} m · {t.girth} {tree.girthCm} cm
          </p>

          <div className="mt-4.5 flex gap-2.5">
            <div className="flex-1 rounded-2xl bg-panel p-3">
              <p className="font-mono text-[9px] uppercase tracking-widest text-label">{t.harvest}</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{tree.harvestEstimateDate ? new Date(tree.harvestEstimateDate).toLocaleDateString(lang, { month: "short", year: "numeric" }) : "—"}</p>
            </div>
            <div className="flex-1 rounded-2xl bg-panel p-3">
              <p className="font-mono text-[9px] uppercase tracking-widest text-label">{t.projected}</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">$200–600</p>
            </div>
            <div className="flex-1 rounded-2xl bg-panel p-3">
              <p className="font-mono text-[9px] uppercase tracking-widest text-label">{t.co2}</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{tree.co2KgTarget} kg</p>
            </div>
          </div>

          <h2 className="mt-6 font-mono text-xs font-semibold uppercase tracking-widest text-label">{t.growthStagesTitle}</h2>
          <div className="mt-3.5 flex items-end gap-2.5" style={{ height: 120 }}>
            {STAGE_BARS.map((s, i) => (
              <div key={s.key} className="flex flex-1 flex-col items-center justify-end gap-2">
                <div
                  className={"w-full rounded-t-lg " + (i <= stageIndex ? "bg-primary-600" : "bg-hairline")}
                  style={{ height: s.h }}
                />
                <span className={"text-center font-mono text-[9px] " + (i <= stageIndex ? "text-primary-700" : "text-label")}>
                  {t.stages[s.key]}
                </span>
              </div>
            ))}
          </div>

          <h2 className="mt-6 font-mono text-xs font-semibold uppercase tracking-widest text-label">{t.careLogTitle}</h2>
          <div className="mt-3">
            {careLog.length === 0 && <p className="text-sm text-muted">—</p>}
            {careLog.map((entry, i) => (
              <div key={entry.id} className="flex gap-3.5">
                <div className="flex w-5 flex-none flex-col items-center">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary-600" />
                  {i < careLog.length - 1 && <span className="w-0.5 flex-1 bg-hairline" />}
                </div>
                <div className="pb-4">
                  <p className="font-mono text-xs text-label">{new Date(entry.loggedAt).toLocaleDateString(lang)}</p>
                  <p className="mt-1 text-sm text-ink">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2.5">
            <Link
              href={`/grove/trees/${tree.id}/certificate`}
              className="flex-1 rounded-2xl bg-[#14260A] py-3.5 text-center text-sm font-semibold text-accent-400"
            >
              {t.ownershipCard}
            </Link>
            <Link href="/paulownia" className="flex-1 rounded-2xl bg-primary-700 py-3.5 text-center text-sm font-semibold text-white">
              {t.plantAnother}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
