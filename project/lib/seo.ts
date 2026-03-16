const SITE_NAME = 'VisaInfoGuide';
const BASE_URL = 'https://visainfoguide.com';

interface BuildTitleOptions {
  type: 'resources' | 'passport' | 'destination' | 'pair' | 'guide';
  passport?: string;
  destination?: string;
  guideName?: string;
}

export function buildTitle(options: BuildTitleOptions): string {
  const { type, passport, destination, guideName } = options;

  switch (type) {
    case 'resources':
      return `Visa Requirements by Country | ${SITE_NAME}`;
    case 'passport':
      return `${passport} Passport Visa-Free Countries (2026) | ${SITE_NAME}`;
    case 'destination':
      return `${destination} Entry Requirements by Nationality (2026) | ${SITE_NAME}`;
    case 'pair':
      const shortPassport = passport === 'United States' ? 'US' : passport;
      const shortDestination = destination === 'United Kingdom' ? 'UK' : destination;
      return `${shortDestination} Visa for ${shortPassport} Citizens (2026)`;
    case 'guide':
      return `${guideName} | ${SITE_NAME}`;
    default:
      return SITE_NAME;
  }
}

interface BuildDescriptionOptions {
  type: 'resources' | 'passport' | 'destination' | 'pair' | 'guide';
  passport?: string;
  destination?: string;
  guideDescription?: string;
}

export function buildDescription(options: BuildDescriptionOptions): string {
  const { type, passport, destination, guideDescription } = options;

  switch (type) {
    case 'resources':
      return 'Comprehensive visa requirements and entry rules for US, UK, Indian, German, Australian, Brazilian, Chinese, and Canadian passport holders. Search by passport or destination to find visa-free travel, eVisa, and visa on arrival options.';
    case 'passport':
      return `Complete travel guide for ${passport} passport holders. Find visa requirements, visa-free countries, and entry rules for destinations worldwide.`;
    case 'destination':
      return `${destination} visa requirements by nationality. Check if you need a visa, eVisa, or can travel visa-free. Entry rules, passport validity requirements, and application info.`;
    case 'pair':
      return `${passport} citizens visa requirements for ${destination}. See entry rules, passport validity requirements, and travel conditions updated for ${new Date().getFullYear()}.`;
    case 'guide':
      return guideDescription || 'Essential visa and travel information guide.';
    default:
      return 'Visa requirements and travel information for international travelers.';
  }
}

export function canonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

export function absoluteUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : absoluteUrl(item.url),
    })),
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function faqJsonLd(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': SITE_NAME,
    'url': BASE_URL,
    'logo': `${BASE_URL}/visa.png`,
    'description': 'Independent visa requirements database providing up-to-date entry requirements, passport validity rules, and travel documentation information for international travelers.',
    'sameAs': [],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE_NAME,
    'url': BASE_URL,
    'description': 'Comprehensive visa requirements and entry rules database for travelers worldwide',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${BASE_URL}/resources?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

interface WebPageOptions {
  name: string;
  description: string;
  url: string;
}

export function webpageJsonLd(options: WebPageOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': options.name,
    'description': options.description,
    'url': options.url,
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': BASE_URL,
    },
  };
}

interface DatasetOptions {
  name: string;
  description: string;
  url: string;
  keywords: string[];
}

export function datasetJsonLd(options: DatasetOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: options.name,
    description: options.description,
    url: options.url,
    keywords: options.keywords,
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    license: `${BASE_URL}/terms`,
    isAccessibleForFree: true,
    temporalCoverage: '2026',
  };
}


export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const currentDate = new Date();
