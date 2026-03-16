import Link from 'next/link';
import { ArrowRight, FileText, List, Search, MapPin, Globe } from 'lucide-react';

interface InternalLinksBlockProps {
  contentType?: string;
  passportCountry?: string;
  destinationCountry?: string;
  passportSlug?: string;
  destinationSlug?: string;
}

export default function InternalLinksBlock({
  contentType = 'do-i-need-a-visa',
  passportCountry,
  destinationCountry,
  passportSlug,
  destinationSlug,
}: InternalLinksBlockProps) {
  const links = [
    {
      icon: FileText,
      title: 'Do I Need a Visa? Hub',
      description: 'Browse visa requirement guides by passport and destination',
      href: '/visa-guides/do-i-need-a-visa',
    },
    {
      icon: List,
      title: 'All Visa Requirement Articles',
      description: 'Complete directory of "Do I Need a Visa?" guides',
      href: '/visa-guides/do-i-need-a-visa/articles',
    },
    {
      icon: Search,
      title: 'Trip Visa Finder',
      description: 'Check visa requirements for your entire trip itinerary',
      href: '/trip',
    },
  ];

  if (destinationCountry && destinationSlug) {
    links.push({
      icon: MapPin,
      title: `${destinationCountry} Visa Requirements`,
      description: `Complete visa information for travelers to ${destinationCountry}`,
      href: `/destination/${destinationSlug}`,
    });
  }

  if (passportCountry && passportSlug) {
    links.push({
      icon: Globe,
      title: `${passportCountry} Passport Travel Guide`,
      description: `Visa-free countries and travel options for ${passportCountry} passport holders`,
      href: `/passport/${passportSlug}`,
    });
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
      <div className="grid gap-3">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              key={index}
              href={link.href}
              className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-teal-200 hover:shadow-md transition-all group"
            >
              <div className="p-2 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors flex-shrink-0">
                <Icon className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
