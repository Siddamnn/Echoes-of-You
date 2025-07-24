import { NextRequest, NextResponse } from 'next/server';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  console.log('Spotify callback received:', { code: !!code, error, state });

  // Handle authorization errors (user denied access, etc.)
  if (error) {
    console.error('Spotify authorization error:', error);
    return NextResponse.redirect(new URL(`/?error=${error}`, request.url));
  }

  if (!code) {
    console.error('No authorization code received');
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI!,
      }),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Token exchange failed:', data);
        return NextResponse.redirect(new URL(`/?error=${data.error_description || 'token_exchange_failed'}`, request.url));
    }
    
    const { access_token, refresh_token, expires_in } = data;
    const expires_at = Date.now() + expires_in * 1000;

    const res = NextResponse.redirect(new URL('/dashboard', request.url));

    res.cookies.set('spotify_access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires_in, // in seconds
      path: '/',
    });

    res.cookies.set('spotify_refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
    });

    res.cookies.set('spotify_expires_at', expires_at.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires_in,
        path: '/',
    });


    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/?error=internal_server_error', request.url));
  }
}
