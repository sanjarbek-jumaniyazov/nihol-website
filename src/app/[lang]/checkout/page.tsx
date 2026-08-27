"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatSom } from "@/lib/utils";
import { products as rawProducts, localizeProduct, treePackages as rawPackages, localizeTreePackage } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { useLocale } from "@/i18n/locale-context";
import { useLocaleRouter } from "@/i18n/use-locale-router";
import { getDictionary } from "@/i18n/dictionaries";

const SLOTS = [
  { id: "fri", day: "Fri 28 Aug", window: "09:00–13:00" },
  { id: "sat", day: "Sat 29 Aug", window: "13:00–18:00" },
  { id: "mon", day: "Mon 31 Aug", window: "09:00–13:00" },
  { id: "call", day: "Call me", window: "AGREE BY PHONE" },
];

const PAYMENT_METHODS = [
  { id: "payme", name: "Payme" },
  { id: "click", name: "Click" },
  { id: "card", name: "Card (Stripe)" },
];

export default function CheckoutPage() {
  const router = useLocaleRouter();
  const mounted = useHydrated();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [slot, setSlot] = useState("sat");
  const [pay, setPay] = useState("payme");
  const [attend, setAttend] = useState(false);
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const lang = useLocale();
  const dict = getDictionary(lang).checkout;

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, dict.errors.name),
        email: z.string().email(dict.errors.email),
        phone: z.string().optional(),
        address: z.string().min(5, dict.errors.address),
        entrance: z.string().optional(),
        landmark: z.string().optional(),
        note: z.string().optional(),
        certName: z.string().optional(),
      }),
    [dict]
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!mounted) return null;

  const products = rawProducts.map((p) => localizeProduct(p, lang));
  const packages = rawPackages.map((p) => localizeTreePackage(p, lang));

  const resolvedLines = lines
    .map((line) => {
      if (line.kind === "product") {
        const product = products.find((p) => p.id === line.id);
        if (!product) return null;
        return { kind: "product" as const, name: product.name, unitPrice: product.price, quantity: line.quantity };
      }
      const pkg = packages.find((p) => p.id === line.id);
      if (!pkg) return null;
      return { kind: "tree_package" as const, name: pkg.name, unitPrice: pkg.priceSom, quantity: line.quantity };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  const treesInCart = resolvedLines.filter((l) => l.kind === "tree_package").reduce((sum, l) => sum + l.quantity, 0);
  const total = resolvedLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);

  if (resolvedLines.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-ink">{dict.empty}</h1>
        <p className="mt-2 text-muted">{dict.emptyDescription}</p>
      </Container>
    );
  }

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { ...values, deliverySlot: slot, attendPlanting: attend },
          lines,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      clear();
      router.push(
        `/checkout/confirmation?orderId=${data.orderId}&ref=${data.paymentReference}&total=${data.total}&trees=${data.trees ?? 0}`
      );
    } catch {
      setSubmitError(dict.genericError);
    }
  }

  return (
    <Container className="py-14">
      <h1 className="font-serif text-3xl font-semibold text-ink">{dict.title}</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:col-span-2">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-ink">{dict.fullName}</label>
              <input
                {...register("name")}
                className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">{dict.email}</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink">{dict.phone}</label>
            <input
              {...register("phone")}
              placeholder="+998 90 000 00 00"
              className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 font-mono focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink">{dict.deliveryAddress}</label>
            <textarea
              {...register("address")}
              rows={2}
              className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            />
            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-ink">{dict.entrance}</label>
              <input
                {...register("entrance")}
                className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">{dict.landmark}</label>
              <input
                {...register("landmark")}
                className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink">{dict.whenToCome}</label>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {SLOTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlot(s.id)}
                  className={
                    "flex-none rounded-xl border px-3.5 py-2.5 text-left " +
                    (slot === s.id ? "border-primary-700 bg-primary-700 text-white" : "border-hairline bg-white text-ink")
                  }
                >
                  <div className="text-xs font-semibold">{s.day}</div>
                  <div className={"font-mono text-[10px] " + (slot === s.id ? "text-white/70" : "text-label")}>{s.window}</div>
                </button>
              ))}
            </div>
          </div>

          {treesInCart > 0 && (
            <Card className="bg-panel p-4">
              <p className="text-sm font-semibold text-ink">
                {dict.treesSectionTitle} · {treesInCart}
              </p>
              <p className="mt-1.5 text-sm text-muted">{dict.treesSectionBody}</p>
              <div className="mt-3">
                <label className="block text-xs font-medium text-label">{dict.certName}</label>
                <input
                  {...register("certName")}
                  className="mt-1 w-full rounded-lg border border-hairline bg-white px-3.5 py-2 focus:border-primary-500 focus:outline-none"
                />
              </div>
              <label className="mt-3 flex items-center gap-2.5 text-sm text-ink">
                <input type="checkbox" checked={attend} onChange={(e) => setAttend(e.target.checked)} className="h-4 w-4 accent-primary-700" />
                {dict.attendPlanting}
              </label>
            </Card>
          )}

          <div>
            <label className="block text-sm font-medium text-ink">{dict.note}</label>
            <input
              {...register("note")}
              className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink">{dict.paymentMethod}</label>
            <div className="mt-2 flex flex-col gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPay(m.id)}
                  className={
                    "flex items-center gap-3 rounded-xl border px-4 py-3 text-left " +
                    (pay === m.id ? "border-primary-700" : "border-hairline")
                  }
                >
                  <span
                    className={
                      "flex h-4.5 w-4.5 items-center justify-center rounded-full border " +
                      (pay === m.id ? "border-primary-700" : "border-hairline")
                    }
                  >
                    {pay === m.id && <span className="h-2.5 w-2.5 rounded-full bg-primary-700" />}
                  </span>
                  <span className="text-sm font-semibold text-ink">{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="rounded-lg border border-hairline bg-panel-alt p-4 text-sm text-muted">
            <strong className="text-ink">{dict.paymentLabel}</strong> {dict.paymentNote}
          </p>
          <p className="rounded-lg bg-panel px-4 py-3 text-xs text-muted">{dict.agreement}</p>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? dict.placingOrder : dict.placeOrder.replace("{total}", formatSom(total, lang))}
          </Button>
        </form>

        <Card className="h-fit space-y-4 bg-panel-alt p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">{dict.orderSummary}</h2>
          <ul className="space-y-2 text-sm">
            {resolvedLines.map((line, i) => (
              <li key={i} className="flex justify-between text-ink/90">
                <span>
                  {line.name} × {line.quantity}
                </span>
                <span className="font-mono">{formatSom(line.unitPrice * line.quantity, lang)}</span>
              </li>
            ))}
          </ul>
          {treesInCart > 0 && (
            <div className="flex justify-between text-sm text-muted">
              <span>{dict.treesRegistered}</span>
              <span className="font-mono">{treesInCart}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-hairline pt-3 font-semibold text-ink">
            <span>{dict.total}</span>
            <span className="font-mono">{formatSom(total, lang)}</span>
          </div>
        </Card>
      </div>
    </Container>
  );
}
