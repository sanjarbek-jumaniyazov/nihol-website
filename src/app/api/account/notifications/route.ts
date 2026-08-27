import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/auth";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (!isSupabaseConfigured) return NextResponse.json({ ok: true, persisted: false });

  const supabase = await createClient();
  const { error } = await supabase
    .from("notification_preferences")
    .upsert({ user_id: customer.id, ...body });

  if (error) return NextResponse.json({ error: "Failed to save preferences." }, { status: 500 });
  return NextResponse.json({ ok: true, persisted: true });
}
