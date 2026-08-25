import { createServiceRoleClient, isSupabaseConfigured } from "@/lib/supabase/server";

export interface InvestmentInquiryRow {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  tree_count: number;
  land_option: string;
  message: string | null;
  status: "new" | "contacted" | "converted" | "closed";
  created_at: string;
}

export interface OrderItemRow {
  id: string;
  quantity: number;
  unit_price_som: number;
  products: { name: string } | null;
}

export interface OrderRow {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  delivery_address: string;
  total_som: number;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  payment_provider: string | null;
  payment_reference: string | null;
  created_at: string;
  order_items: OrderItemRow[];
}

export interface ContactMessageRow {
  id: string;
  full_name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "new" | "responded" | "closed";
  created_at: string;
}

export async function getInquiries(): Promise<InvestmentInquiryRow[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("investment_inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getOrders(): Promise<OrderRow[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(id, quantity, unit_price_som, products(name))")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getContactMessages(): Promise<ContactMessageRow[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getAdminStats() {
  const [inquiries, orders] = await Promise.all([getInquiries(), getOrders()]);

  const treesRequested = inquiries.reduce((sum, i) => sum + i.tree_count, 0);
  const revenueSom = orders
    .filter((o) => o.payment_status === "paid")
    .reduce((sum, o) => sum + Number(o.total_som), 0);

  const inquiriesByStatus = inquiries.reduce<Record<string, number>>((acc, i) => {
    acc[i.status] = (acc[i.status] ?? 0) + 1;
    return acc;
  }, {});

  return {
    inquiryCount: inquiries.length,
    treesRequested,
    orderCount: orders.length,
    revenueSom,
    inquiriesByStatus,
    recentInquiries: inquiries.slice(0, 5),
    recentOrders: orders.slice(0, 5),
  };
}
