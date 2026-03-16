'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { homeFaqs } from '@/lib/faq-data';

export default function HomeFAQ() {
  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Frequently Asked Questions
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Common questions about visa requirements, entry rules, and travel planning.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {homeFaqs.map(({ q, a }, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium text-gray-900 hover:no-underline hover:text-teal-700">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600 leading-relaxed">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
