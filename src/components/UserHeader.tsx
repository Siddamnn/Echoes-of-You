import type { SpotifyUser } from '@/lib/spotify';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface UserHeaderProps {
  user: SpotifyUser;
}

export function UserHeader({ user }: UserHeaderProps) {
  const userInitial = user.display_name ? user.display_name[0].toUpperCase() : '?';

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.images[0]?.url} alt={user.display_name} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Logged in as</p>
            <p className="font-bold text-lg text-foreground">{user.display_name}</p>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm">
          <a href="/api/auth/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </a>
        </Button>
      </div>
    </header>
  );
}
