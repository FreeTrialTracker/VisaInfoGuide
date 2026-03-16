'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    headings.forEach((heading) => heading && observer.observe(heading));

    return () => {
      headings.forEach((heading) => heading && observer.unobserve(heading));
    };
  }, [items]);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">Table of Contents</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 16}px` }}>
              <a
                href={`#${item.id}`}
                className={`block text-sm py-1 px-2 rounded transition-colors ${
                  activeId === item.id
                    ? 'text-teal-700 font-medium bg-teal-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
