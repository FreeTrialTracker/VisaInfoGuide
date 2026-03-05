'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, Map, BookOpen, ChevronDown, Calculator, FileText } from 'lucide-react';
import CountrySearch from './CountrySearch';
import { useState, useRef, useEffect } from 'react';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0 group">
      <img src="/visa.png" alt="VisaInfoGuide.com logo" width={32} height={32} className="rounded-sm" />
      <span className="text-base font-bold text-gray-900 tracking-tight leading-none">
        Visa<span className="text-teal-500">Info</span>Guide.com
      </span>
    </Link>
  );
}

interface NavTabProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  disabled?: boolean;
}

function NavTab({ href, label, icon, active, disabled }: NavTabProps) {
  const base = 'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150';
  const activeClass = 'bg-teal-50 text-teal-700';
  const inactiveClass = 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
  const disabledClass = 'text-gray-400 cursor-not-allowed';

  if (disabled) {
    return (
      <span className={`${base} ${disabledClass}`}>
        {icon}
        {label}
        <span className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded font-normal ml-0.5">Soon</span>
      </span>
    );
  }

  return (
    <Link href={href} className={`${base} ${active ? activeClass : inactiveClass}`}>
      {icon}
      {label}
    </Link>
  );
}

function CountryFinderTab({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const base = 'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer select-none';
  const activeClass = 'bg-teal-50 text-teal-700';
  const inactiveClass = 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`${base} ${active || open ? activeClass : inactiveClass}`}
      >
        <Map className="w-4 h-4" />
        Country Finder
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
          <p className="text-xs text-gray-500 font-medium mb-2 px-1">Search a country or passport</p>
          <CountrySearch onSelect={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCountryActive =
    pathname.startsWith('/passport/') ||
    pathname.startsWith('/destination/') ||
    (pathname !== '/' && pathname !== '/trip' && pathname !== '/resources' && !pathname.startsWith('/guides/') && !pathname.startsWith('/tools/') && !pathname.startsWith('/visa-guides') && pathname.split('-to-').length === 2);

  const isResourcesActive = pathname === '/resources' || pathname.startsWith('/guides/');
  const isToolsActive = pathname.startsWith('/tools');
  const isVisaGuidesActive = pathname.startsWith('/visa-guides');

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 gap-4">
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            <NavTab
              href="/"
              label="Trip Visa Finder"
              icon={<Plane className="w-4 h-4" />}
              active={pathname === '/' || pathname === '/trip'}
            />
            <NavTab
              href="/visa-guides"
              label="Visa Guides"
              icon={<FileText className="w-4 h-4" />}
              active={isVisaGuidesActive}
            />
            <NavTab
              href="/resources"
              label="Resources"
              icon={<BookOpen className="w-4 h-4" />}
              active={isResourcesActive}
            />
            <NavTab
              href="/tools"
              label="Tools"
              icon={<Calculator className="w-4 h-4" />}
              active={isToolsActive}
            />
            <CountryFinderTab active={isCountryActive} />
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <NavTab
            href="/"
            label="Trip Visa Finder"
            icon={<Plane className="w-4 h-4" />}
            active={pathname === '/' || pathname === '/trip'}
          />
          <NavTab
            href="/visa-guides"
            label="Visa Guides"
            icon={<FileText className="w-4 h-4" />}
            active={isVisaGuidesActive}
          />
          <NavTab
            href="/resources"
            label="Resources"
            icon={<BookOpen className="w-4 h-4" />}
            active={isResourcesActive}
          />
          <NavTab
            href="/tools"
            label="Tools"
            icon={<Calculator className="w-4 h-4" />}
            active={isToolsActive}
          />
          <div className="py-1">
            <div className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md ${isCountryActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600'}`}>
              <Map className="w-4 h-4" />
              Country Finder
            </div>
            <div className="px-3 pt-2 pb-1">
              <CountrySearch onSelect={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
