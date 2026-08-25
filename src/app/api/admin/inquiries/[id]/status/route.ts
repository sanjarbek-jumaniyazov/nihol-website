import { NextResponse } from "next/server";
import { createClient, createServiceRoleClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

const VALID_STATUSES = ["new", "contacted", "converted", "closed"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const admin = createServiceRoleClient();
  const { error } = await admin.from("investment_inquiries").update({ status }).eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to update status." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
