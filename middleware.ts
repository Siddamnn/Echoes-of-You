import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only check authentication for dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const accessToken = request.cookies.get('spotify_access_token');
    const refreshToken = request.cookies.get('spotify_refresh_token');
    
    // If no tokens at all, redirect to home
    if (!accessToken && !refreshToken) {
      console.log('No authentication tokens found, redirecting to home');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
