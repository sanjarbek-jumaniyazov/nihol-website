/**
 * Data-access layer. Currently backed by mock data (src/lib/mock-data.ts)
 * so the app runs without any setup. Once Supabase is configured and seeded
 * (see supabase/schema.sql), swap the bodies of these functions for queries
 * against `createClient()` from "@/lib/supabase/server" — the return shapes
 * already match the `farms` / `products` tables in the schema.
 */
import type { Locale } from "@/i18n/config";
import {
  farms,
  products,
  testimonials,
  faqs,
  supportFaqs,
  trustStats,
  treePackages,
  mockTrees,
  mockTreeCareLog,
  mockOrders,
  mockProductReviews,
  localizeFarm,
  localizeProduct,
  localizeTestimonial,
  localizeFaq,
  localizeTreePackage,
} from "./mock-data";
import { isSupabaseConfigured, createClient } from "./supabase/server";
import type {
  Farm,
  Product,
  ProductCategory,
  TreePackage,
  Tree,
  TreeCareLogEntry,
  Address,
  PaymentMethodLabel,
  ProductReview,
  NotificationPreferences,
  Order,
  OrderTrackingStep,
  OrderStatus,
} from "./types";

const ORDER_STATUS_SEQUENCE: OrderStatus[] = ["placed", "packed", "in_transit", "out_for_delivery", "delivered"];

export async function getFarms(locale: Locale): Promise<Farm[]> {
  return farms.map((f) => localizeFarm(f, locale));
}

export async function getFeaturedFarms(locale: Locale): Promise<Farm[]> {
  return farms.filter((f) => f.featured).map((f) => localizeFarm(f, locale));
}

export async function getFarmBySlug(slug: string, locale: Locale): Promise<Farm | undefined> {
  const farm = farms.find((f) => f.slug === slug);
  return farm ? localizeFarm(farm, locale) : undefined;
}

export async function getFarmById(id: string, locale: Locale): Promise<Farm | undefined> {
  const farm = farms.find((f) => f.id === id);
  return farm ? localizeFarm(farm, locale) : undefined;
}

export async function getProducts(
  locale: Locale,
  filters?: {
    category?: ProductCategory;
    farmId?: string;
    query?: string;
  }
): Promise<Product[]> {
  let result = products.map((p) => localizeProduct(p, locale));

  if (filters?.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters?.farmId) {
    result = result.filter((p) => p.farmId === filters.farmId);
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  return result;
}

export async function getProductBySlug(slug: string, locale: Locale): Promise<Product | undefined> {
  const product = products.find((p) => p.slug === slug);
  return product ? localizeProduct(product, locale) : undefined;
}

export async function getProductsByFarm(farmId: string, locale: Locale): Promise<Product[]> {
  return products.filter((p) => p.farmId === farmId).map((p) => localizeProduct(p, locale));
}

export async function getRelatedProducts(product: Product, locale: Locale, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
    .map((p) => localizeProduct(p, locale));
}

export async function getTestimonials(locale: Locale) {
  return testimonials.map((t) => localizeTestimonial(t, locale));
}

export async function getFaqs(locale: Locale) {
  return faqs.map((f) => localizeFaq(f, locale));
}

export async function getSupportFaqs(locale: Locale) {
  return supportFaqs.map((f) => localizeFaq(f, locale));
}

export async function getTrustStats() {
  return trustStats;
}

// ---------------------------------------------------------------------------
// Everything below reads real per-customer data once Supabase is configured
// (falling back to the fixed demo dataset in mock-data.ts otherwise, matching
// getCurrentCustomer()'s "demo-customer" identity in src/lib/auth.ts). Unlike
// the catalog functions above, these are new and ship with the Supabase
// branch from the start.
// ---------------------------------------------------------------------------

export async function getTreePackages(locale: Locale): Promise<TreePackage[]> {
  if (!isSupabaseConfigured) return treePackages.map((p) => localizeTreePackage(p, locale));

  const supabase = await createClient();
  const { data } = await supabase.from("tree_packages").select("*").order("sort_order");
  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    quantity: row.quantity,
    tag: row.tag ?? "",
    blurb: row.blurb ?? "",
    priceSom: Number(row.price_som),
    returnLowUsd: Number(row.return_low_usd),
    returnHighUsd: Number(row.return_high_usd),
    stockLabel: row.stock_label ?? "",
    imageUrl: row.image_url ?? undefined,
  }));
}

export async function getTreePackageBySlug(slug: string, locale: Locale): Promise<TreePackage | undefined> {
  const pkgs = await getTreePackages(locale);
  return pkgs.find((p) => p.slug === slug);
}

export async function getMyTrees(userId: string): Promise<Tree[]> {
  if (!isSupabaseConfigured) return mockTrees;

  const supabase = await createClient();
  const { data } = await supabase
    .from("trees")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");

  return (data ?? []).map((row) => ({
    id: row.id,
    code: row.code,
    plot: row.plot,
    plantedAt: row.planted_at,
    heightCm: Number(row.height_cm),
    girthCm: Number(row.girth_cm),
    stage: row.stage,
    harvestEstimateDate: row.harvest_estimate_date,
    co2KgTarget: Number(row.co2_kg_target),
  }));
}

export async function getTree(id: string, userId: string): Promise<Tree | undefined> {
  const trees = await getMyTrees(userId);
  return trees.find((t) => t.id === id);
}

export async function getTreeCareLog(treeId: string): Promise<TreeCareLogEntry[]> {
  if (!isSupabaseConfigured) return mockTreeCareLog[treeId] ?? [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("tree_care_log")
    .select("*")
    .eq("tree_id", treeId)
    .order("logged_at", { ascending: false });

  return (data ?? []).map((row) => ({ id: row.id, loggedAt: row.logged_at, note: row.note }));
}

export async function getSavedProductIds(userId: string): Promise<string[]> {
  if (!isSupabaseConfigured) return ["p-2"];

  const supabase = await createClient();
  const { data } = await supabase.from("saved_products").select("product_id").eq("user_id", userId);
  return (data ?? []).map((row) => row.product_id as string);
}

export async function getSavedProducts(userId: string, locale: Locale): Promise<Product[]> {
  const ids = new Set(await getSavedProductIds(userId));
  const all = await getProducts(locale);
  return all.filter((p) => ids.has(p.id));
}

export async function getMyOrders(userId: string): Promise<Order[]> {
  if (!isSupabaseConfigured) return mockOrders;

  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("id, status, payment_status, total_som, created_at, order_items(item_type, product_id, tree_package_id, quantity, unit_price_som, products(name), tree_packages(name))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    status: row.status,
    paymentStatus: row.payment_status,
    totalSom: Number(row.total_som),
    createdAt: row.created_at,
    items: (row.order_items ?? []).map((item: Record<string, unknown>) => ({
      itemType: item.item_type,
      productId: item.product_id,
      treePackageId: item.tree_package_id,
      name:
        (item.products as { name?: string } | null)?.name ??
        (item.tree_packages as { name?: string } | null)?.name ??
        "",
      quantity: item.quantity,
      unitPriceSom: Number(item.unit_price_som),
    })),
  })) as unknown as Order[];
}

export async function getOrderTracking(orderId: string, userId: string): Promise<OrderTrackingStep[] | undefined> {
  const orders = await getMyOrders(userId);
  const order = orders.find((o) => o.id === orderId);
  if (!order) return undefined;

  const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(order.status);
  return ORDER_STATUS_SEQUENCE.map((status, i) => ({
    status,
    label: status,
    at: i <= currentIndex ? order.createdAt : null,
    done: i <= currentIndex,
  }));
}

export async function getAddresses(userId: string): Promise<Address[]> {
  if (!isSupabaseConfigured) {
    return [
      { id: "a1", label: "Home", line: "Amir Temur ko'chasi 42, kv. 18", city: "Tashkent 100084", isDefault: true },
      { id: "a2", label: "Office", line: "Mustaqillik shoh ko'chasi 7, 4-qavat", city: "Tashkent 100000", isDefault: false },
    ];
  }

  const supabase = await createClient();
  const { data } = await supabase.from("addresses").select("*").eq("user_id", userId).order("created_at");
  return (data ?? []).map((row) => ({
    id: row.id,
    label: row.label,
    line: row.line,
    city: row.city,
    isDefault: row.is_default,
  }));
}

export async function getPaymentMethodLabels(userId: string): Promise<PaymentMethodLabel[]> {
  if (!isSupabaseConfigured) {
    return [
      { id: "pm1", provider: "payme", label: "Payme", meta: "•••• 4412 · default", isDefault: true },
      { id: "pm2", provider: "click", label: "Click", meta: "Linked to +998 90 123 45 67", isDefault: false },
    ];
  }

  const supabase = await createClient();
  const { data } = await supabase.from("payment_method_labels").select("*").eq("user_id", userId).order("created_at");
  return (data ?? []).map((row) => ({
    id: row.id,
    provider: row.provider,
    label: row.label,
    meta: row.meta ?? "",
    isDefault: row.is_default,
  }));
}

export async function getNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  const defaults: NotificationPreferences = { growth: true, milestones: true, payments: true, delivery: true, promos: false };
  if (!isSupabaseConfigured) return defaults;

  const supabase = await createClient();
  const { data } = await supabase.from("notification_preferences").select("*").eq("user_id", userId).maybeSingle();
  if (!data) return defaults;
  return {
    growth: data.growth,
    milestones: data.milestones,
    payments: data.payments,
    delivery: data.delivery,
    promos: data.promos,
  };
}

export async function getReferralCode(userId: string, fullName: string): Promise<string> {
  if (!isSupabaseConfigured) return "DILNOZA26";

  const supabase = await createClient();
  const { data } = await supabase.from("referrals").select("code").eq("user_id", userId).maybeSingle();
  if (data?.code) return data.code;

  const code = (fullName || "NIHOL").split(" ")[0].toUpperCase().slice(0, 10) + Math.floor(10 + Math.random() * 90);
  await supabase.from("referrals").insert({ user_id: userId, code });
  return code;
}

export async function getProductReviews(productId: string): Promise<ProductReview[]> {
  if (!isSupabaseConfigured) return mockProductReviews.filter((r) => r.productId === productId);

  const supabase = await createClient();
  const { data } = await supabase
    .from("product_reviews")
    .select("id, product_id, rating, body, created_at, profiles(full_name)")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    productId: row.product_id,
    rating: row.rating,
    body: row.body,
    createdAt: row.created_at,
    reviewerName: (row.profiles as unknown as { full_name?: string } | null)?.full_name || "Verified buyer",
  }));
}
