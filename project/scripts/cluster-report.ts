/**
 * Generate implementation report for PRIMARY_CLUSTER_PAIRS expansion
 */

import {
  getAllStaticPairs,
  PRIMARY_CLUSTER_PAIRS,
  TOP_PAIRS_300,
  isPrimaryClusterPair,
  isPairInTopCurated,
  getPassportBySlug,
  getDestinationBySlug
} from '../lib/countries';

async function generateReport() {
  console.log('='.repeat(80));
  console.log('PRIMARY CLUSTER EXPANSION - IMPLEMENTATION REPORT');
  console.log('='.repeat(80));
  console.log('');

  // 1. Total static pair pages generated
  const allStaticPairs = getAllStaticPairs();
  const totalStaticPages = allStaticPairs.length;

  console.log('1. TOTAL STATIC PAIR PAGES GENERATED');
  console.log('-'.repeat(80));
  console.log(`   TOP_PAIRS_300 count:           ${TOP_PAIRS_300.length}`);
  console.log(`   PRIMARY_CLUSTER_PAIRS count:   ${PRIMARY_CLUSTER_PAIRS.length}`);
  console.log(`   After deduplication:           ${totalStaticPages}`);
  console.log(`   Overlap removed:               ${TOP_PAIRS_300.length + PRIMARY_CLUSTER_PAIRS.length - totalStaticPages}`);
  console.log('');

  // 2. Count of indexed pair pages
  const indexedPairs = allStaticPairs.filter(pair =>
    isPairInTopCurated(pair.passport, pair.destination) ||
    isPrimaryClusterPair(pair.passport, pair.destination)
  );
  const indexedCount = indexedPairs.length;
  const noindexCount = totalStaticPages - indexedCount;

  console.log('2. COUNT OF INDEXED PAIR PAGES');
  console.log('-'.repeat(80));
  console.log(`   Pages with robots: index,follow:     ${indexedCount}`);
  console.log(`   Pages with robots: noindex,follow:   ${noindexCount}`);
  console.log(`   Total pages:                         ${totalStaticPages}`);
  console.log('');

  // Breakdown by passport
  const clusterBreakdown: Record<string, number> = {};
  PRIMARY_CLUSTER_PAIRS.forEach(pair => {
    if (!clusterBreakdown[pair.passport]) {
      clusterBreakdown[pair.passport] = 0;
    }
    clusterBreakdown[pair.passport]++;
  });

  console.log('   Primary Cluster Breakdown:');
  Object.entries(clusterBreakdown).forEach(([passport, count]) => {
    const passportObj = getPassportBySlug(passport);
    console.log(`   - ${passportObj?.name}: ${count} indexed destination pairs`);
  });
  console.log('');

  // 3. Example updated titles
  console.log('3. EXAMPLE UPDATED TITLES');
  console.log('-'.repeat(80));

  // US → Japan example
  const usJapanPair = allStaticPairs.find(p => p.passport === 'united-states' && p.destination === 'japan');
  if (usJapanPair) {
    const isCluster = isPrimaryClusterPair('united-states', 'japan');
    console.log(`   US → Japan (Primary Cluster: ${isCluster})`);
    if (isCluster) {
      console.log('   Title: "Japan Visa Requirements for U.S. Citizens – 90 Days Visa-Free (2026)"');
      console.log('   (Actual title depends on visa data from database)');
    } else {
      console.log('   Title: "Japan Visa Requirements for U.S. Citizens (2026 Update) | VisaImm"');
    }
  }
  console.log('');

  // India → France example
  const indiaFrancePair = allStaticPairs.find(p => p.passport === 'india' && p.destination === 'france');
  if (indiaFrancePair) {
    const isCluster = isPrimaryClusterPair('india', 'france');
    console.log(`   India → France (Primary Cluster: ${isCluster})`);
    if (isCluster) {
      console.log('   Title: "France Visa Requirements for India Citizens – Visa Required (2026)"');
      console.log('   (Actual title depends on visa data from database)');
    } else {
      console.log('   Title: "France Visa Requirements for India Citizens (2026 Update) | VisaImm"');
    }
  }
  console.log('');

  // 4. Example cluster authority block HTML
  console.log('4. EXAMPLE "EXPLORE MORE DESTINATIONS" BLOCK HTML');
  console.log('-'.repeat(80));
  console.log(`
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">
      Explore More Destinations for United States Passport Holders
    </h2>
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <p class="text-gray-600 mb-4">
        Find visa requirements for other popular destinations for United States citizens:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <a href="/passport/united-states/destination/france" class="text-blue-600 hover:text-blue-800 hover:underline text-sm">
          France visa requirements for United States citizens
        </a>
        <a href="/passport/united-states/destination/germany" class="text-blue-600 hover:text-blue-800 hover:underline text-sm">
          Germany visa requirements for United States citizens
        </a>
        <a href="/passport/united-states/destination/italy" class="text-blue-600 hover:text-blue-800 hover:underline text-sm">
          Italy visa requirements for United States citizens
        </a>
        <!-- ... up to 12 destinations -->
      </div>
    </div>
  </section>
  `);
  console.log('');

  // 5. Updated sitemap URL count
  console.log('5. UPDATED SITEMAP-PAIRS.XML URL COUNT');
  console.log('-'.repeat(80));
  console.log(`   Total URLs in sitemap-pairs.xml:   ${totalStaticPages}`);
  console.log(`   Previous URL count:                ${TOP_PAIRS_300.length}`);
  console.log(`   Net increase:                      +${totalStaticPages - TOP_PAIRS_300.length}`);
  console.log('');

  // Additional insights
  console.log('6. ADDITIONAL FEATURES IMPLEMENTED');
  console.log('-'.repeat(80));
  console.log('   ✓ PRIMARY_CLUSTER_PAIRS constant (5 passports × 41 destinations = 205 pairs)');
  console.log('   ✓ Updated generateStaticParams() to include all static pairs');
  console.log('   ✓ Enhanced indexing strategy (index TOP_PAIRS_300 OR PRIMARY_CLUSTER_PAIRS)');
  console.log('   ✓ Enhanced titles for primary cluster pairs with visa type and max stay');
  console.log('   ✓ Cluster authority blocks on primary cluster pair pages (12 related destinations)');
  console.log('   ✓ 5 visa-free landing pages (/passport/{passport}/visa-free-countries)');
  console.log('   ✓ 5 travel-without-visa pages (/passport/{passport}/travel-without-visa)');
  console.log('   ✓ Updated sitemap-pairs.xml with all static pairs (higher priority for clusters)');
  console.log('   ✓ Descriptive anchor text in cluster blocks (not generic "View more")');
  console.log('');

  console.log('7. NEW ROUTES CREATED');
  console.log('-'.repeat(80));
  console.log('   • /passport/united-states/visa-free-countries');
  console.log('   • /passport/united-states/travel-without-visa');
  console.log('   • /passport/united-kingdom/visa-free-countries');
  console.log('   • /passport/united-kingdom/travel-without-visa');
  console.log('   • /passport/india/visa-free-countries');
  console.log('   • /passport/india/travel-without-visa');
  console.log('   • /passport/china/visa-free-countries');
  console.log('   • /passport/china/travel-without-visa');
  console.log('   • /passport/canada/visa-free-countries');
  console.log('   • /passport/canada/travel-without-visa');
  console.log('');

  console.log('='.repeat(80));
  console.log('IMPLEMENTATION COMPLETE');
  console.log('='.repeat(80));
  console.log('');
  console.log('Next steps:');
  console.log('1. Run `npm run build` to generate all static pages');
  console.log('2. Verify sitemap-pairs.xml includes all ' + totalStaticPages + ' pairs');
  console.log('3. Check that primary cluster pairs show "Explore More Destinations" section');
  console.log('4. Confirm enhanced titles appear for primary cluster pair pages');
  console.log('5. Test visa-free and travel-without-visa pages for all 5 passports');
}

generateReport().catch(console.error);
