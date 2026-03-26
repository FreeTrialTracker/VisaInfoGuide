import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import BackNavigation from '@/components/BackNavigation';
import SummaryBlock from '@/components/visa-guides/SummaryBlock';
import TableOfContents from '@/components/visa-guides/TableOfContents';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import SourcesBlock from '@/components/visa-guides/SourcesBlock';
import LastReviewed from '@/components/visa-guides/LastReviewed';
import InternalLinksSection from '@/components/visa-guides/InternalLinksSection';
import InternalLinksBlock from '@/components/visa-guides/InternalLinksBlock';

export const dynamic = 'force-static';

interface VisaGuideArticle {
  slug: string;
  title: string;
  h1: string;
  description: string;
  lastReviewed: string;
  summary: string;
  tableOfContents: Array<{ id: string; text: string; level: number }>;
  content: React.ReactNode;
  faqs: Array<{ question: string; answer: string }>;
  sources: Array<{ name: string; url: string }>;
  internalLinks: Array<{ title: string; description: string; href: string }>;
  contentType: 'do-i-need-a-visa' | 'visa-free-countries' | 'country-entry-requirements' | 'travel-visa-rules';
  passportCountry?: string;
  destinationCountry?: string;
  passportSlug?: string;
  destinationSlug?: string;
  year: number;
}

// Article database - in production this would come from a CMS or database
const articles: Record<string, VisaGuideArticle> = {
  'do-uk-citizens-need-visa-for-usa-2026': {
    slug: 'do-uk-citizens-need-visa-for-usa-2026',
    title: 'US Entry Rules for UK Travelers',
    h1: 'Do UK Citizens Need a Visa for the United States in 2026?',
    description: 'Complete guide to US visa requirements for UK passport holders in 2026. UK citizens do not need a traditional visa for short stays under the Visa Waiver Program but must obtain ESTA approval before travel.',
    lastReviewed: 'February 22, 2026',
    summary: 'UK citizens do not need a traditional US visa for short tourism or business visits. The UK is a member of the Visa Waiver Program (VWP), allowing stays of up to 90 days without a visa. However, all VWP travellers must obtain ESTA (Electronic System for Travel Authorization) approval before boarding. ESTA is not a visa — it is a mandatory pre-travel authorisation linked to your passport. For longer stays or purposes such as work, study, or immigration, a US visa is required.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'United Kingdom',
    destinationCountry: 'United States',
    passportSlug: 'united-kingdom',
    destinationSlug: 'united-states',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'what-is-vwp', text: 'What Is the US Visa Waiver Program (VWP)?', level: 2 },
      { id: 'when-visa-required', text: 'When Do UK Citizens Need a US Visa?', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties in the United States', level: 2 },
    ],
    content: <UKToUSAContent />,
    faqs: [
      {
        question: 'Do UK citizens need a visa for the USA in 2026?',
        answer: 'No. UK citizens do not need a traditional US visa for short tourism or business visits of up to 90 days under the Visa Waiver Program. However, ESTA (Electronic System for Travel Authorization) approval is mandatory before boarding and must be obtained online.',
      },
      {
        question: 'Is ESTA mandatory for UK passport holders?',
        answer: 'Yes. ESTA is required for all UK citizens travelling to the United States under the Visa Waiver Program. You must apply and receive approval before you travel — ESTA cannot be obtained on arrival. Most applications are approved within minutes, but it is recommended to apply at least 72 hours before departure.',
      },
      {
        question: 'How long can British citizens stay in the US?',
        answer: 'British citizens travelling under the Visa Waiver Program may stay in the United States for a maximum of 90 days per visit. This limit applies to tourism, business meetings, and transit.',
      },
      {
        question: 'Can I extend my 90-day stay in the US?',
        answer: 'Extensions of stay under the Visa Waiver Program are generally not permitted. Unlike B1/B2 visa holders, VWP visitors cannot apply for an extension with USCIS. If you need to stay longer than 90 days you must apply for a B1/B2 tourist or business visa at a US embassy or consulate before you travel.',
      },
      {
        question: 'What happens if I overstay in the US?',
        answer: 'Overstaying your authorised period of admission permanently voids your ESTA eligibility. Overstays of 180 days result in a 3-year bar on re-entry; overstays of one year or more result in a 10-year bar.',
      },
    ],
    sources: [
      {
        name: 'US Department of State — Visa Waiver Program',
        url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html',
      },
      {
        name: 'US Customs and Border Protection (CBP) — VWP',
        url: 'https://www.cbp.gov/travel/international-visitors/visa-waiver-program',
      },
      {
        name: 'Official ESTA Application Website — US Department of Homeland Security',
        url: 'https://esta.cbp.dhs.gov/',
      },
    ],
    internalLinks: [
      {
        title: 'Trip Visa Finder Tool',
        description: 'Plan your trip and check visa requirements for multiple destinations',
        href: '/trip',
      },
      {
        title: 'UK Passport Visa-Free Countries',
        description: 'See all countries UK passport holders can visit without a visa',
        href: '/passport/united-kingdom/visa-free-countries',
      },
      {
        title: 'United States Entry Requirements',
        description: 'Complete visa requirements for all passport holders traveling to the United States',
        href: '/destination/united-states',
      },
    ],
  },
  'do-us-citizens-need-visa-for-thailand-2026': {
    slug: 'do-us-citizens-need-visa-for-thailand-2026',
    title: 'Thailand Visa Rules for US Travelers',
    h1: 'Do US Citizens Need a Visa for Thailand in 2026?',
    description: 'Complete guide to Thailand visa requirements for US passport holders in 2026. Learn about visa-free entry, stay duration, required documents, and overstay penalties.',
    lastReviewed: 'February 21, 2026',
    summary: 'US citizens can enter Thailand without a visa for tourism or business purposes and stay for up to 60 days per entry as of 2024. This visa exemption was extended from the previous 30-day limit. Travelers must have a passport valid for at least 6 months beyond their planned departure date. Those planning to stay longer than 60 days must apply for an appropriate visa before arrival.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'United States',
    destinationCountry: 'Thailand',
    passportSlug: 'united-states',
    destinationSlug: 'thailand',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'stay-duration', text: 'How Long Can US Citizens Stay in Thailand?', level: 2 },
      { id: 'when-visa-required', text: 'When Is a Visa Required?', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <ArticleContent />,
    faqs: [
      {
        question: 'Can US citizens enter Thailand without a visa?',
        answer: 'Yes, US citizens can enter Thailand without a visa for tourism or business purposes and stay for up to 60 days per entry. This applies to entries by air, land, or sea.'
      },
      {
        question: 'How long can US citizens stay in Thailand without a visa?',
        answer: 'US citizens can stay in Thailand for up to 60 days per entry without a visa. This can be extended once for an additional 30 days at a Thai immigration office for a fee of 1,900 baht.'
      },
      {
        question: 'What documents do I need to enter Thailand as a US citizen?',
        answer: 'You need a valid US passport with at least 6 months validity beyond your departure date, proof of onward travel within 60 days, and potentially proof of sufficient funds (approximately 20,000 baht per person or 40,000 baht per family).'
      },
      {
        question: 'Can I work in Thailand on a visa-free entry?',
        answer: 'No, visa-free entry is only for tourism and business meetings. If you intend to work, teach, volunteer, or engage in any employment activity in Thailand, you must obtain a Non-Immigrant visa and work permit before starting work.'
      },
      {
        question: 'What happens if I overstay my visa-free period in Thailand?',
        answer: 'Overstaying in Thailand results in a fine of 500 baht per day, capped at 20,000 baht. Overstays exceeding 90 days can result in deportation and entry bans ranging from 1 to 10 years depending on the overstay duration.'
      },
    ],
    sources: [
      {
        name: 'Royal Thai Embassy, Washington DC - Visa Information',
        url: 'https://thaiembdc.org/visa-information/'
      },
      {
        name: 'Thailand Immigration Bureau - Visa Exemption',
        url: 'https://www.immigration.go.th/'
      },
      {
        name: 'US Department of State - Thailand Travel Advisory',
        url: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Thailand.html'
      },
    ],
    internalLinks: [
      {
        title: 'Trip Visa Finder Tool',
        description: 'Plan your trip and check visa requirements for multiple destinations',
        href: '/trip'
      },
      {
        title: 'US Passport Visa-Free Countries',
        description: 'See all countries US passport holders can visit without a visa',
        href: '/passport/united-states/visa-free-countries'
      },
      {
        title: 'Thailand Entry Requirements',
        description: 'Complete visa requirements for all passport holders traveling to Thailand',
        href: '/destination/thailand'
      },
    ],
  },
  'do-chinese-citizens-need-visa-for-france-2026': {
    slug: 'do-chinese-citizens-need-visa-for-france-2026',
    title: 'France Visa Requirements for Chinese Citizens',
    h1: 'Do Chinese Citizens Need a Visa for France in 2026?',
    description: 'Complete guide to France visa requirements for Chinese passport holders in 2026. Chinese citizens must obtain a Schengen short-stay visa before travelling to France for tourism, business, or family visits.',
    lastReviewed: 'February 22, 2026',
    summary: 'Chinese passport holders must obtain a Schengen short-stay visa before traveling to France for tourism, business, or family visits. France is part of the Schengen Area, meaning one approved visa allows travel across 27 European countries for up to 90 days within a 180-day period. Applications must be submitted before departure through the official France-Visas system or an authorized visa application center. Always verify requirements before travel as entry policies can change.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'China',
    destinationCountry: 'France',
    passportSlug: 'china',
    destinationSlug: 'france',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'schengen-visa', text: 'What Is the Schengen Visa for France?', level: 2 },
      { id: 'documents-required', text: 'Documents Required for Chinese Applicants', level: 2 },
      { id: 'processing-time', text: 'Processing Time', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties in France', level: 2 },
    ],
    content: <ChineseToFranceContent />,
    faqs: [
      {
        question: 'Do Chinese citizens need a visa for France in 2026?',
        answer: 'Yes. Chinese passport holders must obtain a Schengen short-stay visa (Type C) before travelling to France. There is no visa-on-arrival or eVisa option for Chinese citizens travelling to France — applications must be submitted in advance through the France-Visas portal or an authorised visa application centre in China.',
      },
      {
        question: 'Can Chinese passport holders apply for a France eVisa?',
        answer: 'No. France does not currently offer an eVisa for Chinese citizens. Applications must be submitted in person or through an authorised visa application centre. You will need to provide biometric data (fingerprints and photograph) as part of the application process.',
      },
      {
        question: 'How long can I stay in France with a Schengen visa?',
        answer: 'With a Schengen short-stay visa, you can stay in France (and the entire Schengen Area) for up to 90 days within any 180-day period. This is a rolling 180-day window, not a calendar year. Days spent in any Schengen country count toward your 90-day allowance.',
      },
      {
        question: 'Can I visit Germany or Italy with a France Schengen visa?',
        answer: 'Yes. A Schengen visa issued by France allows you to travel freely within all 27 Schengen member states, including Germany, Italy, Spain, and others. However, your main destination or the country where you spend the most nights should be France if that is the country that issued your visa.',
      },
      {
        question: 'How long does France visa processing take in China?',
        answer: 'Standard processing time for a France Schengen visa is 15 calendar days. During peak travel seasons (summer, holidays) processing may take longer. It is strongly recommended to apply at least 3 to 4 weeks before your intended travel date. Applications can be submitted no earlier than 6 months before departure.',
      },
      {
        question: 'What happens if I overstay in France?',
        answer: 'Overstaying your Schengen visa in France can result in monetary fines, a Schengen-wide entry ban, refusal of future visa applications, and potential deportation. An overstay record is shared across all Schengen member states and can seriously affect your ability to obtain European visas in the future.',
      },
    ],
    sources: [
      {
        name: 'French Ministry of Europe and Foreign Affairs — Visa for France',
        url: 'https://france-visas.gouv.fr/en/',
      },
      {
        name: 'France-Visas Official Portal',
        url: 'https://france-visas.gouv.fr/en/web/france-visas/',
      },
      {
        name: 'European Commission — Schengen Area',
        url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en',
      },
    ],
    internalLinks: [
      {
        title: 'Trip Visa Finder Tool',
        description: 'Plan your trip and check visa requirements for multiple destinations',
        href: '/trip',
      },
      {
        title: 'France Entry Requirements 2026',
        description: 'Complete visa requirements for all nationalities travelling to France',
        href: '/visa-guides/country-entry-requirements/france-2026',
      },
      {
        title: 'Do I Need a Visa? Hub',
        description: 'Check visa requirements for any passport and destination combination',
        href: '/visa-guides/do-i-need-a-visa',
      },
    ],
  },
  'do-indians-need-visa-for-japan-2026': {
    slug: 'do-indians-need-visa-for-japan-2026',
    title: 'Japan Entry Rules for Indian Citizens',
    h1: 'Do Indians Need a Visa for Japan in 2026?',
    description: 'Complete guide to Japan visa requirements for Indian passport holders in 2026. Indian citizens must obtain a visa before travelling to Japan, but eligible applicants can apply online through Japan\'s official eVisa system.',
    lastReviewed: 'February 22, 2026',
    summary: 'Indian passport holders must obtain a visa before traveling to Japan for tourism or short business visits. Japan does not offer visa-free entry to Indian citizens. However, eligible Indian residents can apply online through Japan\'s official eVisa system for short-term tourism. Applications must be approved before departure. Entry rules depend on the purpose of travel and duration of stay, so travelers should confirm requirements before booking flights.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'India',
    destinationCountry: 'Japan',
    passportSlug: 'india',
    destinationSlug: 'japan',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'evisa', text: 'Japan eVisa for Indian Citizens', level: 2 },
      { id: 'sticker-visa', text: 'When Is a Sticker Visa Required?', level: 2 },
      { id: 'documents-required', text: 'Documents Required for Indian Applicants', level: 2 },
      { id: 'processing-time', text: 'Processing Time', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties in Japan', level: 2 },
    ],
    content: <IndiansToJapanContent />,
    faqs: [
      {
        question: 'Do Indians need a visa for Japan in 2026?',
        answer: 'Yes. Indian passport holders are required to obtain a visa before travelling to Japan. Japan does not offer visa-free entry to Indian citizens. However, eligible Indian applicants can apply for a tourist eVisa online through Japan\'s official eVisa portal without needing to visit an embassy or consulate.',
      },
      {
        question: 'Can Indian citizens apply for Japan eVisa online?',
        answer: 'Yes. Japan operates an official eVisa system for short-term tourism that eligible Indian citizens can use. The application is submitted entirely online. Once approved, the eVisa must be presented at check-in and upon arrival in Japan. The eVisa is typically valid for single-entry tourism purposes only.',
      },
      {
        question: 'How long can Indians stay in Japan on a tourist visa?',
        answer: 'Indian citizens holding a Japan tourist visa can typically stay for up to 90 days per visit, depending on the visa issued. The exact permitted duration of stay is determined by the Japanese immigration officer at the port of entry and will be stamped in your passport.',
      },
      {
        question: 'Is Japan visa-free for Indian passport holders?',
        answer: 'No. Japan does not offer visa-free entry to Indian citizens. A visa — either an eVisa for eligible tourists or a traditional sticker visa for other purposes — must be obtained before departure. There is no visa-on-arrival facility for Indian passport holders.',
      },
      {
        question: 'How long does Japan visa processing take in India?',
        answer: 'Japan visa processing for Indian applicants typically takes 5 to 10 working days from the date a complete application is received. Processing times can vary depending on the consulate, application volume, and time of year. It is recommended to apply at least 2 to 3 weeks before your intended travel date.',
      },
      {
        question: 'What happens if I overstay in Japan?',
        answer: 'Overstaying your authorised period of stay in Japan can result in fines, detention, deportation, and a multi-year ban from re-entering Japan. An overstay record is permanently held in Japanese immigration systems and can also affect future visa applications for other countries. Always depart before your authorised stay expires.',
      },
    ],
    sources: [
      {
        name: 'Ministry of Foreign Affairs of Japan — Visa Information',
        url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
      },
      {
        name: 'Japan Official eVisa Portal',
        url: 'https://www.evisa.mofa.go.jp/',
      },
      {
        name: 'Embassy of Japan in India',
        url: 'https://www.in.emb-japan.go.jp/itprtop_en/index.html',
      },
    ],
    internalLinks: [
      {
        title: 'Trip Visa Finder Tool',
        description: 'Plan your trip and check visa requirements for multiple destinations',
        href: '/trip',
      },
      {
        title: 'Japan Entry Requirements 2026',
        description: 'Complete visa requirements for all nationalities travelling to Japan',
        href: '/visa-guides/country-entry-requirements/japan-2026',
      },
      {
        title: 'Do I Need a Visa? Hub',
        description: 'Check visa requirements for any passport and destination combination',
        href: '/visa-guides/do-i-need-a-visa',
      },
    ],
  },
  'do-thais-need-visa-for-japan-2026': {
    slug: 'do-thais-need-visa-for-japan-2026',
    title: 'Japan Entry Requirements for Thai Travelers',
    h1: 'Do Thais Need a Visa for Japan in 2026?',
    description: 'Complete guide to Japan visa requirements for Thai passport holders in 2026. Thai citizens can visit Japan visa-free for up to 15 days for tourism and short-term business. Learn entry conditions, document requirements, and when a visa is needed.',
    lastReviewed: 'February 22, 2026',
    summary: 'Thai passport holders do not need a visa for short-term tourism visits to Japan of up to 15 days. This visa exemption applies to tourism and certain short-term business visits. Travelers must meet entry requirements at the border, including proof of onward travel and sufficient funds. Stays longer than 15 days, or travel for work or study, require a visa obtained before departure. Entry policies may change, so travelers should verify requirements before travel.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Thailand',
    destinationCountry: 'Japan',
    passportSlug: 'thailand',
    destinationSlug: 'japan',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'visa-exemption', text: 'Japan Visa Exemption for Thai Citizens', level: 2 },
      { id: 'when-visa-required', text: 'When Do Thai Citizens Need a Visa for Japan?', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties in Japan', level: 2 },
    ],
    content: <ThaisToJapanContent />,
    faqs: [
      {
        question: 'Do Thai citizens need a visa for Japan in 2026?',
        answer: 'No. Thai passport holders can visit Japan without a visa for stays of up to 15 days for tourism and short-term business. No prior visa application is required. However, all entry conditions must be met at the border, including a valid passport, proof of onward travel, and sufficient funds for your stay.',
      },
      {
        question: 'How long can Thais stay in Japan visa-free?',
        answer: 'Thai citizens can stay in Japan for up to 15 days per entry under the visa exemption arrangement. The permitted duration of stay is confirmed by the immigration officer at the port of entry and stamped in your passport. You must depart on or before the date stamped.',
      },
      {
        question: 'Can Thai citizens extend their 15-day stay?',
        answer: 'Extensions of the 15-day visa-exempt stay are not typically granted. If you need to stay longer than 15 days, you must apply for an appropriate visa from the Japanese Embassy in Thailand before your trip. Attempting to extend a visa-exempt stay without proper authorization is an immigration violation.',
      },
      {
        question: 'Can Thais work in Japan without a visa?',
        answer: 'No. The Japan visa exemption for Thai citizens covers tourism and short-term business visits only. Engaging in paid work, employment, or any income-generating activity in Japan requires a valid work visa obtained before departure from the Japanese Embassy or Consulate.',
      },
      {
        question: 'Is travel insurance required for Japan?',
        answer: 'Travel insurance is not a formal entry requirement for Thai citizens visiting Japan. However, it is strongly recommended. Medical treatment in Japan can be very expensive for foreign visitors without insurance, and travel insurance can also cover trip cancellations, lost baggage, and other unforeseen issues.',
      },
      {
        question: 'What happens if a Thai overstays in Japan?',
        answer: 'Overstaying the permitted 15-day visa-exempt period in Japan is a serious immigration offence. Penalties include fines, detention, deportation at the traveller\'s own expense, and a multi-year ban from re-entering Japan. An overstay record can also negatively impact future visa applications for Japan and other countries.',
      },
    ],
    sources: [
      {
        name: 'Ministry of Foreign Affairs of Japan — Visa Exemption Arrangements',
        url: 'https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html',
      },
      {
        name: 'Embassy of Japan in Thailand',
        url: 'https://www.th.emb-japan.go.jp/itprtop_en/index.html',
      },
      {
        name: 'Immigration Services Agency of Japan',
        url: 'https://www.isa.go.jp/en/index.html',
      },
    ],
    internalLinks: [
      {
        title: 'Trip Visa Finder Tool',
        description: 'Plan your trip and check visa requirements for multiple destinations',
        href: '/trip',
      },
      {
        title: 'Japan Entry Requirements 2026',
        description: 'Complete visa requirements for all nationalities travelling to Japan',
        href: '/visa-guides/country-entry-requirements/japan-2026',
      },
      {
        title: 'Do I Need a Visa? Hub',
        description: 'Check visa requirements for any passport and destination combination',
        href: '/visa-guides/do-i-need-a-visa',
      },
    ],
  },
  'do-us-citizens-need-visa-for-europe-2026': {
    slug: 'do-us-citizens-need-visa-for-europe-2026',
    title: 'Europe Entry Requirements for US Citizens (2026)',
    h1: 'Do US Citizens Need a Visa for Europe in 2026?',
    description: 'Complete guide to Europe visa requirements for US passport holders in 2026. US citizens can visit Schengen Area countries visa-free for up to 90 days but should know about ETIAS, passport validity rules, and entry conditions.',
    lastReviewed: 'February 22, 2026',
    summary: 'US citizens do not need a visa to visit most European countries in the Schengen Area for tourism or short business trips of up to 90 days within any 180-day period. No prior visa application is required for these stays. However, travelers must be aware of passport validity requirements, the upcoming ETIAS pre-travel authorisation, and the 90/180-day rule that limits cumulative time across all Schengen countries.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'United States',
    destinationCountry: 'Europe (Schengen)',
    passportSlug: 'united-states',
    destinationSlug: 'france',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'schengen-area', text: 'What Is the Schengen Area?', level: 2 },
      { id: '90-180-rule', text: 'The 90/180-Day Rule Explained', level: 2 },
      { id: 'etias', text: 'ETIAS: Upcoming Requirement for US Citizens', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
    ],
    content: <USToEuropeContent />,
    faqs: [
      {
        question: 'Do US citizens need a visa to visit Europe in 2026?',
        answer: 'No. US passport holders can visit Schengen Area countries — including France, Germany, Italy, Spain, and 23 others — without a visa for up to 90 days within any 180-day period. This visa-free access applies to tourism and short-term business. No prior application is needed.',
      },
      {
        question: 'How long can US citizens stay in Europe without a visa?',
        answer: 'US citizens can stay in the Schengen Area for up to 90 days within any rolling 180-day period. This limit applies across all 27 Schengen countries combined — not per country. Days spent in France, Germany, Italy, and Spain all count toward the same 90-day total.',
      },
      {
        question: 'What is ETIAS and do US citizens need it?',
        answer: 'ETIAS (European Travel Information and Authorisation System) is an upcoming pre-travel authorisation for visa-exempt travelers, including US citizens. It is not yet in force as of 2026. Once launched, US citizens will need to apply online and receive ETIAS approval before traveling to Schengen countries. Check the official ETIAS website for the latest launch date.',
      },
      {
        question: 'Can US citizens work in Europe without a visa?',
        answer: 'No. The 90-day visa-free period covers tourism, family visits, and short-term business activities such as attending meetings or conferences. Working for a European employer, providing paid services, or taking up employment requires a work visa or permit obtained before travel.',
      },
      {
        question: 'What passport validity is required for US citizens entering Europe?',
        answer: 'US citizens entering the Schengen Area should have a passport valid for the duration of their stay. Some countries require at least 3 months of validity beyond the intended departure date. Always check the specific requirements of your destination country before travel.',
      },
    ],
    sources: [
      { name: 'European Commission — Schengen Area Visa Policy', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en' },
      { name: 'US Department of State — Schengen Area Travel Information', url: 'https://travel.state.gov/en/international-travel/planning/guidance/europe.html' },
      { name: 'Official ETIAS Website', url: 'https://travel-europe.europa.eu/etias_en' },
    ],
    internalLinks: [
      { title: 'Schengen 90/180-Day Calculator', description: 'Calculate your remaining Schengen days', href: '/tools/schengen-calculator' },
      { title: 'US Passport Visa-Free Countries', description: 'See all countries US passport holders can visit without a visa', href: '/passport/united-states/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-indians-need-visa-for-dubai-2026': {
    slug: 'do-indians-need-visa-for-dubai-2026',
    title: 'Dubai Visa Requirements for Indian Travelers',
    h1: 'Do Indians Need a Visa for Dubai in 2026?',
    description: 'Complete guide to Dubai (UAE) visa requirements for Indian passport holders in 2026. Indian citizens can obtain a visa on arrival or apply for an eVisa online before travel.',
    lastReviewed: 'February 22, 2026',
    summary: 'Indian passport holders can visit Dubai and the UAE either by obtaining a visa on arrival at Dubai International Airport or by applying for an eVisa online before travel. The UAE offers a 30-day renewable visa on arrival for Indian citizens holding valid US, UK, or EU visas, as well as an eVisa option for all eligible applicants. Indian citizens without qualifying third-country visas must apply for a UAE eVisa before departure.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'India',
    destinationCountry: 'United Arab Emirates',
    passportSlug: 'india',
    destinationSlug: 'united-arab-emirates',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'visa-on-arrival', text: 'Visa on Arrival for Indian Citizens', level: 2 },
      { id: 'evisa', text: 'UAE eVisa for Indians', level: 2 },
      { id: 'documents-required', text: 'Documents Required', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <IndiansToDubaiContent />,
    faqs: [
      {
        question: 'Can Indians get a visa on arrival in Dubai?',
        answer: 'Yes, Indian citizens holding a valid US, UK, or EU/Schengen visa (issued for at least 6 months) are eligible for a visa on arrival in Dubai. The visa on arrival is valid for 14 days and can be extended once for an additional 14 days. Indian citizens without qualifying third-country visas must apply for a UAE eVisa before departure.',
      },
      {
        question: 'Can Indians apply for a UAE eVisa online?',
        answer: 'Yes. Indian citizens can apply for a UAE eVisa online through the ICP (Federal Authority for Identity and Citizenship) portal or through Emirates, Air Arabia, or other authorized channels. The eVisa is typically approved within 24–72 hours and is available in 30-day and 60-day options.',
      },
      {
        question: 'How long can Indians stay in Dubai?',
        answer: 'With a UAE tourist visa, Indian citizens can typically stay for 30 days (extendable by another 30 days) or 60 days depending on the visa type obtained. Visa on arrival grants 14 days extendable by 14 more days.',
      },
      {
        question: 'What documents do Indians need for Dubai?',
        answer: 'Indian citizens need a valid passport with at least 6 months validity, a confirmed return ticket, hotel booking or host invitation, proof of sufficient funds, and passport-sized photographs. For eVisa applications, a digital photo and passport scan are also required.',
      },
      {
        question: 'What is the overstay fine in Dubai for Indian citizens?',
        answer: 'Overstaying a UAE visa results in a fine of AED 50 per day (approximately USD 14) after the first day, plus AED 100 for the first day of overstay. Prolonged overstays can result in deportation and a ban from re-entering the UAE.',
      },
    ],
    sources: [
      { name: 'UAE Federal Authority for Identity and Citizenship — eVisa', url: 'https://icp.gov.ae/en/services/interactive-services/' },
      { name: 'Emirates Airlines — UAE Visa Information', url: 'https://www.emirates.com/english/before-you-fly/visa-passport-information/uae-visa-information/' },
      { name: 'Dubai Tourism — Visa Information', url: 'https://www.visitdubai.com/en/plan-your-trip/visa-information' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'UAE Entry Requirements 2026', description: 'Complete visa requirements for all nationalities travelling to the UAE', href: '/visa-guides/country-entry-requirements/united-arab-emirates-2026' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-uk-citizens-need-visa-for-australia-2026': {
    slug: 'do-uk-citizens-need-visa-for-australia-2026',
    title: 'Australia Visa Requirements for UK Citizens',
    h1: 'Do UK Citizens Need a Visa for Australia in 2026?',
    description: 'Complete guide to Australia visa requirements for UK passport holders in 2026. UK citizens need an ETA (Electronic Travel Authority) before visiting Australia — it is quick, inexpensive, and available via the Australian ETA app.',
    lastReviewed: 'February 22, 2026',
    summary: 'UK citizens do not need a traditional visa for short visits to Australia, but they must obtain an ETA (Electronic Travel Authority) before travel. The ETA is an electronic travel permission linked to your passport, not a stamp or sticker. It allows multiple visits of up to 3 months each over a 12-month period. The ETA is available via the Australian ETA app for a small service fee and is typically approved within minutes.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'United Kingdom',
    destinationCountry: 'Australia',
    passportSlug: 'united-kingdom',
    destinationSlug: 'australia',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'what-is-eta', text: 'What Is the Australian ETA?', level: 2 },
      { id: 'how-to-apply', text: 'How to Apply for the Australian ETA', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'when-visa-required', text: 'When Do UK Citizens Need a Full Visa?', level: 2 },
    ],
    content: <UKToAustraliaContent />,
    faqs: [
      {
        question: 'Do UK citizens need a visa for Australia in 2026?',
        answer: 'UK citizens do not need a traditional visa but must obtain an ETA (Electronic Travel Authority) before traveling to Australia. The ETA is an electronic permission linked to your passport and allows multiple stays of up to 3 months each over a 12-month period.',
      },
      {
        question: 'How do UK citizens apply for the Australian ETA?',
        answer: 'UK citizens can apply for the Australian ETA via the official Australian ETA app (available on iOS and Android) or through a registered travel agent. The fee is AUD 20 (approximately GBP 10). Most applications are approved within minutes, though some may take up to 24 hours.',
      },
      {
        question: 'How long can UK citizens stay in Australia?',
        answer: 'UK citizens with an ETA can stay in Australia for up to 3 months per visit. The ETA itself is valid for 12 months from the date of issue, allowing multiple visits during that period as long as each stay does not exceed 3 months.',
      },
      {
        question: 'Can UK citizens work in Australia on an ETA?',
        answer: 'No. The ETA is for tourism, family visits, and certain business activities only. UK citizens wishing to work in Australia must apply for a Working Holiday Visa (subclass 417) or an appropriate work visa before travel.',
      },
      {
        question: 'What passport validity is required for UK citizens entering Australia?',
        answer: 'UK citizens must have a passport valid for the entire duration of their stay in Australia. There is no specific "6 months beyond entry" rule, but airlines may refuse boarding if your passport expires during your trip.',
      },
    ],
    sources: [
      { name: 'Australian Department of Home Affairs — ETA', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601' },
      { name: 'Australian Government — Official ETA App', url: 'https://www.eta.homeaffairs.gov.au/' },
      { name: 'UK Government — Australia Travel Advice', url: 'https://www.gov.uk/foreign-travel-advice/australia' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'UK Passport Visa-Free Countries', description: 'See all countries UK passport holders can visit without a visa', href: '/passport/united-kingdom/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-canadians-need-visa-for-thailand-2026': {
    slug: 'do-canadians-need-visa-for-thailand-2026',
    title: 'Canada-Thailand Visa Rules 2026',
    h1: 'Do Canadians Need a Visa for Thailand in 2026?',
    description: 'Complete guide to Thailand visa requirements for Canadian passport holders in 2026. Canadian citizens can enter Thailand visa-free for up to 60 days for tourism and short-term business.',
    lastReviewed: 'February 22, 2026',
    summary: 'Canadian passport holders can enter Thailand without a visa for tourism or short-term business and stay for up to 60 days per entry. This visa exemption was extended from 30 days in 2024. Travelers must carry a passport valid for at least 6 months, proof of onward travel within 60 days, and may be asked to show proof of sufficient funds. Stays beyond 60 days require a visa obtained before departure.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Canada',
    destinationCountry: 'Thailand',
    passportSlug: 'canada',
    destinationSlug: 'thailand',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'visa-exemption', text: 'Thailand Visa Exemption for Canadians', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'extensions', text: 'Extending Your Stay in Thailand', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <CanadiansToThailandContent />,
    faqs: [
      {
        question: 'Do Canadians need a visa for Thailand in 2026?',
        answer: 'No. Canadian citizens can enter Thailand without a visa for tourism or short-term business and stay for up to 60 days per entry. This applies to arrivals by air, land, or sea. No prior visa application is needed.',
      },
      {
        question: 'How long can Canadians stay in Thailand without a visa?',
        answer: 'Canadian citizens can stay in Thailand for up to 60 days per entry under the visa exemption. This can be extended once for an additional 30 days at any Thai immigration office for a fee of 1,900 baht.',
      },
      {
        question: 'What documents do Canadians need for Thailand?',
        answer: 'Canadians need a passport valid for at least 6 months beyond their departure date, a confirmed return or onward ticket within 60 days, and may need to show proof of sufficient funds (approximately 20,000 baht per person).',
      },
      {
        question: 'Can Canadians work in Thailand without a visa?',
        answer: 'No. The visa exemption covers tourism and business meetings only. Working, teaching, or providing paid services in Thailand requires a Non-Immigrant visa (category B) and a work permit obtained before entry.',
      },
      {
        question: 'What is the overstay fine in Thailand?',
        answer: 'Overstaying in Thailand results in a fine of 500 baht per day, capped at 20,000 baht. Overstays exceeding 90 days can result in deportation and entry bans of 1 to 10 years depending on the length of overstay.',
      },
    ],
    sources: [
      { name: 'Royal Thai Embassy, Ottawa — Visa Information', url: 'https://www.thaiembassy.ca/' },
      { name: 'Thailand Immigration Bureau', url: 'https://www.immigration.go.th/' },
      { name: 'Government of Canada — Thailand Travel Advice', url: 'https://travel.gc.ca/destinations/thailand' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Canada Passport Visa-Free Countries', description: 'See all countries Canadian passport holders can visit without a visa', href: '/passport/canada/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-chinese-citizens-need-visa-for-singapore-2026': {
    slug: 'do-chinese-citizens-need-visa-for-singapore-2026',
    title: 'Singapore Entry Rules for Chinese Travelers',
    h1: 'Do Chinese Citizens Need a Visa for Singapore in 2026?',
    description: 'Complete guide to Singapore visa requirements for Chinese passport holders in 2026. Chinese citizens can visit Singapore visa-free for up to 30 days under a bilateral arrangement.',
    lastReviewed: 'February 22, 2026',
    summary: 'Chinese passport holders can visit Singapore without a visa for up to 30 days under a bilateral visa-free arrangement established in 2024. This covers tourism, family visits, and short-term business. Travelers must carry a passport valid for at least 6 months, proof of onward travel, and sufficient funds. Stays longer than 30 days or travel for work or study require a pass obtained through Singapore\'s Immigration & Checkpoints Authority (ICA).',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'China',
    destinationCountry: 'Singapore',
    passportSlug: 'china',
    destinationSlug: 'singapore',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'visa-free-arrangement', text: 'Singapore Visa-Free Arrangement for Chinese Citizens', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'when-pass-required', text: 'When Is a Pass or Visa Required?', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <ChineseToSingaporeContent />,
    faqs: [
      {
        question: 'Do Chinese citizens need a visa for Singapore in 2026?',
        answer: 'No. Chinese passport holders can visit Singapore without a visa for up to 30 days under a mutual visa waiver arrangement. This arrangement took effect in February 2024. No prior application or eVisa is required.',
      },
      {
        question: 'How long can Chinese citizens stay in Singapore visa-free?',
        answer: 'Chinese citizens can stay in Singapore for up to 30 days per visit without a visa. The actual permitted stay is determined by the immigration officer at the point of entry and will be stamped in your passport.',
      },
      {
        question: 'What documents do Chinese citizens need for Singapore?',
        answer: 'Chinese travelers need a valid passport with at least 6 months validity, a return or onward ticket, confirmed accommodation, and proof of sufficient funds. While not always checked, immigration officers can request any of these.',
      },
      {
        question: 'Can Chinese citizens work in Singapore without a visa?',
        answer: 'No. The 30-day visa-free entry is for tourism, family visits, and short-term business activities only. Working in Singapore requires an Employment Pass, S Pass, or Work Permit obtained before entry through the Ministry of Manpower.',
      },
      {
        question: 'What happens if a Chinese citizen overstays in Singapore?',
        answer: 'Overstaying in Singapore is treated very seriously. Overstayers of more than 90 days face mandatory caning (males under 50) in addition to imprisonment. All overstayers are subject to deportation and may be banned from re-entering Singapore.',
      },
    ],
    sources: [
      { name: 'Singapore Immigration & Checkpoints Authority — Visitor Information', url: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore' },
      { name: 'Ministry of Foreign Affairs Singapore — Visa-Free Arrangements', url: 'https://www.mfa.gov.sg/Overseas-Mission/Beijing' },
      { name: 'Singapore Tourism Board', url: 'https://www.visitsingapore.com/travel-guide-tips/tourist-information/' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Singapore Entry Requirements 2026', description: 'Complete visa requirements for all nationalities travelling to Singapore', href: '/visa-guides/country-entry-requirements/singapore-2026' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-germans-need-visa-for-usa-2026': {
    slug: 'do-germans-need-visa-for-usa-2026',
    title: 'United States Entry Requirements for German Citizens',
    h1: 'Do Germans Need a Visa for the USA in 2026?',
    description: 'Complete guide to US visa requirements for German passport holders in 2026. German citizens do not need a visa for short stays under the Visa Waiver Program but must obtain ESTA approval before travel.',
    lastReviewed: 'February 22, 2026',
    summary: 'German passport holders do not need a traditional US visa for tourism or short business visits of up to 90 days. Germany is a member of the US Visa Waiver Program (VWP). However, all VWP travelers must obtain ESTA (Electronic System for Travel Authorization) approval before boarding any flight to the US. ESTA is applied for online, costs USD 21, and is typically approved within minutes. For stays over 90 days or for work and study, a US visa is required.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Germany',
    destinationCountry: 'United States',
    passportSlug: 'germany',
    destinationSlug: 'united-states',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'esta', text: 'ESTA: Mandatory Pre-Travel Authorisation', level: 2 },
      { id: 'when-visa-required', text: 'When Do Germans Need a US Visa?', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <GermansToUSAContent />,
    faqs: [
      {
        question: 'Do German citizens need a visa for the USA in 2026?',
        answer: 'No. German passport holders do not need a traditional visa for tourism or business visits of up to 90 days under the US Visa Waiver Program. However, ESTA (Electronic System for Travel Authorization) approval is mandatory before boarding any flight to the United States.',
      },
      {
        question: 'Is ESTA required for German passport holders?',
        answer: 'Yes. All German citizens traveling to the US under the Visa Waiver Program must obtain ESTA approval before departure. ESTA is applied for online at esta.cbp.dhs.gov, costs USD 21, and is valid for 2 years or until your passport expires. Most applications are approved within minutes.',
      },
      {
        question: 'How long can Germans stay in the US without a visa?',
        answer: 'German citizens can stay in the United States for up to 90 days per visit under the Visa Waiver Program with an approved ESTA. This limit cannot be extended — there is no mechanism to extend a VWP stay beyond 90 days.',
      },
      {
        question: 'Can Germans work in the US with an ESTA?',
        answer: 'No. ESTA and the Visa Waiver Program cover tourism and short-term business activities like attending meetings or conferences. Working for a US employer, freelancing, or engaging in any paid activity requires an appropriate US work visa (such as an H-1B or O-1) obtained before travel.',
      },
      {
        question: 'What happens if a German citizen overstays in the US?',
        answer: 'Overstaying your authorized period under the VWP permanently voids your ESTA eligibility. You will no longer qualify for the Visa Waiver Program and must apply for a B1/B2 tourist visa for future US trips. Overstays of 180 days result in a 3-year bar; overstays of 1 year or more result in a 10-year bar.',
      },
    ],
    sources: [
      { name: 'US Department of State — Visa Waiver Program', url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html' },
      { name: 'Official ESTA Application — US DHS', url: 'https://esta.cbp.dhs.gov/' },
      { name: 'US Embassy Berlin — Visa Information', url: 'https://de.usembassy.gov/visas/' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Germany Passport Visa-Free Countries', description: 'See all countries German passport holders can visit without a visa', href: '/passport/germany/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-australians-need-visa-for-japan-2026': {
    slug: 'do-australians-need-visa-for-japan-2026',
    title: 'Traveling to Japan from Australia: Visa Requirements for 2026',
    h1: 'Do Australians Need a Visa for Japan in 2026?',
    description: 'Complete guide to Japan visa requirements for Australian passport holders in 2026. Australian citizens can visit Japan visa-free for up to 90 days for tourism and short-term business.',
    lastReviewed: 'February 22, 2026',
    summary: 'Australian passport holders can visit Japan without a visa for up to 90 days for tourism or short-term business under a bilateral visa exemption arrangement. No prior visa application is needed. Travelers must carry a valid passport, proof of onward travel, and be prepared to show proof of sufficient funds at the border. Stays beyond 90 days or visits for work or study require a visa obtained from a Japanese Embassy before departure.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Australia',
    destinationCountry: 'Japan',
    passportSlug: 'australia',
    destinationSlug: 'japan',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'visa-exemption', text: 'Japan Visa Exemption for Australians', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'when-visa-required', text: 'When Is a Visa Required?', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <AustraliansToJapanContent />,
    faqs: [
      {
        question: 'Do Australians need a visa for Japan in 2026?',
        answer: 'No. Australian passport holders can visit Japan without a visa for up to 90 days for tourism or short-term business. Australia and Japan maintain a bilateral visa exemption arrangement. No prior application or eVisa is required for eligible stays.',
      },
      {
        question: 'How long can Australians stay in Japan without a visa?',
        answer: 'Australian citizens can stay in Japan for up to 90 days per entry under the visa exemption. The exact permitted stay is determined by the immigration officer at the port of entry and will be stamped in your passport.',
      },
      {
        question: 'Can Australians work in Japan on a visa-free entry?',
        answer: 'No. The Japan visa exemption for Australians covers tourism and short-term business activities only. Working, teaching, or performing paid activities in Japan requires a valid work visa obtained from the Japanese Embassy in Australia before departure.',
      },
      {
        question: 'What documents do Australians need to enter Japan?',
        answer: 'Australian travelers to Japan need a valid passport, a return or onward ticket, and should be prepared to show proof of accommodation bookings and sufficient funds for their stay. While not always asked, immigration officers can request any of these documents.',
      },
      {
        question: 'What is the overstay penalty in Japan for Australians?',
        answer: 'Overstaying your permitted stay in Japan is a serious offence resulting in fines, detention, deportation at your own expense, and a multi-year ban on re-entering Japan. Overstay records are maintained permanently in Japanese immigration systems.',
      },
    ],
    sources: [
      { name: 'Ministry of Foreign Affairs Japan — Visa Exemption', url: 'https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html' },
      { name: 'Embassy of Japan in Australia', url: 'https://www.au.emb-japan.go.jp/itprtop_en/index.html' },
      { name: 'Australian Government — Japan Travel Advice', url: 'https://www.smartraveller.gov.au/destinations/asia/japan' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Australia Passport Visa-Free Countries', description: 'See all countries Australian passport holders can visit without a visa', href: '/passport/australia/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-filipinos-need-visa-for-south-korea-2026': {
    slug: 'do-filipinos-need-visa-for-south-korea-2026',
    title: 'South Korea Visa Requirements for Filipino Travelers',
    h1: 'Do Filipinos Need a Visa for South Korea in 2026?',
    description: 'Complete guide to South Korea visa requirements for Filipino passport holders in 2026. Filipino citizens require a visa to visit South Korea but can apply for a K-ETA or a traditional visa depending on eligibility.',
    lastReviewed: 'February 22, 2026',
    summary: 'Filipino passport holders generally require a visa to visit South Korea. While South Korea previously offered visa-free access to Filipino travelers, this arrangement is not consistently available and requirements can change. Most Filipino citizens must apply for a South Korean visa before departure. Some eligible travelers may be able to use the K-ETA (Korea Electronic Travel Authorization) online system, but eligibility rules apply. Always verify current requirements before booking travel.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Philippines',
    destinationCountry: 'South Korea',
    passportSlug: 'philippines',
    destinationSlug: 'south-korea',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'visa-types', text: 'Visa Options for Filipinos', level: 2 },
      { id: 'documents-required', text: 'Documents Required', level: 2 },
      { id: 'processing-time', text: 'Processing Time and Fees', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <FilipinasToKoreaContent />,
    faqs: [
      {
        question: 'Do Filipinos need a visa for South Korea in 2026?',
        answer: 'Yes, most Filipino passport holders require a visa to visit South Korea. Filipino citizens must apply at the Korean Embassy or Consulate before departure. In some cases, Filipinos with valid US visas or other qualifying documents may have simplified access — check the Korean Embassy website for the latest eligibility rules.',
      },
      {
        question: 'Can Filipinos apply for a K-ETA for South Korea?',
        answer: 'K-ETA (Korea Electronic Travel Authorization) is available to citizens of certain visa-exempt countries. As Filipino citizens generally require a visa, K-ETA may not be available. However, eligibility rules change — check the official K-ETA website for the most current information before applying.',
      },
      {
        question: 'How long can Filipinos stay in South Korea with a tourist visa?',
        answer: 'A South Korean tourist visa (C-3) typically allows stays of up to 90 days per visit for Filipino citizens, though the actual stay is determined by the immigration officer at entry. Single-entry and multiple-entry visas are available.',
      },
      {
        question: 'What documents do Filipinos need to apply for a South Korea visa?',
        answer: 'Required documents typically include a completed visa application form, valid Philippine passport, passport photos, confirmed return ticket, hotel bookings, proof of financial capability (bank statements), income tax returns, and employment certificate or business registration documents.',
      },
      {
        question: 'How long does South Korea visa processing take for Filipinos?',
        answer: 'Processing time for a South Korean visa for Filipino applicants is typically 3 to 5 working days. It is recommended to apply at least 2 weeks before your intended travel date. During peak seasons processing may take longer.',
      },
    ],
    sources: [
      { name: 'Korean Embassy Manila — Visa Information', url: 'https://overseas.mofa.go.kr/ph-en/index.do' },
      { name: 'Korea Immigration Service', url: 'https://www.immigration.go.kr/immigration_eng/index.do' },
      { name: 'Korean Tourism Organization — Visa Information', url: 'https://english.visitkorea.or.kr/svc/main/index.do' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'South Korea Entry Requirements 2026', description: 'Complete visa requirements for all nationalities travelling to South Korea', href: '/visa-guides/country-entry-requirements/south-korea-2026' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-brazilians-need-visa-for-usa-2026': {
    slug: 'do-brazilians-need-visa-for-usa-2026',
    title: 'US Visa Requirements for Brazilian Citizens in 2026',
    h1: 'Do Brazilians Need a Visa for the USA in 2026?',
    description: 'Complete guide to US visa requirements for Brazilian passport holders in 2026. Brazilian citizens require a B1/B2 visa to visit the United States for tourism or business.',
    lastReviewed: 'February 22, 2026',
    summary: 'Brazilian passport holders require a B1/B2 non-immigrant visa to visit the United States for tourism or business. Brazil is not a member of the US Visa Waiver Program, so ESTA is not available to Brazilian citizens. The B1/B2 visa application must be submitted at a US Embassy or Consulate in Brazil, and an in-person interview is typically required. Processing times and appointment availability can vary significantly by consulate and season.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Brazil',
    destinationCountry: 'United States',
    passportSlug: 'brazil',
    destinationSlug: 'united-states',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'b1-b2-visa', text: 'B1/B2 Tourist and Business Visa', level: 2 },
      { id: 'how-to-apply', text: 'How to Apply for a US Visa in Brazil', level: 2 },
      { id: 'documents-required', text: 'Documents Required', level: 2 },
      { id: 'processing-time', text: 'Processing Time and Wait Times', level: 2 },
    ],
    content: <BraziliansToUSAContent />,
    faqs: [
      {
        question: 'Do Brazilians need a visa for the US in 2026?',
        answer: 'Yes. Brazilian citizens require a B1/B2 non-immigrant visa to visit the United States for tourism or business. Brazil is not in the Visa Waiver Program, so ESTA is not available. The visa must be obtained from a US Embassy or Consulate before travel.',
      },
      {
        question: 'Can Brazilians use ESTA to enter the USA?',
        answer: 'No. ESTA (Electronic System for Travel Authorization) is only available to citizens of Visa Waiver Program member countries. Brazil is not a VWP member, so Brazilian citizens cannot use ESTA and must apply for a B1/B2 visa.',
      },
      {
        question: 'How long does it take to get a US visa in Brazil?',
        answer: 'US visa processing times in Brazil vary significantly by consulate and season. Interview appointment wait times can range from a few weeks to several months. It is strongly recommended to apply as early as possible — ideally 3 to 6 months before your planned travel date.',
      },
      {
        question: 'What documents do Brazilians need to apply for a US visa?',
        answer: 'Required documents include a completed DS-160 application form, valid Brazilian passport, payment of the MRV fee (USD 185), a passport photo, and documents to support your ties to Brazil (employment, property, family), financial statements, and proof of the purpose of your visit.',
      },
      {
        question: 'How long can Brazilians stay in the US with a tourist visa?',
        answer: 'Brazilian citizens with a B1/B2 visa can typically be admitted for up to 6 months per visit, as determined by the CBP officer at entry. The actual authorized stay is stamped in your passport or noted on your I-94 form — always check this and depart before it expires.',
      },
    ],
    sources: [
      { name: 'US Embassy Brazil — Nonimmigrant Visas', url: 'https://br.usembassy.gov/visas/nonimmigrant-visas/' },
      { name: 'US Department of State — DS-160 Application', url: 'https://ceac.state.gov/genniv/' },
      { name: 'US Customs and Border Protection — I-94', url: 'https://i94.cbp.dhs.gov/' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Brazil Passport Visa-Free Countries', description: 'See all countries Brazilian passport holders can visit without a visa', href: '/passport/brazil/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-south-africans-need-visa-for-uk-2026': {
    slug: 'do-south-africans-need-visa-for-uk-2026',
    title: 'UK Visa Requirements for South African Citizens',
    h1: 'Do South Africans Need a Visa for the UK in 2026?',
    description: 'Complete guide to UK visa requirements for South African passport holders in 2026. South African citizens require a Standard Visitor visa to visit the United Kingdom for tourism or business.',
    lastReviewed: 'February 22, 2026',
    summary: 'South African passport holders require a UK Standard Visitor visa to enter the United Kingdom for tourism or business. There is no visa-free or visa-on-arrival option for South African citizens. The visa must be applied for online through the UK Visas and Immigration service and an in-person biometrics appointment at a visa application centre is required. The Standard Visitor visa allows stays of up to 6 months and can be valid for multiple entries over longer periods.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'South Africa',
    destinationCountry: 'United Kingdom',
    passportSlug: 'south-africa',
    destinationSlug: 'united-kingdom',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'standard-visitor-visa', text: 'UK Standard Visitor Visa', level: 2 },
      { id: 'how-to-apply', text: 'How to Apply for a UK Visa from South Africa', level: 2 },
      { id: 'documents-required', text: 'Documents Required', level: 2 },
      { id: 'processing-time', text: 'Processing Time and Fees', level: 2 },
    ],
    content: <SouthAfricansToUKContent />,
    faqs: [
      {
        question: 'Do South Africans need a visa for the UK in 2026?',
        answer: 'Yes. South African passport holders require a UK Standard Visitor visa to visit the United Kingdom for tourism, business, or family visits. There is no visa-free or visa-on-arrival option. The visa must be obtained before travel.',
      },
      {
        question: 'How do South Africans apply for a UK visa?',
        answer: 'South Africans apply for a UK visa online through the official UK Visas and Immigration website (gov.uk/apply-uk-visa). After completing the online form and paying the fee, you must book an appointment at a visa application centre in South Africa (Cape Town, Johannesburg, or Pretoria) to submit biometric data.',
      },
      {
        question: 'How much does a UK Standard Visitor visa cost for South Africans?',
        answer: 'The UK Standard Visitor visa fee is GBP 115 (approximately ZAR 2,700 at current rates) for a 6-month visa. Longer-validity visitor visas (2, 5, or 10 years) are also available at higher fees. An additional biometric enrolment fee applies.',
      },
      {
        question: 'How long can South Africans stay in the UK on a visitor visa?',
        answer: 'South African citizens with a UK Standard Visitor visa can stay for up to 6 months per visit regardless of the visa\'s overall validity period. A 2-year or 10-year visa still limits each individual stay to 6 months.',
      },
      {
        question: 'How long does UK visa processing take for South Africans?',
        answer: 'Standard UK visa processing takes approximately 3 weeks (15 working days). Priority processing (5 working days) and Super Priority (next working day) options are available at additional cost. Apply well in advance of your travel date.',
      },
    ],
    sources: [
      { name: 'UK Government — Apply for a UK Visa', url: 'https://www.gov.uk/apply-uk-visa' },
      { name: 'UK Visas and Immigration — Standard Visitor', url: 'https://www.gov.uk/standard-visitor-visa' },
      { name: 'VFS Global South Africa — UK Visa Applications', url: 'https://www.vfsglobal.co.uk/en/za/index.html' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'South Africa Passport Visa-Free Countries', description: 'See all countries South African passport holders can visit without a visa', href: '/passport/south-africa/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-mexicans-need-visa-for-canada-2026': {
    slug: 'do-mexicans-need-visa-for-canada-2026',
    title: 'Canada Visa Rules for Mexican Travelers',
    h1: 'Do Mexicans Need a Visa for Canada in 2026?',
    description: 'Complete guide to Canada visa requirements for Mexican passport holders in 2026. Mexican citizens require a Temporary Resident Visa (TRV) to visit Canada unless they hold a valid US visa or Canadian eTA.',
    lastReviewed: 'February 22, 2026',
    summary: 'Mexican passport holders require a Canadian Temporary Resident Visa (TRV) to visit Canada for tourism or business. However, Mexican citizens who hold a valid US non-immigrant visa may be eligible to apply for a Canadian eTA (Electronic Travel Authorization) instead of a full visa. The eTA is significantly cheaper and quicker to obtain. Those without a valid US visa must apply for the TRV through Immigration, Refugees and Citizenship Canada (IRCC).',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Mexico',
    destinationCountry: 'Canada',
    passportSlug: 'mexico',
    destinationSlug: 'canada',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'eta-option', text: 'eTA Option for Mexicans with US Visa', level: 2 },
      { id: 'trv', text: 'Temporary Resident Visa (TRV)', level: 2 },
      { id: 'documents-required', text: 'Documents Required', level: 2 },
      { id: 'processing-time', text: 'Processing Time and Fees', level: 2 },
    ],
    content: <MexicansToCanadaContent />,
    faqs: [
      {
        question: 'Do Mexicans need a visa for Canada in 2026?',
        answer: 'Yes, most Mexican citizens need a Temporary Resident Visa (TRV) to visit Canada. However, Mexican citizens who hold a valid US non-immigrant visa can apply for a Canadian eTA instead of a full visa, which is faster and cheaper to obtain.',
      },
      {
        question: 'Can Mexicans with a US visa use the Canadian eTA?',
        answer: 'Yes. Mexican citizens who hold a valid US non-immigrant visa (such as a B1/B2 tourist visa) are eligible to apply for a Canadian eTA instead of a full TRV. The eTA costs CAD 7, is applied for online, and is typically approved within minutes to 72 hours.',
      },
      {
        question: 'How do Mexicans apply for a Canadian visa?',
        answer: 'Mexicans without a US visa must apply for a Canadian Temporary Resident Visa through the IRCC online portal (ircc.canada.ca) or at a visa application centre in Mexico. Biometrics enrollment is required. The application fee is CAD 100.',
      },
      {
        question: 'How long can Mexicans stay in Canada?',
        answer: 'Mexican citizens with a Canadian TRV or eTA can stay in Canada for up to 6 months per visit. The actual authorized stay is determined by the border officer at entry and noted in your passport.',
      },
      {
        question: 'How long does Canadian visa processing take for Mexicans?',
        answer: 'Processing times for a Canadian Temporary Resident Visa from Mexico vary. Online applications typically take 2 to 8 weeks. It is recommended to apply at least 2 months before your planned travel date. The eTA, if eligible, is usually approved within minutes.',
      },
    ],
    sources: [
      { name: 'IRCC — Visa and eTA Requirements', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html' },
      { name: 'Canadian Embassy Mexico — Visitor Visa', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html' },
      { name: 'VFS Global Mexico — Canada Visa Applications', url: 'https://www.vfsglobal.ca/canada/mexico/' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Mexico Passport Visa-Free Countries', description: 'See all countries Mexican passport holders can visit without a visa', href: '/passport/mexico/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-vietnamese-need-visa-for-thailand-2026': {
    slug: 'do-vietnamese-need-visa-for-thailand-2026',
    title: 'Thailand Entry Requirements for Vietnamese Citizens',
    h1: 'Do Vietnamese Need a Visa for Thailand in 2026?',
    description: 'Complete guide to Thailand visa requirements for Vietnamese passport holders in 2026. Vietnamese citizens can enter Thailand visa-free for up to 30 days under a bilateral visa exemption.',
    lastReviewed: 'February 22, 2026',
    summary: 'Vietnamese passport holders can visit Thailand without a visa for up to 30 days under a bilateral visa exemption arrangement. This covers tourism and short business visits. Travelers must carry a passport valid for at least 6 months, proof of onward travel, and sufficient funds for their stay. Those wishing to stay longer than 30 days or visit for work or study purposes must obtain an appropriate Thai visa before departure.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Vietnam',
    destinationCountry: 'Thailand',
    passportSlug: 'vietnam',
    destinationSlug: 'thailand',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'visa-exemption', text: 'Thailand Visa Exemption for Vietnamese', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'extensions', text: 'Extending Your Stay', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <VietnameseToThailandContent />,
    faqs: [
      {
        question: 'Do Vietnamese citizens need a visa for Thailand in 2026?',
        answer: 'No. Vietnamese passport holders can enter Thailand without a visa for up to 30 days under a bilateral visa exemption. This applies to arrivals by air, land, or sea for tourism and short business visits.',
      },
      {
        question: 'How long can Vietnamese citizens stay in Thailand without a visa?',
        answer: 'Vietnamese citizens can stay in Thailand for up to 30 days per entry under the visa exemption. This can be extended once for an additional 30 days at a Thai immigration office for a fee of 1,900 baht.',
      },
      {
        question: 'What documents do Vietnamese citizens need for Thailand?',
        answer: 'Vietnamese travelers to Thailand need a valid passport with at least 6 months validity beyond departure date, a confirmed return or onward ticket within 30 days, and proof of sufficient funds (approximately 20,000 baht per person).',
      },
      {
        question: 'Can Vietnamese citizens work in Thailand without a visa?',
        answer: 'No. The visa exemption is for tourism and short-term business activities only. Working, teaching, or earning an income in Thailand requires a Non-Immigrant visa and work permit obtained before entering Thailand.',
      },
      {
        question: 'What is the overstay fine in Thailand for Vietnamese citizens?',
        answer: 'Overstaying in Thailand results in a fine of 500 baht per day, capped at 20,000 baht. Overstays exceeding 90 days can result in deportation and re-entry bans of 1 to 10 years depending on the overstay duration.',
      },
    ],
    sources: [
      { name: 'Royal Thai Embassy Hanoi — Visa Information', url: 'https://rtehanoi.thaiembassy.org/th/page/cate-1761-visa-information?menu=5d7de15d15e39c3484001bba' },
      { name: 'Thailand Immigration Bureau', url: 'https://www.immigration.go.th/' },
      { name: 'Tourism Authority of Thailand — Visa Information', url: 'https://www.tourismthailand.org/Articles/plan-your-trip-passportandvisa' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Vietnam Entry Requirements 2026', description: 'Complete visa requirements for all nationalities travelling to Vietnam', href: '/visa-guides/country-entry-requirements/vietnam-2026' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-australians-need-visa-for-uk-2026': {
    slug: 'do-australians-need-visa-for-uk-2026',
    title: 'UK Entry Rules for Australian Travelers (2026)',
    h1: 'Do Australians Need a Visa for the UK in 2026?',
    description: 'Complete guide to UK entry requirements for Australian passport holders in 2026. Australian citizens do not need a traditional visa but must obtain a UK Electronic Travel Authorisation (ETA) before travel.',
    lastReviewed: 'February 24, 2026',
    summary: 'Australian citizens do not need a traditional UK visa for short visits. However, since January 2024, a UK Electronic Travel Authorisation (ETA) is mandatory before boarding. The ETA costs £10, is valid for 2 years or until your passport expires, and allows multiple visits of up to 6 months each. For longer stays, work, or study, an appropriate UK visa is required.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Australia',
    destinationCountry: 'United Kingdom',
    passportSlug: 'australia',
    destinationSlug: 'united-kingdom',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'uk-eta', text: 'UK Electronic Travel Authorisation (ETA)', level: 2 },
      { id: 'when-visa-required', text: 'When Do Australians Need a UK Visa?', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <AustraliansToUKContent />,
    faqs: [
      {
        question: 'Do Australians need a visa for the UK in 2026?',
        answer: 'No. Australian citizens do not need a traditional visa for short visits to the United Kingdom. However, a UK Electronic Travel Authorisation (ETA) is mandatory before departure for all Australian passport holders. The ETA must be obtained online before travel and costs £10.',
      },
      {
        question: 'What is the UK ETA and how do I apply?',
        answer: 'The UK ETA (Electronic Travel Authorisation) is a digital pre-clearance linked to your passport. It replaced the previous visa-free arrangement for eligible nationalities including Australia. Apply via the official UK ETA app (available on iOS and Android) or the gov.uk website. It costs £10 and is usually approved within hours.',
      },
      {
        question: 'How long can Australians stay in the UK without a visa?',
        answer: 'With an approved UK ETA, Australian citizens can stay in the United Kingdom for up to 6 months per visit for tourism, visiting family or friends, or short business activities. The ETA itself is valid for 2 years or until your passport expires, allowing multiple trips within that period.',
      },
      {
        question: 'Can Australians work in the UK with an ETA?',
        answer: 'No. The UK ETA is for tourism, family visits, and short business activities only. Working in the UK requires a Skilled Worker Visa or another appropriate work visa. Australians aged 18–35 may be eligible for the Youth Mobility Scheme, which allows up to 2 years in the UK with the right to work.',
      },
      {
        question: 'What happens if an Australian overstays in the UK?',
        answer: 'Overstaying in the UK is a serious immigration offence that can result in detention, deportation at your expense, and a re-entry ban of up to 10 years. Future UK visa and ETA applications may also be refused. You must apply to extend your permission to stay before it expires if your circumstances change.',
      },
    ],
    sources: [
      { name: 'UK Home Office — Electronic Travel Authorisation', url: 'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta' },
      { name: 'UK Visas and Immigration', url: 'https://www.gov.uk/browse/visas-immigration' },
      { name: 'Australian Government — UK Travel Advice', url: 'https://www.smartraveller.gov.au/destinations/europe/united-kingdom' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Australia Passport Visa-Free Countries', description: 'See all countries Australian passport holders can visit without a visa', href: '/passport/australia/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
  'do-canadians-need-visa-for-japan-2026': {
    slug: 'do-canadians-need-visa-for-japan-2026',
    title: 'Japan Entry Rules for Canadian Travelers',
    h1: 'Do Canadians Need a Visa for Japan in 2026?',
    description: 'Complete guide to Japan visa requirements for Canadian passport holders in 2026. Canadian citizens can visit Japan visa-free for up to 90 days for tourism and short-term business.',
    lastReviewed: 'February 24, 2026',
    summary: 'Canadian passport holders can enter Japan without a visa for up to 90 days for tourism or short-term business under a bilateral visa exemption agreement. No advance visa application or eVisa is required. For stays longer than 90 days, employment, or academic programs, a Japanese visa must be obtained from a Japanese consulate before travel.',
    contentType: 'do-i-need-a-visa',
    passportCountry: 'Canada',
    destinationCountry: 'Japan',
    passportSlug: 'canada',
    destinationSlug: 'japan',
    year: 2026,
    tableOfContents: [
      { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
      { id: 'visa-exemption', text: 'Japan Visa Exemption for Canadians', level: 2 },
      { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
      { id: 'when-visa-required', text: 'When Is a Visa Required?', level: 2 },
      { id: 'overstay-penalties', text: 'Overstay Penalties', level: 2 },
    ],
    content: <CanadiansToJapanContent />,
    faqs: [
      {
        question: 'Do Canadians need a visa for Japan in 2026?',
        answer: 'No. Canadian passport holders can visit Japan without a visa for up to 90 days for tourism or short-term business. Canada and Japan maintain a bilateral visa exemption agreement dating back to 1964. No advance application, eVisa, or Electronic Travel Authorization is required for eligible visits.',
      },
      {
        question: 'How long can Canadians stay in Japan without a visa?',
        answer: 'Canadian citizens can stay in Japan for up to 90 days per visit under the visa exemption. The exact permitted stay will be stamped in your passport by the immigration officer at the port of entry.',
      },
      {
        question: 'Can Canadians work in Japan on a visa-free visit?',
        answer: 'No. The Japan visa exemption covers tourism and short-term business activities only, such as attending meetings or conferences. Working, teaching, or engaging in any paid activity requires a valid Japanese work visa obtained before departure.',
      },
      {
        question: 'What documents do Canadians need to enter Japan?',
        answer: 'Canadian travelers to Japan need a valid passport (6 months validity recommended), a return or onward ticket, and should be prepared to show proof of accommodation bookings and sufficient funds. A completed arrival card (provided on the flight) is also required.',
      },
      {
        question: 'Can Canadians get a working holiday visa for Japan?',
        answer: 'Yes. Canadians aged 18–30 can apply for a Japan Working Holiday Visa, which allows a stay of up to 1 year in Japan with the right to work. The visa must be applied for before departure from Canada at the Japanese consulate.',
      },
    ],
    sources: [
      { name: 'Ministry of Foreign Affairs Japan — Visa Exemption', url: 'https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html' },
      { name: 'Embassy of Japan in Canada', url: 'https://www.ca.emb-japan.go.jp/itprtop_en/index.html' },
      { name: 'Government of Canada — Japan Travel Advice', url: 'https://travel.gc.ca/destinations/japan' },
    ],
    internalLinks: [
      { title: 'Trip Visa Finder Tool', description: 'Plan your trip and check visa requirements for multiple destinations', href: '/trip' },
      { title: 'Canada Passport Visa-Free Countries', description: 'See all countries Canadian passport holders can visit without a visa', href: '/passport/canada/visa-free-countries' },
      { title: 'Do I Need a Visa? Hub', description: 'Check visa requirements for any passport and destination combination', href: '/visa-guides/do-i-need-a-visa' },
    ],
  },
};

function USToEuropeContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          Visa Requirement Summary
        </h2>

        <div className="mb-6 overflow-x-auto">
          <table className="w-full overflow-hidden rounded-lg border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Requirement
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Visa Required
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  No (for tourism up to 90 days per 180-day period)
                </td>
              </tr>

              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Visa-Free Stay
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  90 days within any 180-day period (Schengen Area)
                </td>
              </tr>

              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ETIAS Required
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Not yet in force (check official ETIAS site for launch date)
                </td>
              </tr>

              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Passport Validity
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Valid for duration of stay (3 months beyond departure
                  recommended)
                </td>
              </tr>

              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Proof of Onward Travel
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  May be requested
                </td>
              </tr>

              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Proof of Funds
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  May be requested
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="schengen-area" className="mb-10 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          What Is the Schengen Area?
        </h2>

        <p className="mb-4 leading-relaxed text-gray-700">
          The Schengen Area is a group of <strong>27 European countries</strong>{' '}
          that have abolished passport controls at their shared borders,
          creating a single travel zone. US citizens can travel freely between
          all Schengen member states on a single entry. Countries include
          France, Germany, Italy, Spain, Portugal, Netherlands, Austria,
          Switzerland, Greece, and others.
        </p>

        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> The United Kingdom, Ireland, Romania,
            Bulgaria, and Cyprus are EU members but are not part of the
            Schengen Area. Separate entry rules apply to those countries.
          </p>
        </div>
      </section>

      <section id="90-180-rule" className="mb-10 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          The 90/180-Day Rule Explained
        </h2>

        <p className="mb-4 leading-relaxed text-gray-700">
          US citizens can stay in the Schengen Area for{' '}
          <strong>up to 90 days within any rolling 180-day period</strong>.
          This is not a calendar-year limit. It is calculated from your most
          recent entry date, rolling back 180 days. Days spent in any Schengen
          country count toward this 90-day total. Use our{' '}
          <Link
            href="/tools/schengen-calculator"
            className="font-medium text-teal-600 underline hover:text-teal-700"
          >
            Schengen Calculator
          </Link>{' '}
          to track remaining days.
        </p>
      </section>

      <section id="etias" className="mb-10 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          ETIAS: Upcoming Requirement for US Citizens
        </h2>

        <p className="mb-4 leading-relaxed text-gray-700">
          ETIAS (European Travel Information and Authorisation System) is a
          pre-travel authorisation being introduced for visa-exempt
          nationalities, including US citizens. It is{' '}
          <strong>not yet in force as of early 2026</strong>. Once launched, US
          travelers will need to apply online and receive ETIAS approval before
          boarding any flight to a Schengen country.
        </p>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm text-amber-900">
            <strong>Important:</strong> Always check the official ETIAS website
            for the current launch date before booking travel to Europe.
          </p>
        </div>
      </section>

      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          Documents Required at Entry
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="min-w-[200px] font-semibold">Passport:</span>
            <span>
              Valid US passport. Many Schengen countries recommend at least 3
              months of validity beyond your planned departure date.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="min-w-[200px] font-semibold">Return Ticket:</span>
            <span>
              Proof of onward or return travel out of the Schengen Area may be
              requested.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="min-w-[200px] font-semibold">Proof of Funds:</span>
            <span>
              Border officers may ask for evidence of sufficient funds to
              support your stay.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="min-w-[200px] font-semibold">Accommodation:</span>
            <span>
              Hotel bookings or a host invitation letter may be requested.
            </span>
          </li>
        </ul>
      </section>
    </>
  );
}

function IndiansToDubaiContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">Yes (eVisa or Visa on Arrival)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa on Arrival</td><td className="px-6 py-4 text-sm text-gray-700">Available for Indians with valid US/UK/EU visa (14 days)</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">eVisa</td><td className="px-6 py-4 text-sm text-gray-700">30 or 60-day options available online</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Minimum 6 months beyond entry date</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Overstay Fine</td><td className="px-6 py-4 text-sm text-gray-700">AED 50/day after AED 100 initial fine</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="visa-on-arrival" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa on Arrival for Indian Citizens</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Indian citizens holding a valid <strong>US, UK, or EU/Schengen visa</strong> with at least 6 months remaining validity can obtain a visa on arrival at Dubai International Airport and other UAE ports of entry. The visa on arrival is valid for <strong>14 days</strong> and can be extended once for an additional 14 days at an ICA service centre. A fee applies at time of stamping.</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-sm text-amber-900"><strong>Important:</strong> Indian citizens without a valid qualifying third-country visa must apply for a UAE eVisa before departure. Visa on arrival cannot be obtained at all ports — verify before travel.</p>
        </div>
      </section>
      <section id="evisa" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">UAE eVisa for Indians</h2>
        <p className="text-gray-700 leading-relaxed mb-4">The UAE eVisa is available through the <strong>ICP portal</strong>, Emirates airlines, Air Arabia, or other authorised channels. Applications are entirely online. eVisas come in 30-day (single or multiple entry) and 60-day options. Most applications are approved within 24–72 hours. Approved eVisas must be presented at check-in and on arrival.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid Indian passport with at least 6 months validity beyond your entry date.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Return Ticket:</span><span>Confirmed return or onward flight booking.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Hotel Booking:</span><span>Confirmed accommodation or host invitation letter.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Proof of Funds:</span><span>Bank statements or sufficient cash to cover your stay.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport Photo:</span><span>Recent passport-sized photograph (for eVisa application).</span></li>
        </ul>
      </section>
      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Overstaying a UAE visa results in a fine of <strong>AED 100 for the first day</strong> plus <strong>AED 50 per day</strong> thereafter. Prolonged overstays can result in deportation and a ban on re-entering the UAE. Always ensure your departure is before the visa expiry date stamped in your passport.</p>
      </section>
    </>
  );
}

function UKToAustraliaContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">ETA required (not a traditional visa)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">ETA Stay Duration</td><td className="px-6 py-4 text-sm text-gray-700">Up to 3 months per visit</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">ETA Validity</td><td className="px-6 py-4 text-sm text-gray-700">12 months from issue (multiple entries)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">ETA Fee</td><td className="px-6 py-4 text-sm text-gray-700">AUD 20 (service charge)</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Valid for entire stay</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="what-is-eta" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is the Australian ETA?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">The Australian ETA (Electronic Travel Authority, subclass 601) is an electronic travel permission linked directly to your passport. It is <strong>not a visa stamp or sticker</strong> — there is nothing physically placed in your passport. The ETA allows multiple visits of up to 3 months per visit within 12 months of issue, covering tourism, family visits, and certain business activities.</p>
      </section>
      <section id="how-to-apply" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Apply for the Australian ETA</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Apply via the <strong>Australian ETA app</strong> (available on iOS and Android) or through a registered travel agent or airline. The fee is AUD 20. Most applications are approved within minutes, though some may take up to 24 hours. Apply before booking flights to confirm approval.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid UK passport. Must be valid for the full duration of your stay.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Approved ETA:</span><span>Your ETA is linked electronically to your passport — no paper printout is needed, but keep your approval reference.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Return Ticket:</span><span>Proof of onward or return travel may be requested.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Proof of Funds:</span><span>Border Force officers may ask for evidence of sufficient funds.</span></li>
        </ul>
      </section>
      <section id="when-visa-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Do UK Citizens Need a Full Visa?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">UK citizens need a full Australian visa (not an ETA) for stays exceeding 3 months, work, study, or immigration purposes. The Working Holiday Visa (subclass 417) is available to UK citizens aged 18–30 (or 35 with a specific agreement). Apply through the Australian Department of Home Affairs website.</p>
      </section>
    </>
  );
}

function CanadiansToThailandContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">No (for tourism up to 60 days)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free Stay</td><td className="px-6 py-4 text-sm text-gray-700">60 days per entry (extendable by 30 days)</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Extension Fee</td><td className="px-6 py-4 text-sm text-gray-700">1,900 baht at Thai immigration office</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Minimum 6 months beyond departure date</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Overstay Fine</td><td className="px-6 py-4 text-sm text-gray-700">500 baht/day (capped at 20,000 baht)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="visa-exemption" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Thailand Visa Exemption for Canadians</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Canada and Thailand maintain a <strong>bilateral visa exemption</strong> allowing Canadian passport holders to enter Thailand without a prior visa. Canadians can stay for <strong>up to 60 days per entry</strong> for tourism or short business purposes. This applies to arrivals by air, land, and sea crossings.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid Canadian passport with at least 6 months validity beyond your departure date from Thailand.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Return Ticket:</span><span>Confirmed return or onward ticket within 60 days is required.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Proof of Funds:</span><span>Approximately 20,000 baht per person may be requested.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Accommodation:</span><span>Hotel booking or confirmed address in Thailand.</span></li>
        </ul>
      </section>
      <section id="extensions" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Extending Your Stay in Thailand</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Canadians can extend their visa-exempt stay by <strong>30 days</strong> at any Thai immigration office before their original 60-day period expires. The fee is 1,900 baht. Extensions are generally granted once per entry. For longer stays, a tourist visa (TR) or other appropriate visa must be obtained before entry.</p>
      </section>
      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Overstaying in Thailand results in a fine of <strong>500 baht per day</strong>, capped at 20,000 baht total. Overstays of more than 90 days can result in detention, deportation at your own expense, and re-entry bans ranging from 1 to 10 years.</p>
      </section>
    </>
  );
}

function ChineseToSingaporeContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">No (visa-free for up to 30 days)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free Stay</td><td className="px-6 py-4 text-sm text-gray-700">30 days per visit</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">eVisa Available</td><td className="px-6 py-4 text-sm text-gray-700">Not required for eligible stays</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Minimum 6 months beyond entry date</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Onward Travel</td><td className="px-6 py-4 text-sm text-gray-700">Required</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="visa-free-arrangement" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Singapore Visa-Free Arrangement for Chinese Citizens</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Singapore and China established a <strong>mutual 30-day visa-free arrangement</strong> that took effect in February 2024. Chinese passport holders can enter Singapore for tourism, family visits, and short-term business without applying for a visa in advance. The arrangement applies to ordinary passport holders and is subject to standard immigration checks at the point of entry.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid Chinese passport with at least 6 months validity.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Return Ticket:</span><span>Confirmed return or onward travel out of Singapore.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Accommodation:</span><span>Hotel booking or host address in Singapore.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Proof of Funds:</span><span>Sufficient funds to support your stay may be requested.</span></li>
        </ul>
      </section>
      <section id="when-pass-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Is a Pass or Visa Required?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Chinese citizens need a Singapore pass or visa for stays exceeding 30 days, employment, study, or long-term residence. These must be obtained through Singapore's Immigration & Checkpoints Authority (ICA) before travel.</p>
      </section>
      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Singapore treats overstays extremely seriously. All overstayers face deportation and potential bans from re-entering Singapore. Overstays exceeding 90 days carry additional mandatory penalties. Always depart before your authorized stay expires.</p>
      </section>
    </>
  );
}

function GermansToUSAContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">No (ESTA required — not a visa)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">ESTA Required</td><td className="px-6 py-4 text-sm text-gray-700">Yes — mandatory before boarding</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay</td><td className="px-6 py-4 text-sm text-gray-700">90 days per visit</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">ESTA Fee</td><td className="px-6 py-4 text-sm text-gray-700">USD 21</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">ESTA Validity</td><td className="px-6 py-4 text-sm text-gray-700">2 years or until passport expiry</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="esta" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">ESTA: Mandatory Pre-Travel Authorisation</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Germany is a member of the US <strong>Visa Waiver Program (VWP)</strong>. German citizens do not need a traditional visa but must obtain <strong>ESTA (Electronic System for Travel Authorization)</strong> approval before boarding any flight to the United States. Apply at <strong>esta.cbp.dhs.gov</strong> — cost is USD 21. ESTA is valid for 2 years and allows multiple trips of up to 90 days each.</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
          <p className="text-sm text-amber-900"><strong>Important:</strong> Apply for ESTA at least 72 hours before departure. Airlines will check ESTA status before boarding.</p>
        </div>
      </section>
      <section id="when-visa-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Do Germans Need a US Visa?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">German citizens need a US visa (instead of ESTA) for stays exceeding 90 days, work, study, journalism, exchange programs, or if they have previously been denied entry or have traveled to certain restricted countries. The appropriate visa type must be obtained from a US Embassy before travel.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid German passport (electronic biometric passport required for VWP).</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Approved ESTA:</span><span>ESTA approval linked to your passport — available in the CBP system.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Return Ticket:</span><span>Proof of onward or return travel may be requested.</span></li>
        </ul>
      </section>
      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Overstaying your authorized 90-day period <strong>permanently voids your ESTA eligibility</strong>. Future travel to the US will require a B1/B2 visa. Overstays of 180 days result in a 3-year entry bar; overstays of 1 year or more result in a 10-year bar.</p>
      </section>
    </>
  );
}

function AustraliansToJapanContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">No (for tourism up to 90 days)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free Stay</td><td className="px-6 py-4 text-sm text-gray-700">Up to 90 days per entry</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">eVisa Available</td><td className="px-6 py-4 text-sm text-gray-700">Not required for visa-exempt stays</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Valid for duration of stay</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Onward Travel</td><td className="px-6 py-4 text-sm text-gray-700">Recommended</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="visa-exemption" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Japan Visa Exemption for Australians</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Australia and Japan maintain a <strong>bilateral visa exemption arrangement</strong> allowing Australian passport holders to visit Japan for up to <strong>90 days per entry</strong> without a visa. This covers tourism, family visits, and short-term business activities. No prior application is needed — entry is granted at the port of entry subject to standard immigration checks.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid Australian passport for the duration of your stay.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Return Ticket:</span><span>Proof of onward or return travel recommended.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Accommodation:</span><span>Hotel bookings or host address in Japan.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Proof of Funds:</span><span>Sufficient funds for your stay may be requested.</span></li>
        </ul>
      </section>
      <section id="when-visa-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Is a Visa Required?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Australian citizens need a Japanese visa for stays exceeding 90 days, work, study, or certain specific activities. Apply through the Japanese Embassy or Consulate in Australia well before your planned departure date.</p>
      </section>
      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Overstaying in Japan results in fines, detention, deportation at your own expense, and a multi-year ban on re-entering Japan. Overstay records are maintained permanently and can affect future visa applications to Japan and other countries.</p>
      </section>
    </>
  );
}

function FilipinasToKoreaContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">Yes (C-3 tourist visa for most Filipinos)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free</td><td className="px-6 py-4 text-sm text-gray-700">Not generally available</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Tourist Visa Stay</td><td className="px-6 py-4 text-sm text-gray-700">Up to 90 days (single or multiple entry)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Processing Time</td><td className="px-6 py-4 text-sm text-gray-700">3–5 working days</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Minimum 6 months beyond entry date</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="visa-types" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Options for Filipinos</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Filipino citizens must apply for a <strong>South Korean C-3 tourist visa</strong> at the Korean Embassy or Consulate in Manila or Cebu. Single-entry and multiple-entry visas are available. Some Filipinos who have previously traveled to Korea or hold qualifying visas may be eligible for a simplified process — check the Korean Embassy website for current eligibility criteria.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Application Form:</span><span>Completed Korean visa application form.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid Philippine passport with at least 6 months validity and blank pages.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport Photos:</span><span>Recent passport-sized photographs meeting Korean specifications.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Financial Proof:</span><span>Bank statements showing sufficient funds (typically 3 months).</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Employment Documents:</span><span>Employment certificate, income tax return, or business registration.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Travel Itinerary:</span><span>Return ticket and hotel bookings in Korea.</span></li>
        </ul>
      </section>
      <section id="processing-time" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Processing Time and Fees</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Standard processing time is <strong>3–5 working days</strong>. Apply at least 2 weeks before your planned travel date. The visa fee is approximately PHP 1,200–2,500 depending on visa type. Payment is made at time of application submission.</p>
      </section>
      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Overstaying in South Korea results in fines, deportation, and a ban on future entry. Repeat overstays or long overstays can result in permanent entry bans. Always ensure your departure before the authorized stay period expires.</p>
      </section>
    </>
  );
}

function BraziliansToUSAContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">Yes (B1/B2 tourist/business visa)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">ESTA Available</td><td className="px-6 py-4 text-sm text-gray-700">No — Brazil is not in VWP</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Typical Stay Allowed</td><td className="px-6 py-4 text-sm text-gray-700">Up to 6 months per visit</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Fee</td><td className="px-6 py-4 text-sm text-gray-700">USD 185 (MRV fee, non-refundable)</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Interview Required</td><td className="px-6 py-4 text-sm text-gray-700">Yes (at US Embassy or Consulate)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="b1-b2-visa" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">B1/B2 Tourist and Business Visa</h2>
        <p className="text-gray-700 leading-relaxed mb-4">The <strong>B1/B2 non-immigrant visa</strong> is the standard US visa for tourism (B2) and short-term business activities (B1). It allows multiple entries and is typically issued for 10 years. Each visit can be for up to 6 months as determined by the CBP officer at entry.</p>
      </section>
      <section id="how-to-apply" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Apply for a US Visa in Brazil</h2>
        <ol className="space-y-4 text-gray-700">
          <li className="flex items-start gap-3"><span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">1</span><div><strong>Complete DS-160:</strong> Fill out the online DS-160 nonimmigrant visa application form at ceac.state.gov.</div></li>
          <li className="flex items-start gap-3"><span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">2</span><div><strong>Pay MRV Fee:</strong> Pay the USD 185 non-refundable application fee at an authorized payment location.</div></li>
          <li className="flex items-start gap-3"><span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">3</span><div><strong>Schedule Interview:</strong> Book a visa interview appointment at the nearest US Embassy or Consulate (Brasilia, São Paulo, Rio de Janeiro, Porto Alegre, or Recife).</div></li>
          <li className="flex items-start gap-3"><span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">4</span><div><strong>Attend Interview:</strong> Appear in person with your documents. The consular officer will make the visa decision.</div></li>
        </ol>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">DS-160 Form:</span><span>Completed and confirmed online application with barcode page.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid Brazilian passport with at least 6 months validity beyond your intended stay.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">MRV Receipt:</span><span>Proof of fee payment.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport Photo:</span><span>Recent photo meeting US visa specifications.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Ties to Brazil:</span><span>Employment letter, property ownership, family ties — evidence you will return.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Financial Proof:</span><span>Bank statements showing sufficient funds.</span></li>
        </ul>
      </section>
      <section id="processing-time" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Processing Time and Wait Times</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Interview appointment wait times vary significantly by consulate and season, ranging from a few weeks to several months. It is strongly recommended to apply <strong>3 to 6 months before</strong> your intended travel date. Check current wait times at the US Embassy Brazil website.</p>
      </section>
    </>
  );
}

function SouthAfricansToUKContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">Yes (Standard Visitor Visa)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free</td><td className="px-6 py-4 text-sm text-gray-700">No</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay</td><td className="px-6 py-4 text-sm text-gray-700">6 months per visit</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Fee</td><td className="px-6 py-4 text-sm text-gray-700">GBP 115 (6-month standard)</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Processing Time</td><td className="px-6 py-4 text-sm text-gray-700">Approximately 3 weeks (15 working days)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="standard-visitor-visa" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">UK Standard Visitor Visa</h2>
        <p className="text-gray-700 leading-relaxed mb-4">The UK <strong>Standard Visitor visa</strong> allows South African citizens to visit the UK for tourism, family visits, business meetings, and certain permitted activities. It is available as a 6-month single or multiple entry visa, or as a 2-year, 5-year, or 10-year multiple entry visa. Regardless of the visa's validity period, each individual stay cannot exceed 6 months.</p>
      </section>
      <section id="how-to-apply" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Apply for a UK Visa from South Africa</h2>
        <ol className="space-y-4 text-gray-700">
          <li className="flex items-start gap-3"><span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">1</span><div><strong>Apply Online:</strong> Complete the application on gov.uk/apply-uk-visa and pay the fee online.</div></li>
          <li className="flex items-start gap-3"><span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">2</span><div><strong>Book Biometrics:</strong> Schedule an appointment at a VFS Global visa application centre in Cape Town, Johannesburg, or Pretoria.</div></li>
          <li className="flex items-start gap-3"><span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">3</span><div><strong>Submit Documents:</strong> Attend your appointment with your passport and supporting documents. Biometrics (fingerprints and photo) will be collected.</div></li>
          <li className="flex items-start gap-3"><span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">4</span><div><strong>Decision:</strong> UK Visas and Immigration will make the decision, usually within 15 working days.</div></li>
        </ol>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Current South African passport valid for your entire stay, plus any previous passports.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Financial Proof:</span><span>Bank statements for the last 3–6 months showing regular income and sufficient funds.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Employment:</span><span>Letter from employer, payslips, or proof of business ownership.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Accommodation:</span><span>Hotel bookings or invitation letter from a UK host.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Travel History:</span><span>Previous passports or evidence of prior international travel helps demonstrate travel history.</span></li>
        </ul>
      </section>
      <section id="processing-time" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Processing Time and Fees</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Standard processing takes approximately <strong>15 working days</strong>. Priority (5 working days) and Super Priority (next working day) options are available at additional cost. The standard 6-month visa fee is GBP 115. Longer-validity visas (2, 5, or 10 years) cost more but offer better value for frequent travelers.</p>
      </section>
    </>
  );
}

function MexicansToCanadaContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">TRV required (eTA if eligible with US visa)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">eTA Option</td><td className="px-6 py-4 text-sm text-gray-700">Available if holding valid US non-immigrant visa</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay</td><td className="px-6 py-4 text-sm text-gray-700">Up to 6 months per visit</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">TRV Fee</td><td className="px-6 py-4 text-sm text-gray-700">CAD 100</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">eTA Fee</td><td className="px-6 py-4 text-sm text-gray-700">CAD 7</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="eta-option" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">eTA Option for Mexicans with US Visa</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Mexican citizens who hold a <strong>valid US non-immigrant visa</strong> (such as a B1/B2 tourist visa) can apply for a Canadian eTA (Electronic Travel Authorization) instead of a full TRV. The eTA costs just <strong>CAD 7</strong>, is applied for online at canada.ca, and is typically approved within minutes to 72 hours. Once approved, it is valid for 5 years or until passport expiry.</p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
          <p className="text-sm text-green-900"><strong>Tip:</strong> If you have a valid US visa, apply for the eTA — it is significantly faster and cheaper than a full TRV.</p>
        </div>
      </section>
      <section id="trv" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Temporary Resident Visa (TRV)</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Mexicans without a qualifying US visa must apply for a Canadian <strong>Temporary Resident Visa (TRV)</strong> through IRCC online or at a VFS Global application centre in Mexico. Biometrics enrollment is required. The application fee is CAD 100. Processing times vary from 2 to 8 weeks.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid Mexican passport with at least 6 months validity.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Financial Proof:</span><span>Bank statements showing sufficient funds for your stay in Canada.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Employment:</span><span>Letter from employer or proof of business ownership and ties to Mexico.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Travel Purpose:</span><span>Confirmed return ticket, hotel bookings, or invitation letter from a Canadian host.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">US Visa (if applying for eTA):</span><span>A valid US non-immigrant visa must be presented at time of eTA application.</span></li>
        </ul>
      </section>
      <section id="processing-time" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Processing Time and Fees</h2>
        <p className="text-gray-700 leading-relaxed mb-4">eTA applications are usually approved within minutes. TRV processing typically takes <strong>2 to 8 weeks</strong>. Apply at least 2 months before your planned travel date to allow sufficient time. Biometrics can be enrolled at VFS Global offices in Mexico City, Guadalajara, and Monterrey.</p>
      </section>
    </>
  );
}

function VietnameseToThailandContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">No (for tourism up to 30 days)</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free Stay</td><td className="px-6 py-4 text-sm text-gray-700">30 days per entry (extendable by 30 days)</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Extension Fee</td><td className="px-6 py-4 text-sm text-gray-700">1,900 baht at Thai immigration office</td></tr>
              <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Minimum 6 months beyond departure date</td></tr>
              <tr className="bg-white"><td className="px-6 py-4 text-sm font-medium text-gray-900">Overstay Fine</td><td className="px-6 py-4 text-sm text-gray-700">500 baht/day (capped at 20,000 baht)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="visa-exemption" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Thailand Visa Exemption for Vietnamese</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Vietnam and Thailand maintain a <strong>bilateral visa exemption</strong> allowing Vietnamese passport holders to enter Thailand for up to <strong>30 days per entry</strong> without a prior visa. This covers tourism and short-term business and applies to arrivals by air, land, and sea. Entry is subject to standard immigration requirements at the port of entry.</p>
      </section>
      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Passport:</span><span>Valid Vietnamese passport with at least 6 months validity beyond your departure from Thailand.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Return Ticket:</span><span>Confirmed return or onward ticket within 30 days is required.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Proof of Funds:</span><span>Approximately 20,000 baht per person may be requested by immigration officers.</span></li>
          <li className="flex items-start gap-3"><span className="font-semibold min-w-[200px]">Accommodation:</span><span>Hotel booking or confirmed address in Thailand.</span></li>
        </ul>
      </section>
      <section id="extensions" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Extending Your Stay</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Vietnamese citizens can extend their 30-day visa-exempt stay by <strong>one additional 30 days</strong> at any Thai immigration office before the original period expires. The extension fee is 1,900 baht. For longer stays, a Thai tourist visa or appropriate visa must be obtained before entry into Thailand.</p>
      </section>
      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">Overstaying in Thailand results in a fine of <strong>500 baht per day</strong>, capped at 20,000 baht. Overstays exceeding 90 days can result in deportation and re-entry bans of 1 to 10 years depending on overstay duration. Always depart before or on the date stamped in your passport.</p>
      </section>
    </>
  );
}

function ThaisToJapanContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">No (for tourism up to 15 days)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free Stay</td>
                <td className="px-6 py-4 text-sm text-gray-700">15 days</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">eVisa Available</td>
                <td className="px-6 py-4 text-sm text-gray-700">No (not required for visa-exempt short stays)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa on Arrival</td>
                <td className="px-6 py-4 text-sm text-gray-700">No</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">Valid for duration of stay</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Onward Travel</td>
                <td className="px-6 py-4 text-sm text-gray-700">Required</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Funds</td>
                <td className="px-6 py-4 text-sm text-gray-700">May be requested</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="visa-exemption" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Japan Visa Exemption for Thai Citizens</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Japan and Thailand maintain a <strong>bilateral visa exemption arrangement</strong> that allows Thai passport holders to enter Japan for short stays without prior visa approval. This is one of the most straightforward entry routes available for Thai travellers. Read more about visa-free travel rules in our{' '}
          <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">
            visa-free travel guide
          </Link>.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Permitted Activities Under Visa Exemption</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Tourism:</span>
              <span>Sightseeing, leisure travel, and recreational activities are all permitted under the exemption.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Short-Term Business:</span>
              <span>Attending meetings, conferences, or negotiations. Engaging in paid work is not permitted.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Visiting Family or Friends:</span>
              <span>Social visits to family members or friends residing in Japan are permitted within the 15-day limit.</span>
            </li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Conditions</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Maximum Stay:</span>
              <span>15 days per entry. You must depart on or before the date stamped in your passport by the immigration officer.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">No Paid Work:</span>
              <span>Working for pay or engaging in any income-generating activity in Japan is strictly prohibited under the visa exemption.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Immigration Discretion:</span>
              <span>Entry is not guaranteed. The immigration officer at the port of entry has discretion to deny entry if requirements are not satisfactorily met.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          For a comprehensive breakdown of Japan's entry requirements for all passport holders, visit our{' '}
          <Link href="/visa-guides/country-entry-requirements/japan-2026" className="text-teal-600 hover:text-teal-700 font-medium underline">
            Japan Entry Requirements 2026
          </Link>{' '}
          guide.
        </p>
      </section>

      <section id="when-visa-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Do Thai Citizens Need a Visa for Japan?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Despite the visa-free arrangement, there are situations where Thai citizens must obtain a visa before travelling to Japan:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li><strong>Stays longer than 15 days</strong> — any stay exceeding the visa-exempt limit requires a tourist or appropriate visa</li>
          <li><strong>Study in Japan</strong> — a student visa is required for any formal course of study, regardless of duration</li>
          <li><strong>Working in Japan</strong> — any form of paid employment requires an appropriate work visa category obtained before departure</li>
          <li><strong>Long-term residency</strong> — a long-stay or residence visa is required for extended stays or permanent relocation</li>
          <li><strong>Journalism or specialised activities</strong> — certain professional activities require specific visa categories</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-4">
          Visa applications for Thai citizens should be submitted through:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>The <strong>Embassy of Japan in Bangkok</strong></li>
          <li>Japanese Consulates in Thailand</li>
          <li>Authorised visa application centres in Thailand</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Not sure whether you need a visa? Visit the{' '}
          <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">
            Do I Need a Visa? hub
          </Link>{' '}
          for personalised guidance.
        </p>
      </section>

      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          While no visa is needed for short stays, Thai travellers must be prepared to present the following at the Japanese port of entry:
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mandatory Documents</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Valid Thai Passport:</span>
              <span>
                Your passport must be valid for the entire duration of your intended stay in Japan. Review{' '}
                <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  passport validity rules
                </Link>{' '}
                before travel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Return or Onward Ticket:</span>
              <span>
                A confirmed return flight or onward ticket showing you will depart Japan within the 15-day exemption period. Read more about{' '}
                <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  onward travel requirements
                </Link>.
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents That May Be Requested</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Proof of Accommodation:</span>
              <span>Hotel bookings, Airbnb reservations, or a letter of invitation from a host in Japan covering your entire stay.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Proof of Financial Means:</span>
              <span>
                Bank statements or cash showing you have sufficient funds to support yourself during your stay. See our{' '}
                <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  proof of funds guide
                </Link>{' '}
                for what is typically expected.
              </span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Immigration officers in Japan have full discretion to request additional documentation. Carrying supporting documents is strongly recommended even if they are not formally required.
        </p>
      </section>

      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Japan</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Overstaying the permitted 15-day visa-exempt period in Japan is a serious immigration offence, regardless of the reason.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consequences of Overstaying</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Fines:</span>
              <span>Financial penalties may be imposed for overstaying, proportional to the number of days exceeded.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Deportation:</span>
              <span>Overstayers may be detained and deported from Japan at their own expense.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Entry Bans:</span>
              <span>A deportation order typically results in a ban from re-entering Japan, often for several years.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Future Visa Refusals:</span>
              <span>An overstay record can result in refusals when applying for future Japanese visas or visas for other countries that conduct immigration history checks.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Always track your permitted stay carefully. The allowed number of days is stamped in your passport at entry. If you wish to remain in Japan longer than permitted, you must apply for an appropriate visa before your current permission expires.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Visa Checks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/visa-guides/do-indians-need-visa-for-japan-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              Do Indians Need a Visa for Japan?
            </h3>
            <p className="text-sm text-gray-600">
              Japan visa requirements for Indian passport holders, including eVisa options.
            </p>
          </Link>
          <Link
            href="/visa-guides/country-entry-requirements/japan-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              Japan Entry Requirements 2026
            </h3>
            <p className="text-sm text-gray-600">
              Full entry requirements for all nationalities travelling to Japan.
            </p>
          </Link>
          <Link
            href="/visa-guides/do-us-citizens-need-visa-for-thailand-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              Do US Citizens Need a Visa for Thailand?
            </h3>
            <p className="text-sm text-gray-600">
              Visa exemption rules for US passport holders visiting Thailand.
            </p>
          </Link>
          <Link
            href="/trip"
            className="group block p-5 bg-teal-50 border border-teal-200 rounded-lg hover:border-teal-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-teal-800 group-hover:text-teal-900 transition-colors mb-1">
              Trip Visa Finder Tool
            </h3>
            <p className="text-sm text-teal-700">
              Plan a multi-destination trip and check visa requirements for your entire itinerary at once.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}

function IndiansToJapanContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">Yes</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free Entry</td>
                <td className="px-6 py-4 text-sm text-gray-700">No</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">eVisa Available</td>
                <td className="px-6 py-4 text-sm text-gray-700">Yes (for short-term tourism, eligible applicants)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa on Arrival</td>
                <td className="px-6 py-4 text-sm text-gray-700">No</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay (Tourist)</td>
                <td className="px-6 py-4 text-sm text-gray-700">Typically up to 90 days</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">Valid for duration of stay</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Onward Travel</td>
                <td className="px-6 py-4 text-sm text-gray-700">Required</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Funds</td>
                <td className="px-6 py-4 text-sm text-gray-700">Required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="evisa" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Japan eVisa for Indian Citizens</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Japan operates an official <strong>eVisa system</strong> for short-term tourism that eligible Indian citizens can use. The eVisa is a fully online process, removing the need to visit an embassy or consulate in many cases. Learn more about how eVisas work in our{' '}
          <Link href="/visa-guides/travel-visa-rules#evisa" className="text-teal-600 hover:text-teal-700 font-medium underline">
            eVisa guide
          </Link>.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Facts About Japan eVisa</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Application:</span>
              <span>Submitted entirely online through Japan's official eVisa portal — no embassy visit required for eligible applicants.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Entry Type:</span>
              <span>Typically single-entry, valid for tourism purposes only.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Eligible Purposes:</span>
              <span>Tourism only. Business, study, and work travel require a traditional sticker visa.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Processing:</span>
              <span>Processing times vary. Apply well in advance of your intended travel date.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">At the Border:</span>
              <span>You must present your eVisa approval document at check-in and upon arrival in Japan.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          For a full breakdown of Japan's entry requirements for all nationalities, visit our{' '}
          <Link href="/visa-guides/country-entry-requirements/japan-2026" className="text-teal-600 hover:text-teal-700 font-medium underline">
            Japan Entry Requirements 2026
          </Link>{' '}
          guide.
        </p>
      </section>

      <section id="sticker-visa" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Is a Sticker Visa Required?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Japan eVisa is only available for short-term tourism. A traditional sticker visa — obtained from a Japanese Embassy or Consulate or an authorised visa application centre — is required if you intend to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li><strong>Work in Japan</strong> — any form of employment requires an appropriate work visa category</li>
          <li><strong>Study in Japan</strong> — a student visa is required for any course of study regardless of duration</li>
          <li><strong>Journalism or media activities</strong> — a specific visa category applies</li>
          <li><strong>Long-term stays</strong> — stays beyond the tourist visa limit require a long-term residence visa</li>
          <li><strong>Family reunification</strong> — a dependent or spouse visa is required to join family members resident in Japan</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-4">
          Traditional sticker visa applications for Indian citizens are typically submitted through:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>The <strong>Embassy of Japan in New Delhi</strong></li>
          <li>Japanese Consulates in Mumbai, Chennai, Kolkata, or Bengaluru</li>
          <li>Authorised visa application centres in major Indian cities</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          For guidance on determining whether you need a visa, visit the{' '}
          <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">
            Do I Need a Visa? hub
          </Link>.
        </p>
      </section>

      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required for Indian Applicants</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The following documents are typically required when applying for a Japan tourist visa from India:
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Valid Passport:</span>
              <span>
                Must be valid for the full duration of your intended stay in Japan. Read more about{' '}
                <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  passport validity rules
                </Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Completed Application Form:</span>
              <span>Signed visa application form for the relevant visa category (available from the Japanese Embassy or eVisa portal).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Passport-Size Photograph:</span>
              <span>Recent photograph meeting Japan's biometric photo specifications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Flight Itinerary:</span>
              <span>
                Confirmed round-trip or onward flight booking. See our guide on{' '}
                <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  onward travel requirements
                </Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Proof of Accommodation:</span>
              <span>Hotel bookings, rental agreements, or a letter of invitation from a host in Japan for the entire duration of your stay.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Bank Statements:</span>
              <span>
                Recent statements demonstrating sufficient funds to cover all expenses during your stay. Read more about{' '}
                <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  proof of funds requirements
                </Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Employment or Business Documents:</span>
              <span>Employer letter, business registration documents, or income tax returns confirming your ties to India and your intention to return.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Document requirements can vary depending on the visa category and the specific Japanese consulate handling your application. Always check the latest requirements on the official Embassy of Japan or eVisa portal before submitting.
        </p>
      </section>

      <section id="processing-time" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Processing Time</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Japan visa processing for Indian applicants typically takes <strong>5 to 10 working days</strong> from the date the complete application is received. Processing times can vary depending on application volume, the time of year, and the specific consulate.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline Guidance</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Standard Processing:</span>
              <span>5 to 10 working days for most tourism applications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Recommended Lead Time:</span>
              <span>Apply at least 2 to 3 weeks before your intended departure date to allow for standard processing and any delays.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Peak Season:</span>
              <span>Processing may take longer during popular travel periods such as cherry blossom season (March–April) and autumn (October–November). Apply earlier during these periods.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Earliest Application:</span>
              <span>Applications can typically be submitted up to 3 months before your intended travel date.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Do not purchase non-refundable flights or accommodation until your visa has been approved. Flexible or refundable bookings are strongly recommended while your application is pending.
        </p>
      </section>

      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Japan</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Overstaying your authorised period of stay in Japan is a serious immigration offence with significant consequences for future travel to Japan.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consequences of Overstaying</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Fines:</span>
              <span>Japanese immigration authorities may impose financial penalties for overstaying, calculated based on the number of days exceeded.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Deportation:</span>
              <span>Individuals found to be in Japan without valid status may be detained and deported at their own expense.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Entry Bans:</span>
              <span>Deportation typically results in a multi-year ban from re-entering Japan. The length of the ban depends on the severity of the overstay.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Future Visa Refusals:</span>
              <span>An overstay record significantly reduces the likelihood of future Japanese visa applications being approved, and can also affect visa applications for other countries.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Always keep track of the departure date stamped in your passport and depart Japan on or before that date. If you need to extend your stay, contact the nearest regional immigration bureau in Japan before your current status expires.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Visa Checks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/visa-guides/do-chinese-citizens-need-visa-for-france-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              Do Chinese Citizens Need a Visa for France?
            </h3>
            <p className="text-sm text-gray-600">
              Schengen visa requirements for Chinese passport holders travelling to France.
            </p>
          </Link>
          <Link
            href="/visa-guides/country-entry-requirements/japan-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              Japan Entry Requirements 2026
            </h3>
            <p className="text-sm text-gray-600">
              Full entry requirements for all nationalities travelling to Japan.
            </p>
          </Link>
          <Link
            href="/visa-guides/do-us-citizens-need-visa-for-thailand-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              Do US Citizens Need a Visa for Thailand?
            </h3>
            <p className="text-sm text-gray-600">
              Visa-free entry rules for US passport holders travelling to Thailand.
            </p>
          </Link>
          <Link
            href="/trip"
            className="group block p-5 bg-teal-50 border border-teal-200 rounded-lg hover:border-teal-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-teal-800 group-hover:text-teal-900 transition-colors mb-1">
              Trip Visa Finder Tool
            </h3>
            <p className="text-sm text-teal-700">
              Plan a multi-destination trip and check visa requirements for your entire itinerary at once.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}

function ChineseToFranceContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">Yes</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Type</td>
                <td className="px-6 py-4 text-sm text-gray-700">Schengen Short-Stay Visa (Type C)</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay</td>
                <td className="px-6 py-4 text-sm text-gray-700">90 days within any 180-day period</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">eVisa Available</td>
                <td className="px-6 py-4 text-sm text-gray-700">No</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa on Arrival</td>
                <td className="px-6 py-4 text-sm text-gray-700">No</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">At least 3 months beyond intended departure from Schengen</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Travel Insurance Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">Yes — minimum €30,000 coverage</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Onward Travel</td>
                <td className="px-6 py-4 text-sm text-gray-700">Required</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Funds</td>
                <td className="px-6 py-4 text-sm text-gray-700">Required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="schengen-visa" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is the Schengen Visa for France?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          France is a founding member of the <strong>Schengen Area</strong> — a zone of 27 European countries that have abolished internal border controls. A Schengen short-stay visa (Type C) allows Chinese citizens to travel freely across all participating countries, including Germany, Spain, Italy, and others, for up to <strong>90 days within any 180-day period</strong>.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The 90/180 rule is calculated on a rolling basis across the entire Schengen Area — not per country. Days spent in any Schengen state count toward your total allowance. You can check your remaining days using our{' '}
          <Link href="/tools/schengen-calculator" className="text-teal-600 hover:text-teal-700 font-medium underline">
            Schengen Calculator
          </Link>.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Applications are submitted through:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>
            <strong>France-Visas official portal</strong> — the primary online platform for preparing and submitting your application
          </li>
          <li>
            <strong>Authorised visa application centres in China</strong> — TLScontact or VFS Global centres in major Chinese cities handle biometric collection and document submission
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          For full entry requirements including what is checked at the French border, see{' '}
          <Link href="/visa-guides/country-entry-requirements/france-2026" className="text-teal-600 hover:text-teal-700 font-medium underline">
            France Entry Requirements 2026
          </Link>. Learn about visa types and the Schengen rules in detail at our{' '}
          <Link href="/visa-guides/travel-visa-rules" className="text-teal-600 hover:text-teal-700 font-medium underline">
            Travel Visa Rules guide
          </Link>.
        </p>
      </section>

      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required for Chinese Applicants</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The following documents are required when applying for a French Schengen visa from China:
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Valid Passport:</span>
              <span>
                Must have been issued within the last 10 years, contain at least 2 blank pages, and be valid for at least 3 months beyond your intended departure from the Schengen Area. Read more about{' '}
                <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  passport validity rules
                </Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Schengen Application Form:</span>
              <span>Completed and signed application form, available through the France-Visas portal.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Passport-Sized Photos:</span>
              <span>Recent photos meeting Schengen biometric photo standards (35mm x 45mm, white background).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Travel Medical Insurance:</span>
              <span>Policy covering the entire Schengen Area for the full duration of your trip, with minimum coverage of €30,000 for medical emergencies and repatriation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Flight Reservation:</span>
              <span>
                Confirmed round-trip or onward flight booking. See our guide on{' '}
                <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  onward travel requirements
                </Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Proof of Accommodation:</span>
              <span>Hotel booking confirmations, rental agreements, or a letter of invitation from a host in France for the entire duration of your stay.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Proof of Financial Means:</span>
              <span>
                Bank statements from the last 3 months showing sufficient funds to cover your stay. Read more about{' '}
                <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  proof of funds requirements
                </Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Employment or Student Documents:</span>
              <span>Employment contract, employer letter, or enrollment certificate confirming your ties to China and your intention to return.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Biometric data (fingerprints and photograph) will be collected at the visa application centre. Children under 12 are exempt from fingerprinting. Previously enrolled biometrics may be reused within a 59-month window.
        </p>
      </section>

      <section id="processing-time" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Processing Time</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The standard processing time for a France Schengen visa application is <strong>15 calendar days</strong> from the date the application is received by the consulate. In practice, processing often takes less time, but delays can occur during peak travel seasons.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline Guidance</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Earliest Application:</span>
              <span>Applications can be submitted up to 6 months before your intended travel date.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Recommended Lead Time:</span>
              <span>Apply at least 3 to 4 weeks before departure to allow for standard processing and any delays.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Peak Season Delays:</span>
              <span>Processing can extend beyond 15 days during summer (June–August) and major European holidays. Apply earlier during these periods.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">Maximum Processing:</span>
              <span>In exceptional circumstances, processing may take up to 30 days, or 60 days for cases requiring further examination.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Do not book non-refundable travel until your visa has been approved. It is advisable to book refundable or flexible flight and accommodation options while your application is pending.
        </p>
      </section>

      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in France</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Overstaying your Schengen visa in France is a serious immigration violation. Penalties apply not just in France but across the entire Schengen Area.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consequences of Overstaying</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Monetary Fines:</span>
              <span>French authorities may impose fines for overstaying, calculated based on the number of days exceeded.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Schengen-Wide Entry Ban:</span>
              <span>An overstay can result in a ban from entering all 27 Schengen member states, not just France. This is recorded in the Schengen Information System (SIS).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Future Visa Refusals:</span>
              <span>A record of overstay significantly increases the likelihood of future Schengen visa applications being refused, including for other European countries.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[220px]">Possible Deportation:</span>
              <span>Authorities may detain and deport individuals found to be in France illegally, which compounds the entry ban and creates a long-term record in European immigration systems.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Always monitor your remaining Schengen days carefully. Use our{' '}
          <Link href="/tools/schengen-calculator" className="text-teal-600 hover:text-teal-700 font-medium underline">
            Schengen Calculator
          </Link>{' '}
          to track your 90/180 day allowance across all Schengen countries.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Visa Checks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/visa-guides/do-us-citizens-need-visa-for-thailand-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              Do US Citizens Need a Visa for Thailand?
            </h3>
            <p className="text-sm text-gray-600">
              Check visa-free entry rules for US passport holders travelling to Thailand.
            </p>
          </Link>
          <Link
            href="/visa-guides/do-uk-citizens-need-visa-for-usa-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              Do UK Citizens Need a Visa for the USA?
            </h3>
            <p className="text-sm text-gray-600">
              ESTA requirements and Visa Waiver Program rules for British passport holders.
            </p>
          </Link>
          <Link
            href="/visa-guides/country-entry-requirements/france-2026"
            className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
              France Entry Requirements 2026
            </h3>
            <p className="text-sm text-gray-600">
              Full entry requirements for all nationalities travelling to France.
            </p>
          </Link>
          <Link
            href="/trip"
            className="group block p-5 bg-teal-50 border border-teal-200 rounded-lg hover:border-teal-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-teal-800 group-hover:text-teal-900 transition-colors mb-1">
              Trip Visa Finder Tool
            </h3>
            <p className="text-sm text-teal-700">
              Plan a multi-destination trip and check visa requirements for your entire itinerary at once.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}

function UKToUSAContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">No (for tourism/business under 90 days)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay (Visa Waiver Program)</td>
                <td className="px-6 py-4 text-sm text-gray-700">90 days per visit</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">ESTA Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">Yes — mandatory before boarding</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa on Arrival</td>
                <td className="px-6 py-4 text-sm text-gray-700">No</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity Required</td>
                <td className="px-6 py-4 text-sm text-gray-700">Valid for duration of stay</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Onward Travel</td>
                <td className="px-6 py-4 text-sm text-gray-700">Required</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Funds</td>
                <td className="px-6 py-4 text-sm text-gray-700">May be requested</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Biometrics</td>
                <td className="px-6 py-4 text-sm text-gray-700">Taken at entry (fingerprints and photograph)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 leading-relaxed">
          UK citizens entering the US must hold a valid biometric (ePassport) to travel under the VWP. Older non-biometric passports require a B1/B2 visa regardless of nationality.
        </p>
      </section>

      <section id="what-is-vwp" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is the US Visa Waiver Program (VWP)?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Visa Waiver Program allows citizens of 42 designated countries — including the United Kingdom — to travel to the United States for tourism, business, or transit for up to 90 days without obtaining a visa. To travel under the VWP, UK citizens must apply for and receive approval through <strong>ESTA (Electronic System for Travel Authorization)</strong> before departure.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>Apply online at the official US DHS ESTA portal</li>
          <li>Most applications are approved within minutes; allow at least 72 hours before travel as a precaution</li>
          <li>ESTA is typically valid for <strong>2 years</strong> from the date of approval, or until your passport expires — whichever comes first</li>
          <li>Allows <strong>multiple entries</strong> to the United States during the 2-year validity period</li>
          <li>Each visit is still limited to <strong>90 days</strong> — the 2-year validity does not mean 2 years of continuous stay</li>
          <li>The current ESTA application fee is USD 21</li>
        </ul>
      </section>

      <section id="when-visa-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Do UK Citizens Need a US Visa?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Even though the UK is a VWP country, there are several situations where a UK citizen must apply for a US visa rather than using ESTA. You need a visa if you intend to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li><strong>Stay longer than 90 days</strong> — you will need a B1/B2 tourist or business visa</li>
          <li><strong>Study</strong> — an F-1 or M-1 student visa is required for any course of study</li>
          <li><strong>Work</strong> — an appropriate work visa (H-1B, L-1, O-1, etc.) is required before you can be employed by a US employer</li>
          <li><strong>Immigrate or seek permanent residence</strong> — an immigrant visa is required; VWP expressly prohibits travel with intent to immigrate</li>
          <li><strong>You have previously been denied a US visa or entry</strong> — ESTA ineligibility applies, and you must apply at a consulate</li>
          <li><strong>You have visited Cuba, Iran, Iraq, Libya, North Korea, Somalia, Sudan, Syria, or Yemen on or after certain dates</strong> — ESTA ineligibility applies</li>
        </ul>
      </section>

      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mandatory Documents</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Valid UK Passport:</span>
              <span>Must be a biometric ePassport and valid for at least the duration of your intended stay.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Approved ESTA:</span>
              <span>Your ESTA approval is linked to your passport electronically; you do not need to print a copy, but keep your confirmation number accessible.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Return or Onward Ticket:</span>
              <span>Proof of departure from the United States within 90 days is required.</span>
            </li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">May Be Requested</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Proof of Accommodation:</span>
              <span>Hotel booking confirmation, rental agreement, or address of where you will be staying.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[180px]">Proof of Funds:</span>
              <span>Bank statements or credit card details showing you can support yourself during your stay.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in the United States</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Overstaying your authorised period of admission in the United States is a serious immigration violation with long-lasting consequences.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consequences of Overstaying</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">ESTA Permanently Voided:</span>
              <span>Any overstay — even by a single day — permanently voids your ESTA eligibility. You cannot use the Visa Waiver Program again.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">3-Year Entry Bar:</span>
              <span>Overstays of 180 days or more (but less than 1 year) trigger a 3-year bar on re-entry after departure.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[200px]">10-Year Entry Bar:</span>
              <span>Overstays of 1 year or more trigger a 10-year bar on re-entry after departure.</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Always track your I-94 arrival/departure record and ensure you depart before or on your authorised period of admission — typically 90 days for VWP travellers.
        </p>
      </section>
    </>
  );
}

function ArticleContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Visa Requirement Summary
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                  Requirement
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Visa Required
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  No (for stays up to 60 days)
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Maximum Stay
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  60 days per entry
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Passport Validity
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  At least 6 months beyond departure date
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Onward Ticket
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Required (departure within 60 days)
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Proof of Funds
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  May be requested (20,000 baht per person)
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Extension Possible
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Yes, one 30-day extension available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          US citizens can enter Thailand under the{' '}
          <Link
            href="/visa-guides/travel-visa-rules#visa-free"
            className="text-teal-600 hover:text-teal-700 font-medium underline"
          >
            visa-free
          </Link>{' '}
          exemption scheme for tourism or business purposes only. Business purposes include
          attending meetings, conferences, or seminars, but do not include any form of
          employment or work.
        </p>
      </section>

      <section id="stay-duration" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How Long Can US Citizens Stay in Thailand?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          US citizens benefit from Thailand&apos;s{' '}
          <Link
            href="/visa-guides/travel-visa-rules#visa-free"
            className="text-teal-600 hover:text-teal-700 font-medium underline"
          >
            visa-free
          </Link>{' '}
          exemption scheme, which allows stays of up to{' '}
          <strong>60 days per entry</strong>. This policy was updated in 2024,
          extending the previous 30-day limit to encourage tourism.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The 60-day period begins on the day you enter Thailand and includes both
          the arrival and departure days. If you wish to stay longer, you have two
          options:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
          <li>
            <strong>Extension at Immigration:</strong> Visit a Thai immigration office
            before your 60 days expire to apply for a one-time 30-day extension. The
            fee is 1,900 baht, and you&apos;ll need to provide a passport photo, copies
            of your passport and entry stamp, and proof of accommodation.
          </li>
          <li>
            <strong>Border Run:</strong> Exit Thailand and re-enter to receive another
            60-day stamp. However, frequent border runs may attract scrutiny from
            immigration officers who may question your intentions.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Note that there is no official limit on the number of times you can enter
          Thailand visa-free by air, but land border entries may be limited to two
          per calendar year at the discretion of immigration officers.
        </p>
      </section>

      <section id="when-visa-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          When Is a Visa Required?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          While most US tourists can enter Thailand under the{' '}
          <Link
            href="/visa-guides/travel-visa-rules#visa-free"
            className="text-teal-600 hover:text-teal-700 font-medium underline"
          >
            visa-free
          </Link>{' '}
          scheme, you will need to apply for an appropriate{' '}
          <Link
            href="/visa-guides/travel-visa-rules#visa-required"
            className="text-teal-600 hover:text-teal-700 font-medium underline"
          >
            visa
          </Link>{' '}
          in advance if you plan to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>
            <strong>Stay longer than 60 days:</strong> Apply for a Tourist Visa (TR),
            which allows stays of up to 60 days with the possibility of a 30-day extension
          </li>
          <li>
            <strong>Work or teach:</strong> Obtain a Non-Immigrant B Visa and work permit
            before starting employment
          </li>
          <li>
            <strong>Study:</strong> Apply for a Non-Immigrant ED Visa for education purposes
          </li>
          <li>
            <strong>Volunteer:</strong> Secure a Non-Immigrant O Visa for volunteering activities
          </li>
          <li>
            <strong>Retire in Thailand:</strong> Apply for a Non-Immigrant O-A (retirement)
            Visa if you&apos;re over 50
          </li>
          <li>
            <strong>Conduct business activities beyond meetings:</strong> Obtain a
            Non-Immigrant B Visa
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          All visa applications must be submitted to the Royal Thai Embassy or Consulate
          with jurisdiction over your place of residence in the US. Processing times
          typically range from 3-5 business days, though this can vary.
        </p>
      </section>

      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Documents Required at Entry
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          When entering Thailand on the visa exemption scheme, you should have the
          following documents ready:
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Essential Documents:
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">Valid Passport:</span>
              <span>
                Must be valid for at least{' '}
                <Link
                  href="/visa-guides/travel-visa-rules#passport-validity"
                  className="text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  6 months beyond your planned departure date
                </Link>{' '}
                from Thailand
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">Onward Ticket:</span>
              <span>
                <Link
                  href="/visa-guides/travel-visa-rules#onward-travel"
                  className="text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  Proof of departure
                </Link>{' '}
                from Thailand within 60 days (airline ticket, bus ticket, etc.)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">Proof of Funds:</span>
              <span>
                Ability to show{' '}
                <Link
                  href="/visa-guides/travel-visa-rules#proof-of-funds"
                  className="text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  20,000 baht per person or 40,000 baht per family
                </Link>{' '}
                (rarely requested but required by law)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">Accommodation:</span>
              <span>
                Hotel booking or address where you&apos;ll be staying (may be requested)
              </span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          While immigration officers rarely ask to see proof of funds or accommodation,
          they are legally entitled to do so. It&apos;s advisable to have these documents
          accessible, especially if you have a history of long stays in Thailand or
          appear to be staying long-term.
        </p>
      </section>

      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Overstay Penalties
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Overstaying your permitted time in Thailand is a serious violation of
          immigration law. The penalties are as follows:
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Penalty Structure:
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">Fine:</span>
              <span>500 baht per day of overstay, maximum 20,000 baht</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">1-90 days:</span>
              <span>Fine only, no entry ban if you leave voluntarily</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">Over 90 days:</span>
              <span>1-year entry ban</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">1-3 years:</span>
              <span>3-year entry ban</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">3-5 years:</span>
              <span>5-year entry ban</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold min-w-[140px]">Over 5 years:</span>
              <span>10-year entry ban</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re arrested for overstaying rather than presenting yourself
          voluntarily at immigration, you may face deportation, detention, and
          potentially harsher penalties including longer entry bans.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Important:</strong> Always keep track of your entry stamp date and
          departure date. Set reminders well before your 60 days expire to either
          leave Thailand or visit an immigration office for an extension. Overstaying
          even by one day can cause complications for future travel.
        </p>
      </section>
    </>
  );
}

function AustraliansToUKContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">No — but UK ETA is required</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">ETA Required</td><td className="px-6 py-4 text-sm text-gray-700">Yes — must apply online before travel (£10 fee)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay</td><td className="px-6 py-4 text-sm text-gray-700">6 months per visit</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">ETA Validity</td><td className="px-6 py-4 text-sm text-gray-700">2 years or until passport expires (multiple entries)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Must be valid for duration of stay</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Work Rights</td><td className="px-6 py-4 text-sm text-gray-700">Not permitted on ETA — requires separate visa</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Australian citizens do not need a traditional visa to visit the United Kingdom. However, since January 2024, a UK Electronic Travel Authorisation (ETA) has been required before departure. The ETA is a digital pre-clearance linked to your passport — it is not a visa stamp. It must be obtained in advance via the UK government&apos;s official ETA app or website.
        </p>
      </section>

      <section id="uk-eta" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">UK Electronic Travel Authorisation (ETA)</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The UK ETA replaced the previous visa-free arrangement for eligible nationalities including Australia. It was introduced as part of the UK&apos;s post-Brexit border control modernisation.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key ETA Facts:</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Cost:</span><span>£10 per person</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Processing:</span><span>Usually within hours, can take up to 3 business days</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Validity:</span><span>2 years or until your passport expires (whichever comes first)</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Entries:</span><span>Multiple trips allowed within the validity period</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Application:</span><span>UK ETA app (iOS/Android) or gov.uk website</span></li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Apply for your ETA well before travel. Airlines and carriers are required to check for ETA approval before boarding. Passengers without an approved ETA may be denied boarding.
        </p>
      </section>

      <section id="when-visa-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Do Australians Need a UK Visa?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The ETA covers tourism, visiting family and friends, short business trips, and transit. An ETA is not sufficient if you plan to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li><strong>Work in the UK:</strong> A Skilled Worker Visa or Youth Mobility Scheme visa is required</li>
          <li><strong>Study for more than 6 months:</strong> A Student Visa is needed for longer academic courses</li>
          <li><strong>Stay longer than 6 months:</strong> You must apply for the appropriate visa category</li>
          <li><strong>Settle permanently:</strong> An Indefinite Leave to Remain application is required</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Australia and the UK have a Youth Mobility Scheme (Working Holiday) arrangement. Australians aged 18–30 (or 35 in some cases) can apply for a Youth Mobility visa allowing up to 2 years in the UK with the right to work.
        </p>
      </section>

      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Essential Documents:</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Valid Passport:</span><span>Must be valid for the full duration of your stay; no additional validity margin required</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Approved UK ETA:</span><span>Linked digitally to your passport; border force can verify electronically</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Return Ticket:</span><span>Proof of onward or return travel from the UK may be requested</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Proof of Funds:</span><span>Evidence you can support yourself financially during your stay</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Accommodation:</span><span>Address where you will be staying in the UK</span></li>
          </ul>
        </div>
      </section>

      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Overstaying your permitted time in the UK is a serious immigration offence:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>You may be detained by UK Border Force</li>
          <li>Deportation at your own expense</li>
          <li>A re-entry ban of up to 10 years</li>
          <li>Future UK visa or ETA applications may be refused</li>
          <li>Any outstanding taxes, NHS charges, or penalties must be paid before re-entry</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          If your circumstances change and you need to stay longer than permitted, you must apply to extend your leave before your current permission expires. Overstaying even one day is recorded and can affect future travel to the UK and other countries.
        </p>
      </section>
    </>
  );
}

function CanadiansToJapanContent() {
  return (
    <>
      <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td><td className="px-6 py-4 text-sm text-gray-700">No — visa-free for tourism and short business</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay</td><td className="px-6 py-4 text-sm text-gray-700">90 days per visit</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">eVisa / ETA</td><td className="px-6 py-4 text-sm text-gray-700">Not required for Canadian citizens</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity</td><td className="px-6 py-4 text-sm text-gray-700">Must be valid for duration of stay; 6 months recommended</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Work Rights</td><td className="px-6 py-4 text-sm text-gray-700">Not permitted on visa-free entry</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Entry Basis</td><td className="px-6 py-4 text-sm text-gray-700">Bilateral visa exemption agreement</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Canadian passport holders can enter Japan without a visa for short stays of up to 90 days. The visa exemption covers tourism, sightseeing, visiting family or friends, and short business activities such as attending meetings or conferences. No advance application or eVisa is required.
        </p>
      </section>

      <section id="visa-exemption" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Japan Visa Exemption for Canadians</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Canada and Japan maintain a bilateral visa exemption agreement, allowing Canadian citizens to enter Japan without a visa for up to 90 days. This arrangement has been in place since 1964 and covers tourist and short business travel.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What the Exemption Covers:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">✓</span><span>Tourism and sightseeing</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">✓</span><span>Visiting family and friends</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">✓</span><span>Attending business meetings, conferences, and trade fairs</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">✓</span><span>Short-term cultural exchange activities</span></li>
            <li className="flex items-start gap-2"><span className="text-red-600 font-bold mt-0.5">✗</span><span>Working for a Japanese employer (requires work visa)</span></li>
            <li className="flex items-start gap-2"><span className="text-red-600 font-bold mt-0.5">✗</span><span>Enrolling in academic programs longer than 90 days</span></li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          The 90-day limit is per entry, not per year. However, immigration officers may scrutinize repeated long stays or patterns that suggest you are living in Japan without proper immigration status.
        </p>
      </section>

      <section id="documents-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Documents Required at Entry</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Essential Documents:</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Valid Passport:</span><span>Must be valid for at least 6 months beyond your intended departure from Japan; no special validity margin legally required but recommended</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Return/Onward Ticket:</span><span>Proof of departure from Japan within 90 days — airline ticket or other transportation</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Proof of Funds:</span><span>Sufficient funds to support your stay (rarely checked but legally required)</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Accommodation:</span><span>Hotel bookings or address of host — may be requested at immigration</span></li>
            <li className="flex items-start gap-3"><span className="font-semibold min-w-[160px]">Arrival Card:</span><span>Completed disembarkation card (provided on the flight or at the airport)</span></li>
          </ul>
        </div>
      </section>

      <section id="when-visa-required" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When Is a Visa Required?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Canadian citizens will need to apply for a Japanese visa in advance if they plan to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li><strong>Work in Japan:</strong> Requires a work visa (Engineer/Specialist in Humanities, Instructor, etc.) obtained before travel</li>
          <li><strong>Study long-term:</strong> Language school or university enrollment for more than 90 days requires a Student Visa</li>
          <li><strong>Stay longer than 90 days:</strong> Any stay beyond 90 days requires an appropriate long-stay visa</li>
          <li><strong>Work Holiday:</strong> Canadians aged 18–30 can apply for a Working Holiday Visa allowing 1 year in Japan with work rights</li>
        </ul>
      </section>

      <section id="overstay-penalties" className="mb-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Overstaying in Japan is treated as a serious immigration violation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>Detention at an immigration detention facility</li>
          <li>Deportation at your own expense</li>
          <li>A re-entry ban of at least 1 year; bans of 5 or 10 years are common for longer overstays</li>
          <li>Permanent record in Japanese immigration systems</li>
          <li>Future Japanese visa applications may be refused</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Japan&apos;s immigration authorities take overstays very seriously. Always leave before your stamped departure date. If you need to extend your stay for an emergency, contact the nearest regional immigration services bureau before your permitted stay expires.
        </p>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articles[params.slug];

  if (!article) {
    return { title: 'Not Found' };
  }

  const pageUrl = canonicalUrl(`/visa-guides/${params.slug}`);

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: pageUrl,
      images: [{
        url: canonicalUrl('/og/legal-og'),
        width: 1200,
        height: 630,
        alt: article.title,
      }],
      siteName: 'VisaInfoGuide',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [canonicalUrl('/og/legal-og')],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function VisaGuideArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: article.title, url: `/visa-guides/${params.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(article.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': article.title,
            'description': article.description,
            'datePublished': '2026-02-21',
            'dateModified': '2026-02-21',
            'author': {
              '@type': 'Organization',
              'name': 'VisaInfoGuide',
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'VisaInfoGuide',
              'logo': {
                '@type': 'ImageObject',
                'url': canonicalUrl('/visa.png'),
              },
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <BackNavigation fallbackUrl="/visa-guides" label="Back" />
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: article.title, url: `/visa-guides/${params.slug}` },
            ]}
          />

          <article className="mt-8">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {article.h1}
              </h1>
              <LastReviewed date={article.lastReviewed} />
            </header>

            <SummaryBlock>
              <p className="text-base leading-relaxed">{article.summary}</p>
            </SummaryBlock>

            <TableOfContents items={article.tableOfContents} />

            <div className="prose prose-lg max-w-none">
              {article.content}
            </div>

            <FAQBlock faqs={article.faqs} />

            <InternalLinksBlock
              contentType={article.contentType}
              passportCountry={article.passportCountry}
              destinationCountry={article.destinationCountry}
              passportSlug={article.passportSlug}
              destinationSlug={article.destinationSlug}
            />

            <SourcesBlock sources={article.sources} />
          </article>
        </div>
      </div>
    </>
  );
}
