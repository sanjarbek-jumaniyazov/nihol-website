"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLocaleRouter } from "@/i18n/use-locale-router";

export function AccountSignOutButton({ label }: { label: string }) {
  const router = useLocaleRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={signOut} className="flex items-center gap-2 text-sm font-semibold text-red-600">
      <LogOut className="h-4 w-4" /> {label}
    </button>
  );
}
