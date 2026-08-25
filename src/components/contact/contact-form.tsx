"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary-600" />
        <h3 className="mt-3 font-serif text-lg font-semibold text-primary-950">Message sent</h3>
        <p className="mt-1 text-sm text-primary-800/70">We&apos;ll get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-primary-950">Full name</label>
          <input
            {...register("fullName")}
            className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
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
        <label className="block text-sm font-medium text-primary-950">Subject (optional)</label>
        <input
          {...register("subject")}
          className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-950">Message</label>
        <textarea
          {...register("message")}
          rows={5}
          className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
