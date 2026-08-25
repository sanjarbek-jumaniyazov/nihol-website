"use client";

import { ShoppingCart } from "lucide-react";
import { useCartCount } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";

export function CartBadge() {
  const mounted = useHydrated();
  const count = useCartCount();

  return (
    <span className="relative inline-flex">
      <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
      {mounted && count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </span>
  );
}
