"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

export function ReviewForm({
  orderId,
  productId,
  itemLabel,
  dict,
}: {
  orderId: string;
  productId: string;
  itemLabel: string;
  dict: Dictionary["account"]["review"];
}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    if (rating === 0 || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, productId, rating, body: text }),
      });
      if (res.ok) setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  const cta = done ? dict.submitted : rating === 0 ? dict.pickRatingFirst : dict.submit;

  return (
    <div>
      <p className="text-sm text-muted">{dict.howWas.replace("{item}", itemLabel)}</p>

      <div className="mt-4 flex gap-2.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={
              "flex h-12 w-12 items-center justify-center rounded-2xl font-serif text-xl " +
              (n <= rating ? "bg-accent-400 text-white" : "bg-panel text-hairline")
            }
          >
            ★
          </button>
        ))}
      </div>
      <p className="mt-3.5 font-mono text-xs text-label">{dict.ratingLabels[rating]}</p>

      <div className="mt-4 rounded-2xl border border-hairline bg-white p-3.5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={dict.placeholder}
          className="w-full border-none bg-transparent text-sm outline-none"
        />
      </div>

      <button
        onClick={submit}
        disabled={rating === 0 || submitting}
        className={"mt-4 h-13 w-full rounded-2xl text-sm font-semibold text-white " + (done ? "bg-success-600" : rating > 0 ? "bg-primary-700" : "bg-hairline")}
      >
        {cta}
      </button>

      {done && (
        <div className="mt-3.5 rounded-2xl bg-success-50 p-3.5 text-sm text-success-700">{dict.thankYou}</div>
      )}
    </div>
  );
}
