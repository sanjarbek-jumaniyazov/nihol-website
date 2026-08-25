"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { formatSom } from "@/lib/utils";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const ref = params.get("ref");
  const total = params.get("total");

  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <CheckCircle2 className="h-14 w-14 text-primary-600" />
      <h1 className="mt-6 font-serif text-3xl font-semibold text-primary-950">Order placed!</h1>
      <p className="mt-2 max-w-md text-primary-800/70">
        Thank you — your order has been received. We&apos;ll email you a confirmation with delivery
        details shortly.
      </p>

      <div className="mt-8 w-full max-w-sm space-y-2 rounded-xl border border-primary-100 bg-primary-50/60 p-6 text-left text-sm">
        {orderId && (
          <div className="flex justify-between">
            <span className="text-primary-800/70">Order ID</span>
            <span className="font-mono text-primary-950">{orderId.slice(0, 8)}</span>
          </div>
        )}
        {ref && (
          <div className="flex justify-between">
            <span className="text-primary-800/70">Payment reference</span>
            <span className="font-mono text-primary-950">{ref}</span>
          </div>
        )}
        {total && (
          <div className="flex justify-between border-t border-primary-200 pt-2 font-semibold">
            <span className="text-primary-950">Total</span>
            <span className="text-primary-950">{formatSom(Number(total))}</span>
          </div>
        )}
      </div>

      <LinkButton href="/marketplace" className="mt-8">
        Continue Shopping
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
