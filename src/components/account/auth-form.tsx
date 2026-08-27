"use client";

import { useState } from "react";
import { Leaf } from "lucide-react";
import { Link } from "@/components/ui/localized-link";
import { Button } from "@/components/ui/button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useLocaleRouter } from "@/i18n/use-locale-router";
import type { Dictionary } from "@/i18n/dictionaries";

export function AccountAuthForm({ mode, dict }: { mode: "login" | "signup"; dict: Dictionary["account"] }) {
  const router = useLocaleRouter();
  const t = dict.auth;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError(t.notConfigured);
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setLoading(false);
        setError(signUpError.message.toLowerCase().includes("already") ? t.emailInUse : t.genericError);
        return;
      }
      if (data.user) {
        await supabase.from("profiles").upsert({ id: data.user.id, full_name: fullName });
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setLoading(false);
        setError(t.invalidCredentials);
        return;
      }
    }

    setLoading(false);
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-panel px-4 py-14">
      <div className="w-full max-w-sm rounded-2xl border border-hairline bg-white p-8">
        <div className="flex items-center gap-2 font-serif text-xl text-primary-800">
          <Leaf className="h-6 w-6 text-primary-600" />
          {mode === "signup" ? t.signupTitle : t.loginTitle}
        </div>
        <p className="mt-2 text-sm text-muted">{mode === "signup" ? t.signupSubtitle : t.loginSubtitle}</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-ink">{t.fullName}</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-ink">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">{t.password}</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-hairline px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {mode === "signup" ? (loading ? t.signingUp : t.signUp) : loading ? t.loggingIn : t.logIn}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          {mode === "signup" ? (
            <>
              {t.haveAccount} <Link href="/account/login" className="font-semibold text-primary-700">{t.backToLogin}</Link>
            </>
          ) : (
            <>
              {t.noAccount} <Link href="/account/signup" className="font-semibold text-primary-700">{t.createAccount}</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
