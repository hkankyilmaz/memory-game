import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // get cookie token
  const hasToken = req.cookies.get("jwt");

  // protected routes (admin routes)
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (hasToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // login & register routes
  if (["/login", "/register"].includes(req.nextUrl.pathname)) {
    if (hasToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.next();
    }
  }
}
