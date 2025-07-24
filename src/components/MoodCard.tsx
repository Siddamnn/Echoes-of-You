import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface MoodCardProps {
  card: {
    id: string;
    imageUrl: string;
    title: string;
    artist: string;
  };
}

export function MoodCard({ card }: MoodCardProps) {
  return (
    <div className="snap-center shrink-0 w-64">
      <Card className="bg-card border-0 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="p-0">
          <div className="relative aspect-square w-full">
            <Image
              src={card.imageUrl}
              alt={`Album art for ${card.title}`}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="album cover"
            />
          </div>
          <div className="p-4 bg-card/50 backdrop-blur-sm">
            <h3 className="font-bold text-lg truncate text-foreground">{card.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{card.artist}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
