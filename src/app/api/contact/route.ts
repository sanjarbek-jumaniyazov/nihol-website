import { NextResponse } from "next/server";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";

interface ContactBody {
  fullName: string;
  email: string;
  subject?: string;
  message: string;
}

export async function POST(request: Request) {
  const body: ContactBody = await request.json();

  if (!body?.fullName || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      full_name: body.fullName,
      email: body.email,
      subject: body.subject ?? null,
      message: body.message,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
  } else {
    console.info("[contact] Supabase not configured — message not persisted.", body);
  }

  return NextResponse.json({ success: true });
}
