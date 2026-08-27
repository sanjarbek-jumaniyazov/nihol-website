"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import type { NotificationPreferences } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

const KEYS: (keyof NotificationPreferences)[] = ["growth", "milestones", "payments", "delivery", "promos"];

export function NotificationToggles({
  initial,
  dict,
}: {
  initial: NotificationPreferences;
  dict: Dictionary["account"]["notifications"];
}) {
  const [prefs, setPrefs] = useState(initial);
  const [, startTransition] = useTransition();

  function toggle(key: keyof NotificationPreferences) {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    startTransition(() => {
      fetch("/api/account/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
    });
  }

  return (
    <Card className="overflow-hidden">
      {KEYS.map((key) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          className="flex w-full items-center gap-3.5 border-b border-hairline p-4 text-left last:border-b-0"
        >
          <div className="flex-1">
            <div className="text-sm font-semibold text-ink">{dict.rows[key].name}</div>
            <div className="mt-0.5 text-xs text-label">{dict.rows[key].meta}</div>
          </div>
          <div
            className={
              "flex h-7 w-11.5 flex-none items-center rounded-full p-0.5 transition-colors " +
              (prefs[key] ? "justify-end bg-primary-700" : "justify-start bg-hairline")
            }
          >
            <span className="h-5.5 w-5.5 rounded-full bg-white shadow" />
          </div>
        </button>
      ))}
    </Card>
  );
}
