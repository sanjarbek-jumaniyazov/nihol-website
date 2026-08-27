"use client";

import { useState } from "react";
import { Link } from "@/components/ui/localized-link";
import { Card } from "@/components/ui/card";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import { TREE_USD } from "@/lib/investment";
import type { Tree, Order } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Tab = "trees" | "orders" | "impact";

const BADGE_STYLE: Record<string, { bg: string; fg: string; dot: string }> = {
  greenInvestor: { bg: "bg-success-50", fg: "text-success-700", dot: "bg-success-600" },
  marketplaceRegular: { bg: "bg-accent-100", fg: "text-accent-700", dot: "bg-accent-400" },
  tonneClub: { bg: "bg-white", fg: "text-label", dot: "bg-hairline" },
  groveKeeper: { bg: "bg-white", fg: "text-label", dot: "bg-hairline" },
};

export function GroveTabs({
  trees,
  orders,
  dict,
  lang,
  initialTab,
}: {
  trees: Tree[];
  orders: Order[];
  dict: Dictionary;
  lang: Locale;
  initialTab: Tab;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const t = dict.grove;

  const investedUsd = trees.length * TREE_USD;
  const co2 = trees.length * 500;
  const TABS: Tab[] = ["trees", "orders", "impact"];

  return (
    <div>
      <div className="flex gap-2 pt-4">
        {TABS.map((id) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={"flex-1 rounded-xl py-2.5 text-sm font-semibold " + (tab === id ? "bg-primary-700 text-white" : "bg-panel text-ink/70")}
          >
            {t.tabs[id]}
          </button>
        ))}
      </div>

      {tab === "trees" && (
        <div className="mt-5 space-y-4">
          {trees.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-hairline p-8 text-center">
              <p className="text-sm text-muted">{t.empty}</p>
              <Link href="/paulownia" className="mt-3 inline-block rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white">
                {t.browsePackages}
              </Link>
            </div>
          ) : (
            <>
              <Card className="p-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-base text-ink">{t.portfolio.title}</span>
                  <span className="font-mono text-[10px] text-label">{t.portfolio.harvestIn.replace("{days}", "2154")}</span>
                </div>
                <div className="mt-3.5 flex gap-4.5">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-label">{t.portfolio.invested}</div>
                    <div className="mt-1.5 font-serif text-xl text-ink">${investedUsd}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-label">{t.portfolio.projected}</div>
                    <div className="mt-1.5 font-serif text-xl text-primary-700">${trees.length * 200}–${trees.length * 600}</div>
                  </div>
                </div>
                <div className="mt-3.5 h-2 overflow-hidden rounded-full bg-panel">
                  <div className="h-full w-1/4 bg-gradient-to-r from-primary-600 to-success-600" />
                </div>
              </Card>

              <div className="space-y-3">
                {trees.map((tree) => {
                  const pct = Math.min(100, Math.round((tree.heightCm / 800) * 100));
                  return (
                    <Link key={tree.id} href={`/grove/trees/${tree.id}`}>
                      <Card className="flex gap-3 p-3.5">
                        <PlaceholderImage seed={tree.id} emoji="🌳" photo={IMAGES.paulowniaSeedling} className="h-17.5 w-17.5 flex-none" sizes="70px" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm font-medium text-ink">{tree.code}</span>
                            <span className="rounded-md bg-success-50 px-1.5 py-0.5 text-[9px] font-bold text-success-700">
                              {t.tree.stages[tree.stage]}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted">
                            {(tree.heightCm / 100).toFixed(1)} m · {t.tree.planted} {new Date(tree.plantedAt).toLocaleDateString(lang, { month: "short", year: "numeric" })}
                          </p>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-panel">
                            <div className="h-full bg-primary-600" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              <Card className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-ink">{t.quarterlyReport.title}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink/80">{t.quarterlyReport.body}</p>
                </div>
                <div className="flex gap-2 px-4 pb-4">
                  {[IMAGES.paulowniaNursery, IMAGES.paulowniaFlowers, IMAGES.paulowniaSeedling].map((img, i) => (
                    <PlaceholderImage key={i} seed={`report-${i}`} emoji="🌳" photo={img} className="h-18.5 flex-1" sizes="120px" />
                  ))}
                </div>
                <div className="flex items-center gap-2.5 border-t border-hairline p-4">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-700 text-xs font-semibold text-white">RO</div>
                  <p className="text-xs text-muted">{t.quarterlyReport.agronomist}</p>
                </div>
              </Card>
            </>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div className="mt-5 space-y-3">
          {orders.length === 0 && <p className="text-sm text-muted">{dict.account.orders.empty}</p>}
          {orders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-label">{order.id}</span>
                <span className="rounded-md bg-panel px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-ink">
                  {dict.account.orders.statusLabels[order.status]}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-ink">{order.items.map((i) => i.name).join(" · ")}</p>
              <p className="mt-3 font-mono text-sm font-semibold text-primary-700">{formatSom(order.totalSom, lang)}</p>
            </Card>
          ))}
        </div>
      )}

      {tab === "impact" && (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl bg-primary-700 p-5 text-white">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/60">{t.impact.co2OnTrack}</p>
            <p className="mt-2.5 font-serif text-4xl">
              {co2.toLocaleString("en-US")} <span className="text-lg">kg</span>
            </p>
            <p className="mt-2 text-sm text-white/70">{t.impact.acrossTrees.replace("{count}", String(trees.length)).replace("{km}", String(co2 * 4))}</p>
          </div>
          <div className="flex gap-2.5">
            <Card className="flex-1 p-3.5">
              <p className="font-mono text-[9px] uppercase tracking-widest text-label">{t.impact.trees}</p>
              <p className="mt-2 font-serif text-2xl text-ink">{trees.length}</p>
            </Card>
            <Card className="flex-1 p-3.5">
              <p className="font-mono text-[9px] uppercase tracking-widest text-label">{t.impact.farmsSupported}</p>
              <p className="mt-2 font-serif text-2xl text-ink">4</p>
            </Card>
          </div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-label">{t.impact.badgesTitle}</p>
          <div className="grid grid-cols-2 gap-2.5">
            {(Object.keys(t.impact.badges) as (keyof typeof t.impact.badges)[]).map((key) => {
              const style = BADGE_STYLE[key];
              const badge = t.impact.badges[key];
              return (
                <div key={key} className={`rounded-2xl border border-hairline p-3.5 ${style.bg}`}>
                  <div className={`h-6.5 w-6.5 rounded-full ${style.dot}`} />
                  <p className={`mt-2.5 text-sm font-semibold ${style.fg}`}>{badge.name}</p>
                  <p className="mt-1 text-[11px] text-label">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
