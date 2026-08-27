import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/auth";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.productId) return NextResponse.json({ error: "Missing productId." }, { status: 400 });

  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (!isSupabaseConfigured) return NextResponse.json({ ok: true, persisted: false });

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("saved_products")
    .select("product_id")
    .eq("user_id", customer.id)
    .eq("product_id", body.productId)
    .maybeSingle();

  if (existing) {
    await supabase.from("saved_products").delete().eq("user_id", customer.id).eq("product_id", body.productId);
    return NextResponse.json({ ok: true, saved: false });
  }

  await supabase.from("saved_products").insert({ user_id: customer.id, product_id: body.productId });
  return NextResponse.json({ ok: true, saved: true });
}
