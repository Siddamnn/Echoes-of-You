import { SpotifyLoginButton } from '@/components/SpotifyLoginButton';
import { Waveform } from '@/components/Waveform';
import { ErrorAlert } from '@/components/ErrorAlert';
import { Music } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-8 text-center">
      <ErrorAlert />
      <Waveform />
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 flex items-center gap-4 text-primary">
          <Music className="h-12 w-12" />
          <h1 className="text-6xl font-bold tracking-tighter text-foreground">
            LyricLore
          </h1>
        </div>
        <p className="mb-10 max-w-md text-lg text-muted-foreground">
          Discover the poetry in your playlists. We analyze your Spotify listening history to reveal your musical soul.
        </p>
        <SpotifyLoginButton />
        <p className="mt-4 text-xs text-muted-foreground/50">
          We do not store your Spotify data.
        </p>
      </div>
    </main>
  );
}
