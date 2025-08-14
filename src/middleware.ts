import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPulicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail"

  const token = request.cookies.get("token")?.value || ""

  if (isPulicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  if (!isPulicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
}
