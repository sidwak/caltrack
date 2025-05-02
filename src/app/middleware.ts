import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabaseSSR";

export async function middleware(request: NextRequest) {
  try {
    // Create a response object that we can modify
    const response = NextResponse.next();

    // Create a Supabase client
    const supabase = createClient();

    // Refresh the session if needed
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // Define protected routes
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );
    console.log(request.nextUrl);
    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  } catch (e: any) {
    // Handle any errors
    return NextResponse.next();
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};
