// middleware.ts
export const runtime = "experimental-edge";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return res;
  }

  const hasSession =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("supabase-auth-token");

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
