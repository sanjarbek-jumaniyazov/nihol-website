"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { TREE_SOM } from "@/lib/investment";
import { formatSom, formatUsdRange } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useLocaleRouter } from "@/i18n/use-locale-router";
import type { TreePackage } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function ReturnCalculator({ pkg, dict, lang }: { pkg: TreePackage; dict: Dictionary; lang: Locale }) {
  const t = dict.packages.calculator;
  const [qty, setQty] = useState(pkg.quantity);
  const addItem = useCartStore((s) => s.addItem);
  const router = useLocaleRouter();

  const perTreeReturnLow = pkg.returnLowUsd / pkg.quantity;
  const perTreeReturnHigh = pkg.returnHighUsd / pkg.quantity;
  const cost = qty * TREE_SOM;
  const low = Math.round(qty * perTreeReturnLow);
  const high = Math.round(qty * perTreeReturnHigh);
  const co2 = qty * 500;
  const bar = Math.min(100, 12 + qty * 4);

  function addToCart() {
    addItem("tree_package", pkg.id, Math.round(qty / pkg.quantity) || 1);
    router.push("/cart");
  }

  return (
    <div className="rounded-2xl bg-primary-700 p-5 text-white">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg">{t.title}</h3>
        <span className="font-mono text-[10px] text-white/60">{t.subtitle.toUpperCase()}</span>
      </div>

      <div className="mt-4 flex items-center gap-3.5">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/14"
          aria-label="Decrease"
        >
          <Minus className="h-5 w-5" />
        </button>
        <div className="flex-1 text-center">
          <div className="font-serif text-4xl">{qty}</div>
          <div className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-white/60">{t.trees}</div>
        </div>
        <button
          onClick={() => setQty((q) => Math.min(50, q + 1))}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/14"
          aria-label="Increase"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-white/75">
          <span>{t.investToday}</span>
          <span className="font-mono text-white">{formatSom(cost, lang)}</span>
        </div>
        <div className="flex justify-between text-white/75">
          <span>{t.yearConservative}</span>
          <span className="font-mono text-white">${low.toLocaleString("en-US")}</span>
        </div>
        <div className="flex justify-between text-white/75">
          <span>{t.yearOptimistic}</span>
          <span className="font-mono text-accent-400">${high.toLocaleString("en-US")}</span>
        </div>
        <div className="flex justify-between text-white/75">
          <span>{t.co2}</span>
          <span className="font-mono text-white">{co2.toLocaleString("en-US")} kg</span>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/16">
        <div className="h-full bg-gradient-to-r from-success-600 to-accent-400" style={{ width: `${bar}%` }} />
      </div>

      <button
        onClick={addToCart}
        className="mt-5 h-13 w-full rounded-2xl bg-white text-sm font-semibold text-primary-700"
      >
        {t.addToCart.replace("{price}", formatSom(cost, lang))}
      </button>
      <p className="sr-only">{formatUsdRange(low, high)}</p>
    </div>
  );
}
