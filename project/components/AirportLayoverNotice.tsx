import { BedDouble, ExternalLink } from 'lucide-react';

const ANCHOR_VARIANTS = [
  'airport transit hotels',
  'hotels inside airports',
  'airport layover hotels',
] as const;

type AnchorVariant = (typeof ANCHOR_VARIANTS)[number];

interface Props {
  variant?: AnchorVariant;
}

export default function AirportLayoverNotice({ variant = 'airport transit hotels' }: Props) {
  return (
    <aside className="my-8 bg-teal-50 border border-teal-200 rounded-xl p-5 flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mt-0.5">
        <BedDouble className="w-5 h-5 text-teal-700" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-teal-900 mb-1">Have a Long Airport Layover?</p>
        <p className="text-sm text-teal-800 leading-relaxed mb-3">
          Many international airports offer{' '}
          <a
            href="https://www.restinairport.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2 hover:text-teal-600 transition-colors"
          >
            airport transit hotels
          </a>{' '}
          inside the terminal or within walking distance of arrivals. Staying airside lets you rest
          without leaving the secure zone — no immigration, no queues, and no re-screening before
          your next flight. Terminal hotels are especially useful during overnight layovers or
          connections running 6 hours or more.
        </p>
        <a
          href="https://www.restinairport.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Find {variant}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}
