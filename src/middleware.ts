import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token);
  const hasToken = Boolean(token && token !== "undefined" && token !== "null");

  const { pathname } = request.nextUrl;
  const isGuestRoute = pathname === "/login" || pathname === "/register";

  // Authenticated users should not see guest routes
  if (hasToken && isGuestRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Unauthenticated users can only access guest routes
  if (!hasToken && !isGuestRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|map)).*)",
  ],
};
