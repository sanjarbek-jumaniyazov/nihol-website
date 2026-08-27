import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/auth";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";

interface ReviewBody {
  orderId: string;
  productId: string;
  rating: number;
  body: string;
}

export async function POST(request: Request) {
  const body: ReviewBody = await request.json();

  if (!body?.orderId || !body?.productId || !body?.rating) {
    return NextResponse.json({ error: "Missing required review details." }, { status: 400 });
  }

  const customer = await getCurrentCustomer();
  if (!customer) {
    return NextResponse.json({ error: "Sign in to leave a review." }, { status: 401 });
  }

  if (!isSupabaseConfigured) {
    // Demo mode has no persistence layer for new rows — acknowledge success so the UI flow completes.
    return NextResponse.json({ ok: true, persisted: false });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("product_reviews").upsert(
    {
      order_id: body.orderId,
      product_id: body.productId,
      user_id: customer.id,
      rating: body.rating,
      body: body.body,
    },
    { onConflict: "order_id,product_id" }
  );

  if (error) {
    return NextResponse.json({ error: "Failed to save review." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, persisted: true });
}
