"use client";

import { Heart } from "lucide-react";
import { useSavedStore } from "@/store/saved";
import { cn } from "@/lib/utils";

export function SaveToggleButton({ productId, className }: { productId: string; className?: string }) {
  const saved = useSavedStore((s) => s.isSaved(productId));
  const toggle = useSavedStore((s) => s.toggle);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
    fetch("/api/account/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    }).catch(() => {});
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={saved}
      aria-label="Save"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white/90",
        className
      )}
    >
      <Heart className={cn("h-4 w-4", saved ? "fill-red-500 text-red-500" : "text-muted")} />
    </button>
  );
}
