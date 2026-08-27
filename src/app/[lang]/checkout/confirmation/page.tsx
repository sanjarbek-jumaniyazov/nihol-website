"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/components/ui/localized-link";
import { LinkButton } from "@/components/ui/button";
import { formatSom } from "@/lib/utils";
import { useLocale } from "@/i18n/locale-context";
import { getDictionary } from "@/i18n/dictionaries";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const ref = params.get("ref");
  const total = params.get("total");
  const trees = Number(params.get("trees") ?? 0);
  const lang = useLocale();
  const dict = getDictionary(lang).confirmation;

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-gradient-to-br from-primary-700 to-primary-600 px-6 py-16 text-white">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        <div className="mx-auto flex h-22 w-22 items-center justify-center rounded-full border-2 border-accent-400">
          <div className="h-8.5 w-8.5 rounded-full bg-accent-400" />
        </div>

        <div className="mt-6 text-center">
          <h1 className="font-serif text-3xl">{dict.title}</h1>
          <p className="mt-2.5 text-sm leading-relaxed text-white/75">
            {orderId ? dict.body.replace("{orderId}", orderId.slice(0, 8)) : dict.body.replace("{orderId}", "")}
          </p>
        </div>

        <div className="mt-6 space-y-2 rounded-2xl bg-white/12 p-4 text-sm">
          {ref && (
            <div className="flex justify-between text-white/70">
              <span>{dict.paymentReference}</span>
              <span className="font-mono text-white">{ref}</span>
            </div>
          )}
          {trees > 0 && (
            <div className="flex justify-between text-white/70">
              <span>{dict.treesAdded}</span>
              <span className="font-mono text-white">{trees}</span>
            </div>
          )}
          {total && (
            <div className="flex justify-between text-white/70">
              <span>{dict.total}</span>
              <span className="font-mono text-white">{formatSom(Number(total), lang)}</span>
            </div>
          )}
        </div>

        <div className="flex-1" />

        {trees > 0 && (
          <>
            <Link
              href="/grove"
              className="mt-4 flex h-13 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-primary-700"
            >
              {dict.seeOwnershipCard}
            </Link>
            <Link href="/grove" className="mt-1 flex h-12 items-center justify-center text-sm font-semibold text-white/80">
              {dict.goToGrove}
            </Link>
          </>
        )}
        {trees === 0 && (
          <LinkButton href="/marketplace" className="mt-4 !bg-white !text-primary-700">
            {dict.continueShopping}
          </LinkButton>
        )}
        <Link href="/marketplace" className="mt-1 flex h-12 items-center justify-center text-sm font-semibold text-white/80">
          {dict.continueShopping}
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}
