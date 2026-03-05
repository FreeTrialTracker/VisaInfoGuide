'use client';

import Link from 'next/link';
import { Clock, RefreshCw } from 'lucide-react';

interface Props {
  title?: string;
  message?: string;
}

export default function TemporaryUnavailable({
  title = 'Temporarily Unavailable',
  message = 'This page is temporarily unavailable due to a service disruption. Please try again in a few minutes.',
}: Props) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 border border-amber-200">
            <Clock className="h-8 w-8 text-amber-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-600 leading-relaxed mb-8">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Go to homepage
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          If this persists, the service will recover automatically. No action is required.
        </p>
      </div>
    </div>
  );
}
