import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface VisaRule {
  passport_slug: string;
  destination_slug: string;
  visa_type: string;
  max_stay_days: number | null;
  stay_window_days: number | null;
  return_ticket_required: string | null;
  insurance_required: string | null;
  sufficient_funds_required: string | null;
  passport_validity_requirement: string | null;
  notes: string | null;
  last_verified: string | null;
}

interface AuditIssue {
  severity: 'critical' | 'warning' | 'info';
  passport: string;
  destination: string;
  field: string;
  issue: string;
  currentValue: any;
}

async function auditVisaData() {
  console.log('🔍 Starting comprehensive visa data audit...\n');

  const { data: rules, error } = await supabase
    .from('visa_rules')
    .select('*')
    .order('passport_slug, destination_slug');

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  const issues: AuditIssue[] = [];

  for (const rule of rules as VisaRule[]) {
    // Critical: Missing entry conditions for visa-free/VOA/eVisa
    if (['visa_free', 'visa_on_arrival', 'evisa'].includes(rule.visa_type)) {
      if (!rule.return_ticket_required) {
        issues.push({
          severity: 'warning',
          passport: rule.passport_slug,
          destination: rule.destination_slug,
          field: 'return_ticket_required',
          issue: 'Missing return ticket requirement for non-visa entry',
          currentValue: null
        });
      }
      if (!rule.insurance_required) {
        issues.push({
          severity: 'warning',
          passport: rule.passport_slug,
          destination: rule.destination_slug,
          field: 'insurance_required',
          issue: 'Missing insurance requirement',
          currentValue: null
        });
      }
      if (!rule.sufficient_funds_required) {
        issues.push({
          severity: 'warning',
          passport: rule.passport_slug,
          destination: rule.destination_slug,
          field: 'sufficient_funds_required',
          issue: 'Missing sufficient funds requirement',
          currentValue: null
        });
      }
    }

    // Critical: Missing passport validity
    if (!rule.passport_validity_requirement) {
      issues.push({
        severity: 'critical',
        passport: rule.passport_slug,
        destination: rule.destination_slug,
        field: 'passport_validity_requirement',
        issue: 'Missing passport validity requirement',
        currentValue: null
      });
    }

    // Critical: Schengen visa_free without 90/180 window
    const schengenCountries = ['austria', 'belgium', 'croatia', 'czech-republic', 'denmark',
      'estonia', 'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'italy',
      'latvia', 'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'netherlands', 'norway',
      'poland', 'portugal', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland'];

    if (schengenCountries.includes(rule.destination_slug) && rule.visa_type === 'visa_free') {
      if (rule.max_stay_days !== 90) {
        issues.push({
          severity: 'critical',
          passport: rule.passport_slug,
          destination: rule.destination_slug,
          field: 'max_stay_days',
          issue: 'Schengen visa-free should be 90 days',
          currentValue: rule.max_stay_days
        });
      }
      if (rule.stay_window_days !== 180) {
        issues.push({
          severity: 'critical',
          passport: rule.passport_slug,
          destination: rule.destination_slug,
          field: 'stay_window_days',
          issue: 'Schengen window should be 180 days',
          currentValue: rule.stay_window_days
        });
      }
    }

    // Warning: visa_required with stay details
    if (rule.visa_type === 'visa_required' && (rule.max_stay_days || rule.stay_window_days)) {
      issues.push({
        severity: 'info',
        passport: rule.passport_slug,
        destination: rule.destination_slug,
        field: 'max_stay_days',
        issue: 'visa_required should not have stay duration (depends on visa type)',
        currentValue: rule.max_stay_days
      });
    }

    // Warning: Missing max_stay_days for non-visa_required
    if (rule.visa_type !== 'visa_required' && !rule.max_stay_days) {
      issues.push({
        severity: 'warning',
        passport: rule.passport_slug,
        destination: rule.destination_slug,
        field: 'max_stay_days',
        issue: 'Missing maximum stay duration',
        currentValue: null
      });
    }

    // Info: No verification date
    if (!rule.last_verified) {
      issues.push({
        severity: 'info',
        passport: rule.passport_slug,
        destination: rule.destination_slug,
        field: 'last_verified',
        issue: 'Data has never been verified',
        currentValue: null
      });
    }
  }

  // Report summary
  const critical = issues.filter(i => i.severity === 'critical');
  const warnings = issues.filter(i => i.severity === 'warning');
  const info = issues.filter(i => i.severity === 'info');

  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Records: ${rules.length}`);
  console.log(`Critical Issues: ${critical.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Info: ${info.length}`);
  console.log('\n');

  if (critical.length > 0) {
    console.log('🔴 CRITICAL ISSUES');
    console.log('='.repeat(80));
    critical.slice(0, 50).forEach(issue => {
      console.log(`${issue.passport} → ${issue.destination}`);
      console.log(`  Field: ${issue.field}`);
      console.log(`  Issue: ${issue.issue}`);
      console.log(`  Current: ${issue.currentValue}`);
      console.log('');
    });
    if (critical.length > 50) {
      console.log(`... and ${critical.length - 50} more critical issues\n`);
    }
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS');
    console.log('='.repeat(80));
    warnings.slice(0, 30).forEach(issue => {
      console.log(`${issue.passport} → ${issue.destination}`);
      console.log(`  Field: ${issue.field}`);
      console.log(`  Issue: ${issue.issue}`);
      console.log('');
    });
    if (warnings.length > 30) {
      console.log(`... and ${warnings.length - 30} more warnings\n`);
    }
  }

  // Generate statistics by passport
  const issuesByPassport = new Map<string, number>();
  issues.forEach(issue => {
    const count = issuesByPassport.get(issue.passport) || 0;
    issuesByPassport.set(issue.passport, count + 1);
  });

  console.log('📈 ISSUES BY PASSPORT');
  console.log('='.repeat(80));
  const sortedPassports = Array.from(issuesByPassport.entries())
    .sort((a, b) => b[1] - a[1]);

  sortedPassports.forEach(([passport, count]) => {
    console.log(`${passport}: ${count} issues`);
  });

  console.log('\n✅ Audit complete!');
}

auditVisaData().catch(console.error);
