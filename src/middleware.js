import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const NEXTAUTH_SECRET =
  process.env.NEXTAUTH_SECRET || "eventsync-local-development-secret"

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
  },
  {
    secret: NEXTAUTH_SECRET,
    pages: { signIn: "/login", error: "/login" },
  }
)

export const config = { matcher: ["/admin/:path*"] }
