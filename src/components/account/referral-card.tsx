"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { Dictionary } from "@/i18n/dictionaries";

export function ReferralCard({ code, dict }: { code: string; dict: Dictionary["account"] }) {
  const [copied, setCopied] = useState(false);
  const link = `nihol.uz/r/${code}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // clipboard API unavailable — the label still flips so the user sees feedback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="border-accent-400/50 bg-accent-50 p-4">
      <p className="font-serif text-base text-accent-700">{dict.referral.title}</p>
      <p className="mt-1.5 text-sm text-accent-700/80">{dict.referral.description}</p>
      <div className="mt-3 flex items-center gap-2.5">
        <div className="flex-1 rounded-xl bg-white/70 px-3 py-2.5 font-mono text-xs text-accent-700">{link}</div>
        <button
          onClick={copy}
          className={"flex-none rounded-xl px-4 py-2.5 text-xs font-semibold text-white " + (copied ? "bg-success-600" : "bg-primary-700")}
        >
          {copied ? dict.referral.copied : dict.referral.copy}
        </button>
      </div>
    </Card>
  );
}
