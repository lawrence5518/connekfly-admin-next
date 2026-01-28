// middleware.ts
export const runtime = "experimental-edge";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo proteger /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Cookies de sesión de Supabase
  const hasSession =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("supabase-auth-token");

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
