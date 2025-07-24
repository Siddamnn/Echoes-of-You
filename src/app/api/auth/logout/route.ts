import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete('spotify_access_token');
  cookieStore.delete('spotify_refresh_token');
  cookieStore.delete('spotify_expires_at');

  return NextResponse.redirect(new URL('/', request.url));
}
