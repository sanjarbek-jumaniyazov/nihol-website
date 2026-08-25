import { NextResponse } from "next/server";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";

interface InquiryBody {
  fullName: string;
  email: string;
  phone?: string;
  treeCount: number;
  landOption: "own-land" | "partner-farm";
  message?: string;
}

export async function POST(request: Request) {
  const body: InquiryBody = await request.json();

  if (!body?.fullName || !body?.email || !body?.treeCount || !body?.landOption) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { error } = await supabase.from("investment_inquiries").insert({
      full_name: body.fullName,
      email: body.email,
      phone: body.phone ?? null,
      tree_count: body.treeCount,
      land_option: body.landOption,
      message: body.message ?? null,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to submit inquiry." }, { status: 500 });
    }
  } else {
    console.info("[investment-inquiry] Supabase not configured — inquiry not persisted.", body);
  }

  return NextResponse.json({ success: true });
}
