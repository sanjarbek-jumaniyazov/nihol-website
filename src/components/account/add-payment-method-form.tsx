"use client";

import { useState } from "react";
import { useLocaleRouter } from "@/i18n/use-locale-router";

const PROVIDERS = [
  { id: "payme", label: "Payme" },
  { id: "click", label: "Click" },
  { id: "card", label: "Card" },
];

export function AddPaymentMethodForm({ label: cta }: { label: string }) {
  const router = useLocaleRouter();
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState("payme");
  const [label, setLabel] = useState("");
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
    if (!label || submitting) return;
    setSubmitting(true);
    const res = await fetch("/api/account/payment-methods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, label }),
    });
    setSubmitting(false);
    if (res.ok) {
      setOpen(false);
      setLabel("");
      router.refresh();
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2 rounded-2xl border border-hairline bg-white p-3.5">
      <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full rounded-lg border border-hairline px-3 py-2 text-sm">
        {PROVIDERS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
      <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (e.g. •••• 4412)" className="w-full rounded-lg border border-hairline px-3 py-2 text-sm" />
      <button type="submit" disabled={submitting} className="h-10 w-full rounded-lg bg-primary-700 text-sm font-semibold text-white">
        {submitting ? "…" : "Save"}
      </button>
    </form>
  );
}
