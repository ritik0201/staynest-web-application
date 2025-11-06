import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // If the user is not logged in (no token) and is trying to access a protected route
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/owner"))) {
    // Redirect them to the home page, which typically contains the login prompt
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed if the user is logged in or accessing a public route
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/owner/:path*"],
};