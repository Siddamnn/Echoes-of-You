import {
  getMe,
  getRecentlyPlayed,
  getTopArtists,
  getTopTracks,
} from '@/lib/spotify';
import { generateLyricSummary } from '@/ai/flows/generate-lyric-summary';
import { DashboardClient } from '@/components/DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  try {
    // Fetch all required data
    const [user, topArtistsData, recentlyPlayedData, topTracksData] = await Promise.all([
      getMe(),
      getTopArtists(),
      getRecentlyPlayed(),
      getTopTracks(),
    ]);

    const topArtists = topArtistsData.items;
    const recentTracks = recentlyPlayedData.items.map(item => item.track);
    const topTracks = topTracksData.items;
    
    const favoriteGenres = [
      ...new Set(topArtists.flatMap(artist => artist.genres)),
    ].slice(0, 5);

    const aiInput = {
      recentTracks: recentTracks.map(t => `${t.name} by ${t.artists[0].name}`).join(', '),
      topArtists: topArtists.map(a => a.name).join(', '),
      favoriteGenres: favoriteGenres.join(', '),
    };

    // Generate AI summary (with error handling)
    let poemData;
    try {
      poemData = await generateLyricSummary(aiInput);
    } catch (aiError) {
      console.error('AI generation failed:', aiError);
      // Provide a fallback poem
      poemData = {
        poem: "Your musical journey speaks volumes,\nA tapestry of sound and soul,\nEach song a chapter in your story,\nTogether making you whole."
      };
    }

    const moodCards = topTracks.map(track => ({
      id: track.id,
      imageUrl: track.album.images[0]?.url || 'https://placehold.co/300x300.png',
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
    }));

    return (
      <DashboardClient
        user={user}
        initialPoem={poemData}
        moodCards={moodCards}
        aiInput={aiInput}
      />
    );
  } catch (error) {
    console.error('Error loading dashboard:', error);
    
    // Check if this is an authentication error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // If it's a redirect error, let it propagate
    if (errorMessage.includes('NEXT_REDIRECT')) {
      throw error;
    }
    
    return (
        <div className="flex h-screen items-center justify-center bg-background text-center">
            <div className="max-w-md mx-auto p-6">
                <h1 className="text-2xl font-bold text-destructive mb-4">Could not load your profile</h1>
                <p className="text-muted-foreground mb-6">
                    Your session might have expired. Please try logging out and logging in again.
                </p>
                <div className="space-y-3">
                    <a 
                        href="/api/auth/logout" 
                        className="block w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Logout and Login Again
                    </a>
                    <a 
                        href="/" 
                        className="block w-full border border-border hover:bg-accent px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Go to Home
                    </a>
                </div>
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-6 text-left">
                        <summary className="cursor-pointer text-sm text-muted-foreground">
                            Debug Info (Development Only)
                        </summary>
                        <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                            {errorMessage}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
  }
}
