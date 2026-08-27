import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/auth";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.label || !body?.line || !body?.city) {
    return NextResponse.json({ error: "Missing required address details." }, { status: 400 });
  }

  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (!isSupabaseConfigured) return NextResponse.json({ ok: true, persisted: false });

  const supabase = await createClient();
  const { error } = await supabase
    .from("addresses")
    .insert({ user_id: customer.id, label: body.label, line: body.line, city: body.city });

  if (error) return NextResponse.json({ error: "Failed to save address." }, { status: 500 });
  return NextResponse.json({ ok: true, persisted: true });
}
