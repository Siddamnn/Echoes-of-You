'use client';

import { Button } from '@/components/ui/button';
import { Download, Share2, Home } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function FooterActions() {
    const handleActionClick = (action: string) => {
        // Placeholder for future functionality
        console.log(`${action} clicked`);
    }

  return (
    <footer className="w-full py-6 bg-background/50 border-t border-white/10">
      <div className="container mx-auto flex justify-center items-center gap-4">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-12 w-12" onClick={() => handleActionClick('Save as PDF')}>
                        <Download className="h-6 w-6" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Save as PDF</p>
                </TooltipContent>
            </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-12 w-12" onClick={() => handleActionClick('Share')}>
                        <Share2 className="h-6 w-6" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Share</p>
                </TooltipContent>
            </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon" className="rounded-full h-12 w-12">
                        <a href="/api/auth/logout">
                            <Home className="h-6 w-6" />
                        </a>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Go Home/Logout</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  );
}
