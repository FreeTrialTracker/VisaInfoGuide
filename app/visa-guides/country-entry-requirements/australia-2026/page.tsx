import { Metadata } from 'next';
import Link from 'next/link';
import { Globe, CheckCircle, XCircle, FileText, ArrowRight, Clock, AlertTriangle, Shield, Wallet, Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd } from '@/lib/seo-links';

const LAST_UPDATED = '2026-02-21';

export const metadata: Metadata = {
  title: 'Australia Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete Australia entry requirements for 2026. Learn about the ETA (subclass 601), eVisitor (subclass 651), and Visitor Visa (subclass 600). Required documents, stay duration, and overstay penalties.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/australia-2026'),
  },
  openGraph: {
    title: 'Australia Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete Australia entry requirements for 2026. Learn about the ETA (subclass 601), eVisitor (subclass 651), and Visitor Visa (subclass 600). Required documents, stay duration, and overstay penalties.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/australia-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Australia Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australia Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete Australia entry requirements for 2026. ETA, eVisitor, Visitor Visa requirements, documents, and overstay rules.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for Australia?',
    answer: 'US citizens do not need a traditional visa but must obtain an Electronic Travel Authority (ETA, subclass 601) before traveling to Australia. The ETA costs AUD $20, is applied for online or via the Australian ETA app, and is typically approved within minutes. It allows multiple visits of up to 3 months per stay within a 12-month period.',
  },
  {
    question: 'Do UK citizens need an ETA for Australia?',
    answer: 'UK citizens are eligible for the eVisitor visa (subclass 651), not the ETA. The eVisitor is free to apply for online and allows multiple entries with stays of up to 3 months per visit within a 12-month period. UK citizens should apply through the Australian Department of Home Affairs website before travel.',
  },
  {
    question: 'What is the difference between the ETA and eVisitor for Australia?',
    answer: 'Both the ETA (subclass 601) and eVisitor (subclass 651) are free of charge electronic travel authorizations that allow multiple entries with 3-month stays, but they are available to different passport holders. The ETA is for travelers from 34 countries including the US, Canada, Japan, South Korea, Singapore, and Hong Kong, and costs AUD $20. The eVisitor is for EU member state citizens and select other European nationalities, and is free to apply for. Both are linked electronically to your passport — there is no stamp or label.',
  },
  {
    question: 'How long can I stay in Australia as a tourist?',
    answer: 'With an ETA or eVisitor authorization, you can stay up to 3 months per visit. Both are valid for 12 months from approval or until your passport expires, whichever comes first, and allow multiple entries during that period. If you hold a Visitor Visa (subclass 600), the granted stay may be 3, 6, or 12 months depending on what was applied for and approved.',
  },
  {
    question: 'Can I work remotely in Australia on a tourist visa?',
    answer: 'Australia\'s ETA, eVisitor, and Visitor Visa (subclass 600) are strictly for tourism, recreation, and visiting family or friends — not for work of any kind, including remote work for an overseas employer. Working on a visitor authorization or visa is a serious breach of visa conditions and can result in immediate cancellation, deportation, and future entry bans. If you plan to work remotely during an extended stay, consider applying for a more appropriate visa subclass.',
  },
  {
    question: 'What happens if I overstay in Australia?',
    answer: 'Overstaying in Australia is treated seriously. Your visa or authorization is automatically cancelled the moment you overstay. The Australian Border Force can detain you, and you will be deported at your own expense. Re-entry bans of 3 years or longer are standard. Overstay records are shared internationally and permanently affect future visa applications to Australia and other countries.',
  },
];

export default function AustraliaEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'Australia', url: '/visa-guides/country-entry-requirements/australia-2026' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd({
            headline: 'Australia Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete Australia entry requirements guide including ETA, eVisitor, Visitor Visa, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/australia-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'Australia', url: '/visa-guides/country-entry-requirements/australia-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇦🇺</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Australia Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Australia requires most international travelers to obtain electronic authorization before boarding their flight. Depending on your passport, you will need either an <strong>eVisitor (subclass 651)</strong>, an <strong>ETA (subclass 601)</strong>, or a <strong>Visitor Visa (subclass 600)</strong>. Unlike many destinations, Australia has no traditional visa-free entry — only New Zealand citizens are exempt. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> checker or <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to confirm requirements for your passport.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">ETA</div>
                  <div className="text-sm text-gray-600">eVisitor / ETA / Visa</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">Yes</div>
                  <div className="text-sm text-gray-600">e-Authorization</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">3 mo.</div>
                  <div className="text-sm text-gray-600">Typical Stay</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">Full</div>
                  <div className="text-sm text-gray-600">Passport Validity</div>
                </CardContent>
              </Card>
            </div>
          </header>

          <article className="prose prose-lg max-w-none">

            <section id="visa-free" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter Australia Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Australia does not offer traditional <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free entry</Link> in the way many countries do. The only nationals who can enter without any prior authorization are <strong>New Zealand citizens</strong>, who are covered by the Trans-Tasman Travel Arrangement.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                All other travelers — including citizens of the United States, United Kingdom, Canada, and EU member states — must hold a valid visa or electronic travel authorization before departing for Australia. Airlines will not board passengers without confirmed authorization linked to their passport.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-6">
                <p className="text-gray-800 leading-relaxed">
                  <strong>Important distinction:</strong> Many travelers from ETA and eVisitor-eligible countries colloquially refer to this as "visa-free" travel because the authorization process is quick and inexpensive. However, legally and practically, it is still a required pre-travel authorization. Always apply before booking flights.
                </p>
              </div>
            </section>

            <section id="eta" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is Australia's ETA (Subclass 601)?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Electronic Travel Authority (ETA, subclass 601) is an electronically stored authorization available to passport holders from 34 countries and territories. It is available for tourism, visiting family and friends, and short business visits. To understand how the <Link href="/visa-guides/travel-visa-rules#eta" className="text-teal-600 hover:text-teal-700 font-medium underline">eTA system</Link> works across destinations, see our travel rules guide.
              </p>
              <div className="grid gap-4 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">ETA Eligible Countries</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      ETA-eligible passport holders include travelers from the United States, Canada, Japan, South Korea, Singapore, Hong Kong, Malaysia, Brunei, Taiwan, and several other countries in Asia and the Americas.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">ETA Validity and Stay Duration</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Valid for <strong>12 months</strong> from date of approval or until passport expiry, whichever is sooner</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Allows <strong>multiple entries</strong> during the 12-month validity window</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Maximum stay of <strong>3 months per visit</strong></span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Application fee: <strong>AUD $20</strong></span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Apply via the <strong>Australian ETA app</strong> or authorized travel agents</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <p className="text-gray-700 leading-relaxed">
                ETA approval is typically instant or within a few minutes. The authorization is linked electronically to your passport — there is no physical document or visa label. Airlines check ETA status automatically at check-in.
              </p>
            </section>

            <section id="evisitor" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is the eVisitor Visa (Subclass 651)?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The eVisitor (subclass 651) is a free electronic travel authorization for passport holders from European Union member states and select other European countries including the United Kingdom, Switzerland, Norway, and Iceland.
              </p>
              <div className="grid gap-4 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">eVisitor Eligibility</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Eligible nationalities include all EU member state passport holders (Austria, Belgium, Czech Republic, Denmark, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Netherlands, Poland, Portugal, Spain, Sweden, and others), plus the United Kingdom, Switzerland, Norway, Iceland, and several other European countries.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">eVisitor Stay Rules</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Valid for <strong>12 months</strong> from approval or until passport expiry</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Allows <strong>multiple entries</strong> during validity period</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Maximum stay of <strong>3 months per visit</strong></span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Application fee: <strong>Free</strong></span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span>Apply at the <strong>Australian Department of Home Affairs website</strong></span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Like the ETA, the eVisitor is linked electronically to your passport. Processing is typically instant but can occasionally take up to a few business days. Apply well before your travel date to avoid last-minute issues.
              </p>
            </section>

            <section id="visitor-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs a Visitor Visa (Subclass 600)?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Passport holders from countries not eligible for the ETA or eVisitor must apply for a <strong>Visitor Visa (subclass 600)</strong>. This includes most travelers from Asia, Africa, the Middle East, South America, and elsewhere. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> tool to confirm which authorization applies to your passport.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Visitor Visa (Subclass 600) Key Facts</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2"><FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" /><span>Applications submitted online via the Australian Department of Home Affairs ImmiAccount portal</span></li>
                  <li className="flex items-start gap-2"><FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" /><span>Processing times vary from a few days to several weeks depending on nationality and documentation</span></li>
                  <li className="flex items-start gap-2"><FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" /><span>Stay grants available for 3 months, 6 months, or 12 months depending on circumstances and application</span></li>
                  <li className="flex items-start gap-2"><FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" /><span>Application fee from AUD $190, varying by stream applied for</span></li>
                  <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /><span>Work is not permitted on the tourist stream of the Visitor Visa</span></li>
                </ul>
              </div>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering Australia must meet standard entry requirements regardless of authorization type. Border Force officers can deny entry even with a valid ETA, eVisitor, or visa if requirements are not met.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Your passport must be valid for the entire duration of your stay in Australia. Learn more about <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link>. Your ETA or eVisitor is also tied to your passport — if your passport expires, so does your authorization.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Approved ETA / eVisitor / Visa Grant Notice</h3>
                        <p className="text-gray-700 leading-relaxed">
                          You must hold a confirmed authorization linked to your passport. Airlines verify this at check-in — you may be denied boarding without it. For Visitor Visa (subclass 600) holders, carry your grant letter as confirmation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Wallet className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Funds</h3>
                        <p className="text-gray-700 leading-relaxed">
                          You must demonstrate sufficient <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">proof of funds</Link> to support your stay. Border Force officers may request bank statements, credit card statements, or evidence of sponsorship. A general guideline is AUD $1,000 per month of stay, though no fixed amount is legally mandated.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Plane className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Onward or Return Ticket</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Proof of <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">onward travel</Link> is required. This must be a confirmed flight departing Australia on or before your authorized stay expires. Open-jaw or multi-leg itineraries are acceptable as long as a departure is clearly scheduled.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="stay-duration" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Length of Stay Rules</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Under the ETA or eVisitor, the maximum stay is <strong>3 months per visit</strong>. Both authorizations are valid for 12 months from approval and allow multiple entries — however, each individual stay cannot exceed 3 months. You cannot string together multiple consecutive stays to extend your time in Australia.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Holder of a Visitor Visa (subclass 600) may be granted stays of 3, 6, or 12 months depending on what was applied for and the circumstances of the application. The specific period is indicated on the visa grant notice.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Extensions within Australia are possible in exceptional circumstances but are not routine. Extensions must be applied for before your current authorization expires. Australian immigration does not guarantee approval of extensions, and unauthorized stays are treated as overstays.
                </p>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Australia</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Serious Consequences</h3>
                    <div className="space-y-3 text-gray-800">
                      <p className="leading-relaxed">
                        <strong>Visa cancellation:</strong> Your ETA, eVisitor, or Visitor Visa is automatically cancelled the moment you overstay. You lose your legal right to be in Australia immediately.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Re-entry bans:</strong> Standard overstays result in a minimum 3-year ban from re-entering Australia. Longer or repeated overstays can result in permanent exclusion. These bans are difficult to overturn and require ministerial intervention.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Impact on future applications:</strong> Overstay records are shared with Five Eyes partners (United States, United Kingdom, Canada, New Zealand) and affect visa applications globally. Many countries ask specifically about prior immigration violations, and Australian overstays must be declared.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Never overstay.</strong> If you need more time, apply for a visa extension or a new visa class well before your authorized stay expires.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FAQBlock faqs={faqs} />

            <section id="sources" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sources and Official Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This guide is compiled from official Australian Government immigration sources. Entry requirements can change — always verify current policy before booking travel.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                For details about our research process, see our <Link href="/methodology" className="text-teal-600 hover:text-teal-700 font-medium underline">methodology page</Link>.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Last Reviewed:</strong> {new Date(LAST_UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Official Sources:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Australian Department of Home Affairs — immi.homeaffairs.gov.au</li>
                  <li>• Australian ETA official application portal — eta.homeaffairs.gov.au</li>
                  <li>• eVisitor application portal — immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> Entry requirements can change without notice. Always verify current requirements with official Australian Government sources or your nearest Australian embassy before booking international travel.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Visa Guides</h2>
              <div className="grid gap-4">
                <Link href="/visa-guides/do-i-need-a-visa" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Do I Need a Visa?
                        </h3>
                        <p className="text-sm text-gray-600">
                          Check visa requirements for your specific passport and destination
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/visa-free-countries" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Visa-Free Countries by Passport
                        </h3>
                        <p className="text-sm text-gray-600">
                          Explore all visa-free destinations available with your passport
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/travel-visa-rules" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Travel Visa Rules Explained
                        </h3>
                        <p className="text-sm text-gray-600">
                          Understand visa types, entry requirements, and travel documentation
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/country-entry-requirements/canada-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Canada Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          eTA requirements, Visitor Visa rules, and entry conditions for Canada
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/country-entry-requirements/united-kingdom-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          United Kingdom Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          UK ETA, Standard Visitor rules, and entry conditions for the United Kingdom
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Trip Visa Finder
                        </h3>
                        <p className="text-sm text-gray-600">
                          Plan multi-country trips and check requirements for your itinerary
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
