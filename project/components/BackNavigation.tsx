'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackNavigationProps {
  fallbackUrl?: string;
  label?: string;
  className?: string;
}

const SESSION_KEY = 'lastPage';

export function usePageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = window.location.pathname;
      const previous = sessionStorage.getItem(SESSION_KEY);
      if (previous !== current) {
        sessionStorage.setItem(SESSION_KEY, previous ?? current);
      }
    }
  }, [pathname]);
}

export default function BackNavigation({
  fallbackUrl = '/',
  label = 'Back',
  className,
}: BackNavigationProps) {
  const router = useRouter();

  function handleBack() {
    if (typeof window === 'undefined') return;

    const referrer = document.referrer;
    const isSameOrigin = referrer && new URL(referrer).origin === window.location.origin;

    if (isSameOrigin) {
      router.back();
      return;
    }

    const lastPage = sessionStorage.getItem(SESSION_KEY);
    if (lastPage && lastPage !== window.location.pathname) {
      router.push(lastPage);
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackUrl);
  }

  return (
    <button
      onClick={handleBack}
      className={
        className ??
        'inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-8 group min-h-[44px] pr-3'
      }
    >
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors flex-shrink-0">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
      </span>
      <span>{label}</span>
    </button>
  );
}
