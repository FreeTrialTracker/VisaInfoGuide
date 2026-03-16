const apps = [
  {
    category: 'Immigration & Travel',
    domain: 'ImmigrationInfoGuide.com',
    url: 'https://www.immigrationinfoguide.com',
    logo: '/ImmigrationInfoGuide.com.png',
    description:
      'Visit ImmigrationInfoGuide.com, your go-to resource for understanding the immigration journey from start to finish. Moving to a new country is one of life\'s biggest decisions, and we\'re here to make the process less overwhelming. Explore guides on residency permits, citizenship pathways, family reunification, work authorizations, and more. Reliable information, plain language, real answers, because your future deserves the best possible start.',
  },
  {
    category: 'Immigration & Travel',
    domain: 'HotelInAirport.com',
    url: 'https://www.hotelinairport.com',
    logo: '/HOTELINAIRPORT_LOGO.png',
    description:
      'Visit HotelInAirport.com, your go-to resource for finding hotels inside airports, connected to terminals, and near major airports around the world. Long layover, red-eye flight, missed connection, or early check-in, we make it easier to find the most convenient place to rest fast. Explore practical stay options, compare airport access, and plan smoother travel with confidence.',
  },
  {
    category: 'Games & Brain Training',
    domain: 'WordRingPuzzle.com',
    url: 'https://www.wordringpuzzle.com',
    logo: '/WordRingPuzzle.com.png',
    description:
      'Visit WordRingPuzzle.com and challenge yourself with one of the most addictive word games around! Form words, crack rings, and race against the clock in puzzles designed to stretch your vocabulary and sharpen your mind. Whether you\'re a casual player looking for a quick brain boost or a word wizard chasing a perfect score, there\'s always a new challenge waiting for you. How far can your wordpower take you?',
  },
  {
    category: 'Productivity & Tools',
    domain: 'OneToolFix.com',
    url: 'https://www.onetoolfix.com',
    logo: '/OneToolFix.com.png',
    description:
      'Visit OneToolFix.com, because every problem deserves the right tool and you shouldn\'t need ten apps to do one job. Discover a growing suite of smart, streamlined utilities designed to simplify your digital life. Convert, edit, calculate, and organise, all in one place, all with zero fuss. Stop switching tabs and start getting things done. One tool. One fix. Every time.',
  },
];

export default function WebAppSuite() {
  return (
    <section className="mt-16 pt-10 border-t border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore Our Suite of Web Applications</h2>
        <p className="text-gray-500 text-base max-w-xl mx-auto">
          Discover our family of specialised platforms designed to solve real problems and make your digital life easier.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {apps.map((app) => (
          <div
            key={app.domain}
            className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4 bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.logo}
                  alt={`${app.domain} logo`}
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">{app.category}</p>
                <p className="text-lg font-bold text-gray-900 leading-tight">{app.domain}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed flex-1">{app.description}</p>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
            >
              Visit {app.domain} <span aria-hidden="true">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
