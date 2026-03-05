'use client';

import { useState } from 'react';

export default function ResourcesTabs() {
  const [activeTab, setActiveTab] = useState<'passport' | 'destination'>('passport');

  const scrollToSection = (section: 'passport' | 'destination') => {
    setActiveTab(section);
    const elementId = section === 'passport' ? 'browse-by-passport' : 'browse-by-destination';
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="flex">
      <button
        onClick={() => scrollToSection('passport')}
        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'passport'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
        aria-current={activeTab === 'passport' ? 'page' : undefined}
      >
        By Passport
      </button>
      <button
        onClick={() => scrollToSection('destination')}
        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'destination'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
        aria-current={activeTab === 'destination' ? 'page' : undefined}
      >
        By Destination
      </button>
    </nav>
  );
}
