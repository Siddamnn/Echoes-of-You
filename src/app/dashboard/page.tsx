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

    const poemData = await generateLyricSummary(aiInput);

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
    // This could be a more user-friendly error page
    return (
        <div className="flex h-screen items-center justify-center bg-background text-center">
            <div>
                <h1 className="text-2xl font-bold text-destructive">Could not load your profile.</h1>
                <p className="text-muted-foreground">Your session might have expired. Please try logging out and in again.</p>
                <a href="/api/auth/logout" className="mt-4 inline-block text-primary hover:underline">Logout</a>
            </div>
        </div>
    )
  }
}
