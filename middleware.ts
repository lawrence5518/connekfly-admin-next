// middleware.ts
export const runtime = "edge";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (!isAdminRoute) return res;

  // Cookie que usa Supabase Auth
  const supabaseSession =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("supabase-auth-token");

  if (!supabaseSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
