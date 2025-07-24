'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function SpotifyLoginButton() {
  const [authUrl, setAuthUrl] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // We construct the URL on the client-side to ensure env vars are available.
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

    console.log('Spotify Client ID:', clientId);
    console.log('Spotify Redirect URI:', redirectUri);
    
    if (!clientId) {
      setError('Spotify Client ID is missing');
      return;
    }
    
    if (!redirectUri) {
      setError('Spotify Redirect URI is missing');
      return;
    }
    
    if (clientId && redirectUri) {
      const scopes = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-read-recently-played',
      ];
      
      // Add state parameter for security
      const state = Math.random().toString(36).substring(2, 15);
      
      const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes.join(
        ' '
      )}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
      
      console.log('Generated auth URL:', url);
      setAuthUrl(url);
    }
  }, [isClient]);

  const handleClick = (e: React.MouseEvent) => {
    if (!authUrl) {
      e.preventDefault();
      console.error('Auth URL not available:', error || 'Unknown error');
      return;
    }
    console.log('Redirecting to:', authUrl);
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <Button
        disabled
        size="lg"
        className="bg-primary text-primary-foreground text-lg font-bold py-6 px-10 rounded-full"
      >
        Loading...
      </Button>
    );
  }

  if (error) {
    return (
      <Button disabled className="bg-red-500 text-white">
        Configuration Error: {error}
      </Button>
    );
  }

  return (
    <Button
      asChild
      size="lg"
      className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold py-6 px-10 rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
      disabled={!authUrl}
    >
      <a href={authUrl} onClick={handleClick}>
        Log in with Spotify
      </a>
    </Button>
  );
}
