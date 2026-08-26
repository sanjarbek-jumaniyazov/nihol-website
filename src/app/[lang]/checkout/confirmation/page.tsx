"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { formatSom } from "@/lib/utils";
import { useLocale } from "@/i18n/locale-context";
import { getDictionary } from "@/i18n/dictionaries";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const ref = params.get("ref");
  const total = params.get("total");
  const lang = useLocale();
  const dict = getDictionary(lang).confirmation;

  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <CheckCircle2 className="h-14 w-14 text-primary-600" />
      <h1 className="mt-6 font-serif text-3xl font-semibold text-primary-950">{dict.title}</h1>
      <p className="mt-2 max-w-md text-primary-800/70">{dict.body}</p>

      <div className="mt-8 w-full max-w-sm space-y-2 rounded-xl border border-primary-100 bg-primary-50/60 p-6 text-left text-sm">
        {orderId && (
          <div className="flex justify-between">
            <span className="text-primary-800/70">{dict.orderId}</span>
            <span className="font-mono text-primary-950">{orderId.slice(0, 8)}</span>
          </div>
        )}
        {ref && (
          <div className="flex justify-between">
            <span className="text-primary-800/70">{dict.paymentReference}</span>
            <span className="font-mono text-primary-950">{ref}</span>
          </div>
        )}
        {total && (
          <div className="flex justify-between border-t border-primary-200 pt-2 font-semibold">
            <span className="text-primary-950">{dict.total}</span>
            <span className="text-primary-950">{formatSom(Number(total), lang)}</span>
          </div>
        )}
      </div>

      <LinkButton href="/marketplace" className="mt-8">
        {dict.continueShopping}
      </LinkButton>
    </Container>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}
