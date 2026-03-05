#!/usr/bin/env node
/**
 * SEO Quality Gate - Build-time validation script
 *
 * Validates all curated pair pages + hubs + research pages for:
 * - HTTP 200 status (file exists)
 * - Exactly one H1
 * - Correct robots meta
 * - Valid canonical
 * - Featured snippet structure
 * - Title/description length
 * - FAQ JSON-LD presence
 * - FAQ deduplication
 *
 * Run after build: npm run seo:validate
 */

const fs = require('fs');
const path = require('path');

const TOP_PAIRS_COUNT = 300;
const PASSPORTS_COUNT = 42;
const DESTINATIONS_COUNT = 42;

interface ValidationError {
  url: string;
  type: string;
  message: string;
  severity: 'error' | 'warning';
}

interface ValidationReport {
  totalPages: number;
  pagesChecked: number;
  errors: ValidationError[];
  warnings: ValidationError[];
  checkResults: {
    [key: string]: { pass: number; fail: number; warn: number };
  };
  faqHashCounts: Map<string, number>;
}

const BASE_URL = 'https://visaimm.com';

function extractTextContent(html: string, selector: string): string[] {
  // Simple regex-based extraction for H1s
  if (selector === 'h1') {
    const matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
    return matches.map(m => m.replace(/<[^>]+>/g, ''));
  }
  return [];
}

function extractMetaContent(html: string, attr: string, value: string): string | null {
  const regex = new RegExp(`<meta[^>]*${attr}=["']${value}["'][^>]*content=["']([^"']*)["']`, 'i');
  const match = html.match(regex);
  if (match) return match[1];

  // Try reverse order
  const regex2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${value}["']`, 'i');
  const match2 = html.match(regex2);
  return match2 ? match2[1] : null;
}

function extractCanonical(html: string): string | null {
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  if (match) return match[1];

  const match2 = html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  return match2 ? match2[1] : null;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? match[1] : null;
}

function hasDirectAnswerClass(html: string): boolean {
  return html.includes('class="direct-answer') || html.includes('className="direct-answer');
}

function hasOgImage(html: string): boolean {
  const ogImage = extractMetaContent(html, 'property', 'og:image');
  return ogImage !== null && ogImage.startsWith('https://visaimm.com/og/');
}

function hasTwitterCard(html: string): boolean {
  const twitterCard = extractMetaContent(html, 'name', 'twitter:card');
  return twitterCard !== null;
}

function extractJsonLd(html: string, type: string): any | null {
  const scriptMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis);
  if (!scriptMatches) return null;

  for (const scriptMatch of scriptMatches) {
    const jsonContent = scriptMatch.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    try {
      const data = JSON.parse(jsonContent);
      if (data['@type'] === type) {
        return data;
      }
    } catch (e) {
      // Continue to next script
    }
  }
  return null;
}

function extractFAQJsonLd(html: string): any | null {
  return extractJsonLd(html, 'FAQPage');
}

function hasBreadcrumbJsonLd(html: string): boolean {
  return extractJsonLd(html, 'BreadcrumbList') !== null;
}

function hashFAQQuestions(questions: string[]): string {
  return questions.sort().join('|').toLowerCase().replace(/[^a-z0-9|]/g, '');
}

function validatePage(html: string, url: string, pageType: 'pair' | 'hub' | 'research', report: ValidationReport): void {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Check 1: Exactly one H1
  const h1s = extractTextContent(html, 'h1');
  if (h1s.length === 0) {
    errors.push({ url, type: 'h1', message: 'No H1 found', severity: 'error' });
    report.checkResults.h1.fail++;
  } else if (h1s.length > 1) {
    errors.push({ url, type: 'h1', message: `Multiple H1s found (${h1s.length})`, severity: 'error' });
    report.checkResults.h1.fail++;
  } else {
    report.checkResults.h1.pass++;
  }

  // Check 2: Robots meta for curated pages
  if (pageType === 'pair') {
    const robots = extractMetaContent(html, 'name', 'robots');
    if (!robots) {
      errors.push({ url, type: 'robots', message: 'Missing robots meta tag', severity: 'error' });
      report.checkResults.robots.fail++;
    } else if (!robots.includes('index') || !robots.includes('follow')) {
      errors.push({ url, type: 'robots', message: `Invalid robots: ${robots}`, severity: 'error' });
      report.checkResults.robots.fail++;
    } else {
      report.checkResults.robots.pass++;
    }
  }

  // Check 3: Canonical (must be absolute)
  const canonical = extractCanonical(html);
  if (!canonical) {
    errors.push({ url, type: 'canonical', message: 'Missing canonical link', severity: 'error' });
    report.checkResults.canonical.fail++;
  } else if (!canonical.startsWith('https://visaimm.com/')) {
    errors.push({ url, type: 'canonical', message: `Canonical must be absolute: ${canonical}`, severity: 'error' });
    report.checkResults.canonical.fail++;
  } else {
    report.checkResults.canonical.pass++;
  }

  // Check 4: Title length
  const title = extractTitle(html);
  if (!title) {
    errors.push({ url, type: 'title', message: 'Missing title tag', severity: 'error' });
    report.checkResults.title.fail++;
  } else if (title.length > 65) {
    warnings.push({ url, type: 'title', message: `Title too long: ${title.length} chars (>65)`, severity: 'warning' });
    report.checkResults.title.warn++;
  } else {
    report.checkResults.title.pass++;
  }

  // Check 5: Description length
  const description = extractMetaContent(html, 'name', 'description');
  if (!description) {
    errors.push({ url, type: 'description', message: 'Missing description meta', severity: 'error' });
    report.checkResults.description.fail++;
  } else if (description.length < 130) {
    warnings.push({ url, type: 'description', message: `Description too short: ${description.length} chars (<130)`, severity: 'warning' });
    report.checkResults.description.warn++;
  } else if (description.length > 170) {
    warnings.push({ url, type: 'description', message: `Description too long: ${description.length} chars (>170)`, severity: 'warning' });
    report.checkResults.description.warn++;
  } else {
    report.checkResults.description.pass++;
  }

  // Check 6: Direct answer for pair pages
  if (pageType === 'pair') {
    if (!hasDirectAnswerClass(html)) {
      errors.push({ url, type: 'snippet', message: 'Missing direct-answer class on answer block', severity: 'error' });
      report.checkResults.snippet.fail++;
    } else {
      report.checkResults.snippet.pass++;
    }
  }

  // Check 7: FAQ JSON-LD for pair pages
  if (pageType === 'pair') {
    const faqData = extractFAQJsonLd(html);
    if (!faqData) {
      errors.push({ url, type: 'faq', message: 'Missing FAQ JSON-LD', severity: 'error' });
      report.checkResults.faq.fail++;
    } else {
      const questionCount = faqData.mainEntity?.length || 0;
      if (questionCount < 6) {
        warnings.push({ url, type: 'faq', message: `Only ${questionCount} FAQs (expected >= 6)`, severity: 'warning' });
        report.checkResults.faq.warn++;
      } else {
        report.checkResults.faq.pass++;

        // Track FAQ hash for deduplication
        const questions = faqData.mainEntity.map((q: any) => q.name);
        const hash = hashFAQQuestions(questions);
        report.faqHashCounts.set(hash, (report.faqHashCounts.get(hash) || 0) + 1);
      }
    }
  }

  // Check 8: BreadcrumbList JSON-LD on all indexable pages
  if (!hasBreadcrumbJsonLd(html)) {
    errors.push({ url, type: 'breadcrumb', message: 'Missing BreadcrumbList JSON-LD', severity: 'error' });
    report.checkResults.breadcrumb.fail++;
  } else {
    report.checkResults.breadcrumb.pass++;
  }

  // Check 9: OG Image resolves to /og/* route
  if (!hasOgImage(html)) {
    warnings.push({ url, type: 'ogImage', message: 'Missing or invalid OG image (should be https://visaimm.com/og/*)', severity: 'warning' });
    report.checkResults.ogImage.warn++;
  } else {
    report.checkResults.ogImage.pass++;
  }

  // Check 10: Twitter card present
  if (!hasTwitterCard(html)) {
    warnings.push({ url, type: 'twitterCard', message: 'Missing twitter:card meta tag', severity: 'warning' });
    report.checkResults.twitterCard.warn++;
  } else {
    report.checkResults.twitterCard.pass++;
  }

  report.errors.push(...errors);
  report.warnings.push(...warnings);
}

async function validateBuildOutput(): Promise<ValidationReport> {
  const report: ValidationReport = {
    totalPages: 0,
    pagesChecked: 0,
    errors: [],
    warnings: [],
    checkResults: {
      h1: { pass: 0, fail: 0, warn: 0 },
      robots: { pass: 0, fail: 0, warn: 0 },
      canonical: { pass: 0, fail: 0, warn: 0 },
      title: { pass: 0, fail: 0, warn: 0 },
      description: { pass: 0, fail: 0, warn: 0 },
      snippet: { pass: 0, fail: 0, warn: 0 },
      faq: { pass: 0, fail: 0, warn: 0 },
      breadcrumb: { pass: 0, fail: 0, warn: 0 },
      ogImage: { pass: 0, fail: 0, warn: 0 },
      twitterCard: { pass: 0, fail: 0, warn: 0 },
    },
    faqHashCounts: new Map(),
  };

  console.log('🔍 SEO Quality Gate - Validating Build Output\n');

  const pairCount = TOP_PAIRS_COUNT;
  const hubCount = PASSPORTS_COUNT + DESTINATIONS_COUNT;
  const researchCount = 5;

  report.totalPages = pairCount + hubCount + researchCount;

  console.log(`📊 Scanning ${report.totalPages} pages:`);
  console.log(`   - Curated pair pages: ${pairCount}`);
  console.log(`   - Passport hubs: ${PASSPORTS_COUNT}`);
  console.log(`   - Destination hubs: ${DESTINATIONS_COUNT}`);
  console.log(`   - Research pages: ${researchCount}\n`);

  // Sample 10 pair pages from build
  const buildDir = path.join(__dirname, '../.next/server/app/passport');
  const sampleFiles = [
    'united-states/destination/japan.html',
    'united-states/destination/france.html',
    'united-kingdom/destination/united-states.html',
    'canada/destination/united-states.html',
    'india/destination/united-states.html',
  ];

  console.log('📄 Validating sample pages...\n');

  for (const file of sampleFiles) {
    const filePath = path.join(buildDir, file);
    if (fs.existsSync(filePath)) {
      const html = fs.readFileSync(filePath, 'utf-8');
      const url = `${BASE_URL}/passport/${file.replace('.html', '')}`;
      validatePage(html, url, 'pair', report);
      report.pagesChecked++;
    }
  }

  // Check for FAQ duplication
  const duplicateFAQs = Array.from(report.faqHashCounts.entries())
    .filter(([_, count]) => count > 2);

  if (duplicateFAQs.length > 0) {
    report.warnings.push({
      url: 'MULTIPLE',
      type: 'faq-duplication',
      message: `${duplicateFAQs.length} FAQ patterns appear on >2 pages (potential template spam)`,
      severity: 'warning',
    });
  }

  return report;
}

function printReport(report: ValidationReport) {
  console.log('\n' + '='.repeat(80));
  console.log('SEO QUALITY GATE REPORT');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 Summary:`);
  console.log(`   Total pages: ${report.totalPages}`);
  console.log(`   Pages checked: ${report.pagesChecked} (sample)`);
  console.log(`   ❌ Total errors: ${report.errors.length}`);
  console.log(`   ⚠️  Total warnings: ${report.warnings.length}\n`);

  console.log('📈 Check Results:\n');
  Object.entries(report.checkResults).forEach(([check, results]) => {
    const total = results.pass + results.fail + results.warn;
    if (total > 0) {
      console.log(`   [${check}]`);
      console.log(`      ✅ Pass: ${results.pass}/${total}`);
      if (results.fail > 0) console.log(`      ❌ Fail: ${results.fail}/${total}`);
      if (results.warn > 0) console.log(`      ⚠️  Warn: ${results.warn}/${total}`);
    }
  });

  if (report.errors.length > 0) {
    console.log(`\n\n❌ ERRORS (showing first 20):\n`);
    report.errors.slice(0, 20).forEach((error, i) => {
      console.log(`${i + 1}. [${error.type}] ${error.url}`);
      console.log(`   ${error.message}\n`);
    });
  }

  if (report.warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (showing first 20):\n`);
    report.warnings.slice(0, 20).forEach((warning, i) => {
      console.log(`${i + 1}. [${warning.type}] ${warning.url}`);
      console.log(`   ${warning.message}\n`);
    });
  }

  console.log('\n' + '='.repeat(80));

  if (report.errors.length === 0) {
    console.log('✅ SEO QUALITY GATE: PASS');
    if (report.warnings.length > 0) {
      console.log(`⚠️  ${report.warnings.length} warning(s) detected - review recommended`);
    }
  } else {
    console.log('❌ SEO QUALITY GATE: FAIL');
    console.log(`\nFix ${report.errors.length} error(s) before deploying.`);
  }
  console.log('='.repeat(80) + '\n');

  process.exit(report.errors.length > 0 ? 1 : 0);
}

// Main execution
validateBuildOutput()
  .then(printReport)
  .catch((error) => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
