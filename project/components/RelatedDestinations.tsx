import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { ContextualDestinationLink } from '@/lib/data/crosslinks';

interface RelatedDestinationsProps {
  links: ContextualDestinationLink[];
  heading: string;
  subtext?: string;
}

export default function RelatedDestinations({
  links,
  heading,
  subtext,
}: RelatedDestinationsProps) {
  if (links.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{heading}</h2>
      {subtext && (
        <p className="text-sm text-gray-600 mb-4">{subtext}</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {links.map(link => (
          <Link
            key={link.slug}
            href={link.href}
            className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all duration-200 bg-white group"
          >
            <MapPin className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
              {link.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
