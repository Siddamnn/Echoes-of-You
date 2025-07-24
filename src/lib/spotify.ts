import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
const AUTH_SECRET = process.env.AUTH_SECRET!;

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const API_BASE = 'https://api.spotify.com/v1';

export interface SpotifyUser {
  display_name: string;
  images: { url: string }[];
  id: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: { url: string }[];
}

export interface RecentlyPlayedItem {
  track: SpotifyTrack;
}

async function getAccessToken() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('spotify_access_token')?.value;
  const refreshToken = cookieStore.get('spotify_refresh_token')?.value;
  const expiresAt = Number(cookieStore.get('spotify_expires_at')?.value || '0');

  if (Date.now() > expiresAt) {
    if (!refreshToken) {
      console.log('No refresh token, redirecting to login');
      return redirect('/');
    }
    return refreshAccessToken(refreshToken);
  }

  return accessToken;
}

export async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Failed to refresh token', data);
    return redirect('/');
  }

  const { access_token, expires_in } = data;
  const newExpiresAt = Date.now() + expires_in * 1000;

  const cookieStore = cookies();
  cookieStore.set('spotify_access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: expires_in,
    path: '/',
  });
  cookieStore.set('spotify_expires_at', newExpiresAt.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: expires_in,
    path: '/',
  });

  return access_token;
}

async function spotifyFetch(endpoint: string) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error(`Spotify API error on ${endpoint}:`, response.status, response.statusText);
    if(response.status === 401) {
        // Token might be invalid, try a hard redirect
        return redirect('/');
    }
    throw new Error(`Spotify API error: ${response.statusText}`);
  }
  return response.json();
}

export const getMe = () => spotifyFetch('/me') as Promise<SpotifyUser>;
export const getTopArtists = () => spotifyFetch('/me/top/artists?limit=10') as Promise<{ items: SpotifyArtist[] }>;
export const getRecentlyPlayed = () => spotifyFetch('/me/player/recently-played?limit=10') as Promise<{ items: RecentlyPlayedItem[] }>;
export const getTopTracks = () => spotifyFetch('/me/top/tracks?limit=12') as Promise<{ items: SpotifyTrack[] }>;
