'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, X } from 'lucide-react';

export function ErrorAlert() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        'access_denied': 'You need to authorize the app to access your Spotify data.',
        'state_mismatch': 'Security validation failed. Please try again.',
        'no_code': 'Authorization failed. Please try again.',
        'token_exchange_failed': 'Failed to exchange authorization code. Please try again.',
        'internal_server_error': 'An internal error occurred. Please try again.',
      };
      
      setError(errorMessages[errorParam] || 'An unknown error occurred. Please try again.');
      setShowError(true);
    }
  }, [searchParams]);

  if (!showError || !error) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <Alert variant="destructive" className="relative">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="pr-8">
          {error}
        </AlertDescription>
        <button
          onClick={() => setShowError(false)}
          className="absolute top-2 right-2 p-1 hover:bg-destructive/10 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  );
}
