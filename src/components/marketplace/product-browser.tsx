"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/marketplace/product-card";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function ProductBrowser({
  products,
  dict,
  lang,
}: {
  products: Product[];
  dict: Dictionary["marketplace"];
  lang: Locale;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const t = dict.browser;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesQuery =
        !query || p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  return (
    <section id="products" className="py-16">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-full border border-primary-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                category === "all" ? "bg-primary-700 text-white" : "bg-primary-50 text-primary-800 hover:bg-primary-100"
              )}
            >
              {t.all}
            </button>
            {PRODUCT_CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  category === c.value
                    ? "bg-primary-700 text-white"
                    : "bg-primary-50 text-primary-800 hover:bg-primary-100"
                )}
              >
                {c.emoji} {dict.categories[c.value]}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-primary-800/60">{t.noResults}</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} dict={dict} lang={lang} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
