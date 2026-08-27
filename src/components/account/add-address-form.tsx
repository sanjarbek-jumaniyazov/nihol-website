"use client";

import { useState } from "react";
import { useLocaleRouter } from "@/i18n/use-locale-router";

export function AddAddressForm({ label: cta }: { label: string }) {
  const router = useLocaleRouter();
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [line, setLine] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="h-12 w-full rounded-2xl border border-dashed border-primary-700/30 text-sm font-semibold text-primary-700"
      >
        {cta}
      </button>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!label || !line || !city || submitting) return;
    setSubmitting(true);
    const res = await fetch("/api/account/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, line, city }),
    });
    setSubmitting(false);
    if (res.ok) {
      setOpen(false);
      setLabel("");
      setLine("");
      setCity("");
      router.refresh();
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2 rounded-2xl border border-hairline bg-white p-3.5">
      <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (e.g. Home)" className="w-full rounded-lg border border-hairline px-3 py-2 text-sm" />
      <input value={line} onChange={(e) => setLine(e.target.value)} placeholder="Street address" className="w-full rounded-lg border border-hairline px-3 py-2 text-sm" />
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full rounded-lg border border-hairline px-3 py-2 text-sm" />
      <button type="submit" disabled={submitting} className="h-10 w-full rounded-lg bg-primary-700 text-sm font-semibold text-white">
        {submitting ? "…" : "Save"}
      </button>
    </form>
  );
}
