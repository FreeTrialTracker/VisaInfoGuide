import Link from 'next/link';
import { FileText, BookOpen, Calculator, ArrowRight, Globe, MapPin, Calculator as CalcIcon } from 'lucide-react';

const cards = [
  {
    href: '/visa-guides',
    label: 'Visa Guides',
    headline: 'Country-by-Country Visa Guides',
    description: 'Do you need a visa? Explore visa-free countries, country entry requirements, and travel visa rules for every passport — updated 2026.',
    icon: FileText,
    accent: 'from-teal-50 to-white border-teal-100 hover:border-teal-400',
    iconBg: 'bg-teal-50 group-hover:bg-teal-100',
    iconColor: 'text-teal-600',
    linkHover: 'hover:text-teal-700',
    arrowHover: 'group-hover/link:text-teal-500',
    ctaColor: 'text-teal-600 hover:text-teal-800',
    links: [
      { label: 'Do I Need a Visa?', href: '/visa-guides/do-i-need-a-visa' },
      { label: 'Visa-Free Countries', href: '/visa-guides/visa-free-countries' },
      { label: 'Country Entry Requirements', href: '/visa-guides/country-entry-requirements' },
    ],
  },
  {
    href: '/resources',
    label: 'Resources',
    headline: 'Visa Requirements by Passport & Destination',
    description: 'Browse comprehensive visa requirement directories by passport or destination. Compare entry rules, stay limits, and eVisa options for 195+ countries.',
    icon: BookOpen,
    accent: 'from-blue-50 to-white border-blue-100 hover:border-blue-400',
    iconBg: 'bg-blue-50 group-hover:bg-blue-100',
    iconColor: 'text-blue-600',
    linkHover: 'hover:text-blue-700',
    arrowHover: 'group-hover/link:text-blue-500',
    ctaColor: 'text-blue-600 hover:text-blue-800',
    links: [
      { label: 'Browse by Passport', href: '/resources#browse-by-passport' },
      { label: 'Browse Destinations by Region', href: '/destinations' },
      { label: 'Most Powerful Passports 2026', href: '/research/most-powerful-passports-2026' },
    ],
  },
  {
    href: '/tools',
    label: 'Tools',
    headline: 'Free Travel Planning Tools',
    description: 'Calculate your remaining Schengen days, check the 90/180-day rolling rule, and plan multi-country trips with free, accurate travel tools.',
    icon: Calculator,
    accent: 'from-gray-50 to-white border-gray-200 hover:border-blue-400',
    iconBg: 'bg-gray-100 group-hover:bg-blue-50',
    iconColor: 'text-gray-500 group-hover:text-blue-600',
    linkHover: 'hover:text-blue-700',
    arrowHover: 'group-hover/link:text-blue-500',
    ctaColor: 'text-blue-600 hover:text-blue-800',
    links: [
      { label: 'Schengen 90/180 Calculator', href: '/tools/schengen-calculator' },
      { label: 'Compare Passports', href: '/compare' },
      { label: 'Airline Boarding Check', href: '/tools/airline-boarding-check' },
    ],
  },
];

export default function HomeNavCards() {
  return (
    <section aria-label="Explore visa tools and guides" className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.href}
              className={`group relative bg-gradient-to-b ${card.accent} border-2 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg flex flex-col`}
            >
              <div className="mb-4">
                <div className={`inline-flex p-2.5 rounded-xl ${card.iconBg} transition-colors mb-3`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-1">{card.label}</h2>
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">{card.headline}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
              </div>

              <ul className="mt-auto space-y-1.5 pt-4 border-t border-gray-200">
                {card.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1.5 text-sm font-medium text-gray-700 ${card.linkHover} transition-colors group/link`}
                    >
                      <ArrowRight className={`w-3.5 h-3.5 text-gray-400 ${card.arrowHover} transition-colors shrink-0`} />
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={card.href}
                    className={`flex items-center gap-1 text-sm font-semibold ${card.ctaColor} transition-colors mt-2`}
                  >
                    View all {card.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
