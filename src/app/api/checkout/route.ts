import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getProducts, getTreePackages } from "@/lib/data";
import { defaultLocale } from "@/i18n/config";
import { processPayment } from "@/lib/payment";
import { getCurrentCustomer } from "@/lib/auth";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";
import type { CartLine } from "@/lib/types";

interface CheckoutBody {
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: string;
    entrance?: string;
    landmark?: string;
    deliverySlot?: string;
    note?: string;
    certName?: string;
    attendPlanting?: boolean;
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
  // Locale only affects display text here, not price, so any locale works.
  const [allProducts, allPackages] = await Promise.all([
    getProducts(defaultLocale),
    getTreePackages(defaultLocale),
  ]);
  const productById = new Map(allProducts.map((p) => [p.id, p]));
  const packageById = new Map(allPackages.map((p) => [p.id, p]));

  const resolvedLines = body.lines
    .map((line) => {
      if (line.kind === "product") {
        const product = productById.get(line.id);
        if (!product) return null;
        return {
          itemType: "product" as const,
          name: product.name,
          quantity: line.quantity,
          unitPriceSom: product.price,
          productId: product.id,
          treePackageId: null as string | null,
          treeQuantity: 0,
        };
      }
      const pkg = packageById.get(line.id);
      if (!pkg) return null;
      return {
        itemType: "tree_package" as const,
        name: pkg.name,
        quantity: line.quantity,
        unitPriceSom: pkg.priceSom,
        productId: null as string | null,
        treePackageId: pkg.id,
        treeQuantity: pkg.quantity * line.quantity,
      };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  if (!resolvedLines.length) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
  }

  const total = resolvedLines.reduce((sum, l) => sum + l.unitPriceSom * l.quantity, 0);
  const totalTrees = resolvedLines.reduce((sum, l) => sum + l.treeQuantity, 0);

  let orderId = randomUUID();

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const customer = await getCurrentCustomer();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: customer?.id ?? null,
        customer_name: body.customer.name,
        customer_email: body.customer.email,
        customer_phone: body.customer.phone ?? null,
        delivery_address: body.customer.address,
        entrance: body.customer.entrance ?? null,
        landmark: body.customer.landmark ?? null,
        delivery_slot: body.customer.deliverySlot ?? null,
        note: body.customer.note ?? null,
        total_som: total,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
    }

    orderId = order.id;

    await supabase.from("order_status_history").insert({ order_id: orderId, status: "placed" });

    const { error: itemsError } = await supabase.from("order_items").insert(
      resolvedLines.map((l) => ({
        order_id: orderId,
        item_type: l.itemType,
        product_id: l.productId,
        tree_package_id: l.treePackageId,
        quantity: l.quantity,
        unit_price_som: l.unitPriceSom,
      }))
    );

    if (itemsError) {
      return NextResponse.json({ error: "Failed to save order items." }, { status: 500 });
    }

    const payment = await processPayment(orderId, total);

    await supabase
      .from("orders")
      .update({
        payment_status: payment.success ? "paid" : "failed",
        payment_provider: "stub",
        payment_reference: payment.reference,
      })
      .eq("id", orderId);

    // Fulfillment: every tree_package line on a paid, authenticated order becomes
    // individually owned trees in the buyer's Grove, right away.
    if (payment.success && customer && totalTrees > 0) {
      const { data: lastTree } = await supabase
        .from("trees")
        .select("code")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const lastNumber = lastTree?.code ? parseInt(lastTree.code.replace("NH-", ""), 10) || 1000 : 1000;

      let nextNumber = lastNumber;
      const treeRows = resolvedLines
        .filter((l) => l.itemType === "tree_package")
        .flatMap((l) =>
          Array.from({ length: l.treeQuantity }, () => ({
            user_id: customer.id,
            order_id: orderId,
            package_id: l.treePackageId,
            code: `NH-${++nextNumber}`,
          }))
        );

      if (treeRows.length) {
        await supabase.from("trees").insert(treeRows);
      }
    }

    return NextResponse.json({
      orderId,
      total,
      trees: totalTrees,
      paymentReference: payment.reference,
      persisted: true,
    });
  }

  console.info("[checkout] Supabase not configured — order not persisted.", {
    orderId,
    customer: body.customer,
    total,
  });

  const payment = await processPayment(orderId, total);

  return NextResponse.json({
    orderId,
    total,
    trees: totalTrees,
    paymentReference: payment.reference,
    persisted: false,
  });
}
