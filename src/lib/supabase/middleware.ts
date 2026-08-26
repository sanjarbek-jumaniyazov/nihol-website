import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import type { Locale } from "@/i18n/config";

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/** Refreshes the Supabase session cookie and gates /admin routes to logged-in admin emails. Called only for locale-prefixed paths whose remainder starts with /admin. */
export async function updateSession(request: NextRequest, locale: Locale) {
  let response = NextResponse.next({ request });

  const loginPath = `/${locale}/admin/login`;
  const isLoginRoute = request.nextUrl.pathname === loginPath;

  if (!SUPABASE_CONFIGURED) {
    if (isLoginRoute) return response;
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authorized = isAdminEmail(user?.email);

  if (!authorized && !isLoginRoute) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }
  if (authorized && isLoginRoute) {
    return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
  }

  return response;
}
