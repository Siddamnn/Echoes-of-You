'use client';

import { useState, useTransition } from 'react';
import type { GenerateLyricSummaryInput, GenerateLyricSummaryOutput } from '@/ai/flows/generate-lyric-summary';
import type { SpotifyUser } from '@/lib/spotify';
import { Button } from '@/components/ui/button';
import { RefreshCw, LoaderCircle } from 'lucide-react';
import { UserHeader } from './UserHeader';
import { MoodCard } from './MoodCard';
import { FooterActions } from './FooterActions';
import { regeneratePoemAction } from '@/app/dashboard/actions';

interface DashboardClientProps {
  user: SpotifyUser;
  initialPoem: GenerateLyricSummaryOutput;
  moodCards: {
    id: string;
    imageUrl: string;
    title: string;
    artist: string;
  }[];
  aiInput: GenerateLyricSummaryInput;
}

export function DashboardClient({ user, initialPoem, moodCards, aiInput }: DashboardClientProps) {
  const [poem, setPoem] = useState(initialPoem);
  const [isPending, startTransition] = useTransition();

  const handleRegenerate = () => {
    startTransition(async () => {
      const newPoem = await regeneratePoemAction(aiInput);
      setPoem(newPoem);
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UserHeader user={user} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center text-center">
        <div className="max-w-3xl w-full">
          <blockquote className="relative mb-12">
            <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight md:leading-tight text-foreground whitespace-pre-line">
              {poem.poem}
            </p>
          </blockquote>

          <Button
            onClick={handleRegenerate}
            disabled={isPending}
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 group"
          >
            {isPending ? (
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-5 w-5 transition-transform group-hover:rotate-180" />
            )}
            Regenerate
          </Button>
        </div>

        <div className="mt-16 md:mt-24 w-full">
           <h2 className="text-2xl font-bold tracking-tight mb-6">Your Mood Board</h2>
          <div className="relative">
             <div className="flex w-full overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
               {moodCards.map((card, index) => (
                 <MoodCard key={card.id} card={card} />
               ))}
             </div>
             <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
             <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          </div>
        </div>
      </main>
      <FooterActions />
    </div>
  );
}
