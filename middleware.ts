// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  const { data: { user } } = await supabase.auth.getUser()

  // Protege todo lo que empiece con /admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Si no está logueado → a login
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Solo permite al email exacto del admin
    const adminEmail = 'connekflycontadm@gmail.com'

    if (user.email !== adminEmail) {
      // Si no es el admin → redirige a home
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

// Config: solo aplica en rutas /admin y subrutas
export const config = {
  matcher: ['/admin/:path*'],
}