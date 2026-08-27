"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useLocaleRouter } from "@/i18n/use-locale-router";
import type { Dictionary } from "@/i18n/dictionaries";

export function AdminLoginForm({ dict }: { dict: Dictionary["admin"] }) {
  const router = useLocaleRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = dict.login;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError(t.notConfigured);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError(t.invalidCredentials);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-primary-50/60 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-primary-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2 font-serif text-xl font-semibold text-primary-900">
          <Logo size={32} />
          {t.title}
        </div>
        <p className="mt-2 text-sm text-primary-800/70">{t.subtitle}</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-950">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-950">{t.password}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? t.signingIn : t.signIn}
          </Button>
        </form>
      </div>
    </div>
  );
}
