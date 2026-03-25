'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Faq {
  question: string;
  answer: string;
}

export default function BlogSeoAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
      {faqs.map((faq, idx) => (
        <div key={idx}>
          <button
            type="button"
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
            aria-expanded={open === idx}
          >
            <span className="text-base font-semibold text-gray-900 leading-snug">
              {faq.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                open === idx ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          {open === idx && (
            <div className="px-6 pb-5 bg-white">
              <p
                className="text-gray-600 leading-relaxed text-sm"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
