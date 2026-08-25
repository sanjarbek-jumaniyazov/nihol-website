"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

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
      <LogOut className="h-4 w-4" /> Sign out
    </button>
  );
}
