"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/types";

export function Faq({
  items,
  dict,
}: {
  items: FaqItem[];
  dict: { eyebrow: string; title: string };
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-primary-50/60 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} align="center" />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-primary-200 rounded-2xl border border-primary-100 bg-white">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-primary-950">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-primary-600 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-primary-800/80">{item.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
