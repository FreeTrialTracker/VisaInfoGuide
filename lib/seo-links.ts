import { COUNTRIES } from './countries';
import { getAllDestinationSlugs } from './destination-entry-data';

export interface RelatedLink {
  url: string;
  title: string;
  description: string;
}

export interface VisaArticleContext {
  passportCountry?: string;
  destinationCountry?: string;
  slug?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

function getCountryName(slug: string): string {
  const country = COUNTRIES.find(c => slugify(c.name) === slug);
  return country?.name || slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function generateRelatedLinks(context: VisaArticleContext): RelatedLink[] {
  const links: RelatedLink[] = [];

  if (context.passportCountry) {
    const passportName = getCountryName(context.passportCountry);
    links.push({
      url: `/visa-guides/visa-free-countries/${context.passportCountry}-passport-2026`,
      title: `${passportName} Passport Visa-Free Countries`,
      description: `Complete list of countries ${passportName} passport holders can visit without a visa`,
    });
  }

  if (context.destinationCountry) {
    const destinationName = getCountryName(context.destinationCountry);
    const destinationSlug = slugify(context.destinationCountry);
    const availableDestinations = getAllDestinationSlugs();

    if (availableDestinations.includes(destinationSlug)) {
      links.push({
        url: `/visa-guides/country-entry-requirements/${destinationSlug}-2026`,
        title: `${destinationName} Entry Requirements`,
        description: `Visa policies, required documents, and entry conditions for ${destinationName}`,
      });
    }
  }

  links.push({
    url: '/visa-guides/travel-visa-rules',
    title: 'Travel Visa Rules Explained',
    description: 'Understand visa types, passport validity, and entry requirements',
  });

  links.push({
    url: '/visa-guides/do-i-need-a-visa',
    title: 'Do I Need a Visa?',
    description: 'Check visa requirements for any passport and destination combination',
  });

  links.push({
    url: '/trip',
    title: 'Trip Visa Finder',
    description: 'Plan multi-country trips and check requirements for your itinerary',
  });

  return links;
}

export interface TopDestination {
  name: string;
  slug: string;
  flag: string;
}

export const topSearchedDestinations: TopDestination[] = [
  { name: 'Thailand', slug: 'thailand', flag: '🇹🇭' },
  { name: 'Japan', slug: 'japan', flag: '🇯🇵' },
  { name: 'United States', slug: 'united-states', flag: '🇺🇸' },
  { name: 'France', slug: 'france', flag: '🇫🇷' },
  { name: 'China', slug: 'china', flag: '🇨🇳' },
];

export interface TopPassport {
  name: string;
  slug: string;
  flag: string;
}

export const topSearchedPassports: TopPassport[] = [
  { name: 'United States', slug: 'united-states', flag: '🇺🇸' },
  { name: 'United Kingdom', slug: 'united-kingdom', flag: '🇬🇧' },
  { name: 'Singapore', slug: 'singapore', flag: '🇸🇬' },
  { name: 'Germany', slug: 'germany', flag: '🇩🇪' },
  { name: 'India', slug: 'india', flag: '🇮🇳' },
];

export function getDestinationLinks(): RelatedLink[] {
  return topSearchedDestinations.map(dest => ({
    url: `/visa-guides/country-entry-requirements/${dest.slug}-2026`,
    title: `${dest.flag} ${dest.name} Entry Requirements`,
    description: `Visa policies and entry conditions for ${dest.name}`,
  }));
}

export function getPassportLinks(): RelatedLink[] {
  return topSearchedPassports.map(passport => ({
    url: `/visa-guides/visa-free-countries/${passport.slug}-passport-2026`,
    title: `${passport.flag} ${passport.name} Passport Visa-Free Countries`,
    description: `Destinations accessible with ${passport.name} passport`,
  }));
}

export function articleJsonLd(data: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': 'Organization',
      name: 'VisaInfoGuide',
      url: 'https://visainfoguide.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VisaInfoGuide',
      url: 'https://visainfoguide.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://visainfoguide.com/visa.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };
}
