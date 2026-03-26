import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Header from '@/components/header/Header';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import Link from 'next/link';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['700'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  metadataBase: new URL('https://visainfoguide.com'),
  title: 'VisaInfoGuide.com - Check Visa Requirements',
  description: 'Plan your multi-destination trip and check visa requirements for passport holders worldwide.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = organizationJsonLd();
  const websiteSchema = websiteJsonLd();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable}`}>
        <Header />
        {children}
        <footer className="bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-5 gap-8 mb-8">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">About VisaInfoGuide</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Independent visa requirements database for international travelers.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/methodology" className="hover:text-white transition-colors">
                      Methodology
                    </Link>
                  </li>
                  <li>
                    <Link href="/data-sources" className="hover:text-white transition-colors">
                      Data Sources
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/tools/schengen-calculator" className="hover:text-white transition-colors">
                      Schengen Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/compare" className="hover:text-white transition-colors">
                      Compare Passports
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools" className="hover:text-white transition-colors">
                      All Tools
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Research</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/research/most-powerful-passports-2026" className="hover:text-white transition-colors">
                      Passport Rankings 2026
                    </Link>
                  </li>
                  <li>
                    <Link href="/research/passport-validity-rules-by-country" className="hover:text-white transition-colors">
                      Passport Validity Rules
                    </Link>
                  </li>
                  <li>
                    <Link href="/research/schengen-90-180-rule-explained" className="hover:text-white transition-colors">
                      Schengen 90/180 Rule
                    </Link>
                  </li>
                  <li>
                    <Link href="/research/onward-ticket-requirements-by-country" className="hover:text-white transition-colors">
                      Onward Ticket Requirements
                    </Link>
                  </li>
                  <li>
                    <Link href="/research/visa-free-vs-visa-on-arrival-vs-evisa" className="hover:text-white transition-colors">
                      Visa-Free vs VOA vs eVisa
                    </Link>
                  </li>
                  <li>
                    <Link href="/research/best-passports-for-visa-free-travel-in-asia-2026" className="hover:text-white transition-colors">
                      Best Passports for Asia 2026
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="hover:text-white transition-colors">
                      All Research
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/travel-planning-resources" className="hover:text-white transition-colors">
                      Travel Planning Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools" className="hover:text-white transition-colors">
                      Travel Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/airport-transit-hotels" className="hover:text-white transition-colors">
                      Airport Transit Hotels
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="hover:text-white transition-colors">
                      Visa Research
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/privacy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white transition-colors">
                      Terms of Use
                    </Link>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  Not affiliated with any government agency. Information for guidance only.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 mb-8">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Travel Resource Network</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <a
                  href="https://www.immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-500"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-md bg-blue-900 flex items-center justify-center mt-0.5">
                    <svg className="w-4.5 h-4.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold group-hover:text-blue-300 transition-colors">ImmigrationInfoGuide.com</p>
                    <p className="text-gray-400 text-xs leading-relaxed mt-0.5">Work visas, residency pathways, family reunification, and permanent residence guides for 100+ countries.</p>
                  </div>
                </a>
                <a
                  href="https://www.restinairport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-500"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-md bg-teal-900 flex items-center justify-center mt-0.5">
                    <svg className="w-4.5 h-4.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold group-hover:text-teal-300 transition-colors">RestInAirport.com</p>
                    <p className="text-gray-400 text-xs leading-relaxed mt-0.5">Airport transit hotels, airside rest options, and layover accommodation guides for 200+ international airports.</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} VisaInfoGuide. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="mailto:contact@visainfoguide.com" className="hover:text-white transition-colors">
                  contact@visainfoguide.com
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61588451791453"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow VisaInfoGuide on Facebook"
                  className="hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
