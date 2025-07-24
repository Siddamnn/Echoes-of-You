import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">
        Humming through your tunes…
      </p>
    </div>
  );
}
