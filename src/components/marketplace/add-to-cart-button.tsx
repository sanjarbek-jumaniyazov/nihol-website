"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useLocale } from "@/i18n/locale-context";
import { getDictionary } from "@/i18n/dictionaries";

export function AddToCartButton({ productId, inStock }: { productId: string; inStock: boolean }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const dict = getDictionary(useLocale()).marketplace;

  function handleClick() {
    addItem("product", productId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Button size="lg" disabled={!inStock} onClick={handleClick} className="w-full sm:w-auto">
      {added ? (
        <>
          <Check className="h-5 w-5" /> {dict.addedToCart}
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" /> {inStock ? dict.addToCart : dict.outOfStock}
        </>
      )}
    </Button>
  );
}
