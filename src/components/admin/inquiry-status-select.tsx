"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["new", "contacted", "converted", "closed"];

export function InquiryStatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function onChange(newStatus: string) {
    setValue(newStatus);
    setSaving(true);
    const res = await fetch(`/api/admin/inquiries/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setSaving(false);
    if (res.ok) router.refresh();
    else setValue(status);
  }

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-primary-200 bg-white px-2 py-1 text-xs font-medium text-primary-900 disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s[0].toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
