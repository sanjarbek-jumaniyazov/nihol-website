"use client";

import { useState } from "react";
import { Link } from "@/components/ui/localized-link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { IMAGES } from "@/lib/images";
import type { Tree } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function CertificateView({
  trees,
  initialTreeId,
  customerName,
  dict,
  lang,
}: {
  trees: Tree[];
  initialTreeId: string;
  customerName: string;
  dict: Dictionary;
  lang: Locale;
}) {
  const t = dict.grove.certificate;
  const [selectedId, setSelectedId] = useState(initialTreeId);
  const [shared, setShared] = useState(false);
  const tree = trees.find((x) => x.id === selectedId) ?? trees[0];
  const edition = trees.findIndex((x) => x.id === tree.id) + 1;
  const year = new Date(tree.plantedAt).getFullYear();

  const facts = [
    { k: "PLOT", v: tree.plot + ", Jizzakh" },
    { k: "COORDINATES", v: "40.117 N · 67.842 E" },
    { k: t.planted.toUpperCase(), v: new Date(tree.plantedAt).toLocaleDateString(lang) },
    { k: t.heightNow.toUpperCase(), v: `${(tree.heightCm / 100).toFixed(1)} m` },
    { k: t.harvest.toUpperCase(), v: tree.harvestEstimateDate ? new Date(tree.harvestEstimateDate).toLocaleDateString(lang, { month: "short", year: "numeric" }) : "—" },
    { k: t.co2.toUpperCase(), v: `${tree.co2KgTarget} kg` },
  ];

  async function share() {
    try {
      await navigator.clipboard.writeText(`https://nihol.uz/grove/trees/${tree.id}/certificate`);
    } catch {
      // clipboard unavailable — label still flips for feedback
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#14260A] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <Link href="/grove" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/14 text-white">
            ‹
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">{t.label}</span>
          <div className="w-10" />
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-accent-400/55 bg-gradient-to-br from-primary-700 to-[#1E3810] shadow-2xl">
          <div className="relative h-38">
            <PlaceholderImage seed={tree.id} emoji="🌳" photo={IMAGES.paulowniaNursery} className="h-full w-full rounded-none opacity-85" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#14260A]/15 to-[#14260A]/90" />
            <span className="absolute left-3.5 top-3 font-mono text-[9px] uppercase tracking-widest text-white/80">
              NIHOL · PAULOWNIA GROVE
            </span>
            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between">
              <span className="font-serif text-2xl text-white">
                {dict.grove.impact.trees.replace(/s$/, "")} {tree.code}
              </span>
              <span className="font-mono text-[10px] text-accent-400">No. {String(edition).padStart(3, "0")} / {trees.length}</span>
            </div>
          </div>

          <div className="p-4.5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-14.5 w-14.5 flex-none flex-col items-center justify-center rounded-full border border-accent-400/70 text-accent-400">
                <span className="font-serif text-base">{year}</span>
                <span className="mt-0.5 font-mono text-[7px] uppercase tracking-widest">{t.vintage}</span>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">{t.heldBy}</p>
                <p className="mt-1 font-serif text-lg text-white">{customerName}</p>
                <p className="mt-0.5 text-xs text-white/60">{t.careThrough.replace("{date}", "Sep 2032")}</p>
              </div>
            </div>

            <div className="mt-4.5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-accent-400/20 bg-accent-400/20">
              {facts.map((f) => (
                <div key={f.k} className="bg-[#14260A]/55 px-3 py-2.5">
                  <p className="font-mono text-[8.5px] uppercase tracking-widest text-white/45">{f.k}</p>
                  <p className="mt-1.5 text-sm font-semibold text-white">{f.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-4.5 flex items-end justify-between gap-3">
              <div>
                <p className="font-serif text-sm italic text-accent-400">R. Otajonov</p>
                <div className="mt-1 h-px w-26 bg-accent-400/40" />
                <p className="mt-1.5 font-mono text-[8px] uppercase tracking-widest text-white/45">{t.leadAgronomist}</p>
              </div>
              <p className="font-mono text-[8.5px] text-white/50">NH-{tree.code.replace("NH-", "")}-J14-{year}</p>
            </div>
          </div>
        </div>

        <div className="mt-4.5 flex gap-2.5">
          <button
            onClick={share}
            className={"flex-1 rounded-2xl py-3 text-sm font-semibold text-[#14260A] " + (shared ? "bg-success-600" : "bg-accent-400")}
          >
            {shared ? t.shared : t.share}
          </button>
          <Link href="/grove" className="rounded-2xl border border-white/28 px-4.5 py-3 text-sm font-semibold text-white">
            {t.myCards}
          </Link>
        </div>

        <p className="mt-5.5 font-mono text-[10px] uppercase tracking-widest text-white/45">
          {t.collection.replace("{count}", String(trees.length))}
        </p>
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1.5">
          {trees.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={"w-26 flex-none overflow-hidden rounded-2xl border " + (d.id === tree.id ? "border-accent-400/80" : "border-white/14")}
            >
              <div className="relative h-16">
                <PlaceholderImage seed={d.id} emoji="🌳" photo={IMAGES.paulowniaSeedling} className="h-full w-full rounded-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#14260A]/10 to-[#14260A]/75" />
              </div>
              <div className="bg-white/6 px-2.5 py-2">
                <p className="font-mono text-[10.5px] text-white">{d.code}</p>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-3.5 text-xs leading-relaxed text-white/45">{t.footer}</p>
      </div>
    </div>
  );
}
