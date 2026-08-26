"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { formatSom } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function InvestmentForm({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.paulownia.form;
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(2, t.errors.fullName),
        email: z.string().email(t.errors.email),
        phone: z.string().optional(),
        treeCount: z.number().int().min(1, t.errors.treeCount),
        landOption: z.enum(["own-land", "partner-farm"]),
        message: z.string().optional(),
      }),
    [t]
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { treeCount: 1, landOption: "partner-farm" },
  });

  const treeCount = watch("treeCount") || 1;

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/investment-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError(t.genericError);
    }
  }

  return (
    <section id="get-started" className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} align="center" />

        <div className="mt-10 rounded-2xl border border-primary-100 bg-white p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary-600" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-primary-950">{t.thanksTitle}</h3>
              <p className="mt-2 text-sm text-primary-800/70">{t.thanksBody}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-primary-950">{t.fullName}</label>
                  <input
                    {...register("fullName")}
                    className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-950">{t.email}</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-primary-950">{t.phoneOptional}</label>
                  <input
                    {...register("phone")}
                    className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-950">{t.treeCount}</label>
                  <input
                    type="number"
                    min={1}
                    {...register("treeCount", { valueAsNumber: true })}
                    className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                  />
                  {errors.treeCount && (
                    <p className="mt-1 text-xs text-red-600">{errors.treeCount.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-950">{t.plantingLocation}</label>
                <select
                  {...register("landOption")}
                  className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                >
                  <option value="partner-farm">{t.partnerFarmOption}</option>
                  <option value="own-land">{t.ownLandOption}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-950">{t.messageOptional}</label>
                <textarea
                  {...register("message")}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg bg-primary-50 px-4 py-3 text-sm text-primary-900">
                <span>{t.estimatedTotal}</span>
                <span className="font-semibold">{formatSom(499000 * treeCount, lang)}</span>
              </div>

              {submitError && <p className="text-sm text-red-600">{submitError}</p>}

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                {isSubmitting ? t.submitting : t.submit}
              </Button>
              <p className="text-center text-xs text-primary-800/50">{t.disclaimer}</p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
