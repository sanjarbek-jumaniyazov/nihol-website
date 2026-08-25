import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/data";
import { processPayment } from "@/lib/payment";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";
import type { CartLine } from "@/lib/types";

interface CheckoutBody {
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: string;
  };
  lines: CartLine[];
}

export async function POST(request: Request) {
  const body: CheckoutBody = await request.json();

  if (!body?.customer?.name || !body?.customer?.email || !body?.customer?.address) {
    return NextResponse.json({ error: "Missing required customer details." }, { status: 400 });
  }
  if (!body.lines?.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  // Prices are always resolved server-side from the catalog, never trusted from the client.
  const allProducts = await getProducts();
  const priceByProductId = new Map(allProducts.map((p) => [p.id, p]));

  const resolvedLines = body.lines
    .map((line) => {
      const product = priceByProductId.get(line.productId);
      if (!product) return null;
      return { product, quantity: line.quantity };
    })
    .filter((l): l is { product: (typeof allProducts)[number]; quantity: number } => l !== null);

  if (!resolvedLines.length) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
  }

  const total = resolvedLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  let orderId = randomUUID();

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: body.customer.name,
        customer_email: body.customer.email,
        customer_phone: body.customer.phone ?? null,
        delivery_address: body.customer.address,
        total_som: total,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
    }

    orderId = order.id;

    const { error: itemsError } = await supabase.from("order_items").insert(
      resolvedLines.map((l) => ({
        order_id: orderId,
        product_id: l.product.id,
        quantity: l.quantity,
        unit_price_som: l.product.price,
      }))
    );

    if (itemsError) {
      return NextResponse.json({ error: "Failed to save order items." }, { status: 500 });
    }
  } else {
    console.info("[checkout] Supabase not configured — order not persisted.", {
      orderId,
      customer: body.customer,
      total,
    });
  }

  const payment = await processPayment(orderId, total);

  return NextResponse.json({
    orderId,
    total,
    paymentReference: payment.reference,
    persisted: isSupabaseConfigured,
  });
}
