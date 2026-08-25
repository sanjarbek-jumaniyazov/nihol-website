"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { formatSom } from "@/lib/utils";
import { products } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  address: z.string().min(5, "Enter a delivery address"),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useHydrated();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!mounted) return null;

  const resolvedLines = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      return product ? { product, quantity: line.quantity } : null;
    })
    .filter((l): l is { product: (typeof products)[number]; quantity: number } => l !== null);

  const subtotal = resolvedLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  if (resolvedLines.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-primary-950">Your cart is empty</h1>
        <p className="mt-2 text-primary-800/70">Add products from the marketplace before checking out.</p>
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
          customer: values,
          lines: lines,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      clear();
      router.push(
        `/checkout/confirmation?orderId=${data.orderId}&ref=${data.paymentReference}&total=${data.total}`
      );
    } catch {
      setSubmitError("Something went wrong placing your order. Please try again.");
    }
  }

  return (
    <Container className="py-14">
      <h1 className="font-serif text-3xl font-semibold text-primary-950">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:col-span-2">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-primary-950">Full name</label>
              <input
                {...register("name")}
                className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-950">Email</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-950">Phone (optional)</label>
            <input
              {...register("phone")}
              className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-950">Delivery address</label>
            <textarea
              {...register("address")}
              rows={3}
              className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            />
            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
          </div>

          <div className="rounded-lg border border-primary-200 bg-primary-50/60 p-4 text-sm text-primary-800/80">
            <strong className="text-primary-950">Payment:</strong> a payment gateway has not been
            connected yet — placing this order will not charge you. Once Payme/Click credentials
            are configured, this step will collect real payment.
          </div>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Placing order…" : `Place Order — ${formatSom(subtotal)}`}
          </Button>
        </form>

        <div className="h-fit space-y-4 rounded-2xl border border-primary-100 bg-primary-50/60 p-6">
          <h2 className="font-serif text-xl font-semibold text-primary-950">Order Summary</h2>
          <ul className="space-y-2 text-sm">
            {resolvedLines.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between text-primary-900/90">
                <span>
                  {product.name} × {quantity}
                </span>
                <span>{formatSom(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-primary-200 pt-3 flex justify-between font-semibold text-primary-950">
            <span>Total</span>
            <span>{formatSom(subtotal)}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
