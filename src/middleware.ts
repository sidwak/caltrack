import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabaseServer";

export async function middleware(request: NextRequest) {
  try {
    // Create a response object that we can modify
    const response = NextResponse.next();

    // Create a Supabase client
    const supabase = await createClient();

    // Refresh the session if needed
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    // Define protected routes
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );
    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  } catch (e: any) {
    return NextResponse.next();
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};