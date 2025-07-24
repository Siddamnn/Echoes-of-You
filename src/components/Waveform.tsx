'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface WaveformBar {
  key: number;
  height: string;
  animationDuration: string;
  className: string;
}

export function Waveform() {
  const [bars, setBars] = useState<WaveformBar[]>([]);

  useEffect(() => {
    setBars(
      Array.from({ length: 50 }).map((_, i) => ({
        key: i,
        height: `${Math.random() * 80 + 10}%`,
        animationDuration: `${Math.random() * 2 + 1.5}s`,
        className: cn(
          'w-1 bg-primary/10 rounded-full animate-waveform',
          i % 2 === 0 ? 'animate-delay-200' : '',
          i % 3 === 0 ? 'animate-delay-400' : ''
        ),
      }))
    );
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative flex h-48 w-full max-w-lg items-center justify-center gap-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        {bars.length > 0 ? (
          bars.map(bar => (
            <div
              key={bar.key}
              className={bar.className}
              style={{
                height: bar.height,
                animationDuration: bar.animationDuration,
              }}
            />
          ))
        ) : (
          // Render a static placeholder on the server and initial client render
          Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary/10 rounded-full"
              style={{ height: '50%' }}
            />
          ))
        )}
      </div>
      <style jsx>{`
        @keyframes waveform {
          0%,
          100% {
            transform: scaleY(0.5);
            opacity: 0.3;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        .animate-waveform {
          animation-name: waveform;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .animate-delay-200 {
          animation-delay: 200ms;
        }
        .animate-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}
