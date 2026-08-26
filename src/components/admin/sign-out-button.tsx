"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLocaleRouter } from "@/i18n/use-locale-router";
import type { Dictionary } from "@/i18n/dictionaries";

export function SignOutButton({ dict }: { dict: Dictionary["admin"] }) {
  const router = useLocaleRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary-200 hover:bg-primary-800 hover:text-white"
    >
      <LogOut className="h-4 w-4" /> {dict.signOut}
    </button>
  );
}
