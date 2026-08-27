import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/auth";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.provider || !body?.label) {
    return NextResponse.json({ error: "Missing required payment method details." }, { status: 400 });
  }

  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (!isSupabaseConfigured) return NextResponse.json({ ok: true, persisted: false });

  const supabase = await createClient();
  const { error } = await supabase
    .from("payment_method_labels")
    .insert({ user_id: customer.id, provider: body.provider, label: body.label, meta: body.meta ?? null });

  if (error) return NextResponse.json({ error: "Failed to save payment method." }, { status: 500 });
  return NextResponse.json({ ok: true, persisted: true });
}
