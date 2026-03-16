/**
 * Schengen Calculator Test Suite
 *
 * Run with: npx tsx scripts/test-schengen.ts
 * or add to package.json: "test:schengen": "tsx scripts/test-schengen.ts"
 */

import {
  TripSegment,
  validateTrips,
  calculateSchengenDays,
  findEarliestEntryDate,
} from '../lib/schengen';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failCount++;
  }
}

function assertEquals(actual: any, expected: any, message: string) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
  assert(isEqual, `${message} (expected: ${expected}, got: ${actual})`);
}

console.log('🧪 Running Schengen Calculator Tests\n');

// Test 1: Single trip entirely inside window
console.log('Test 1: Single trip entirely inside window');
{
  const segments: TripSegment[] = [
    { entryDate: '2026-02-01', exitDate: '2026-02-10' },
  ];
  const result = calculateSchengenDays(segments, '2026-03-01');
  assertEquals(result.daysUsed, 10, 'Days used should be 10');
  assertEquals(result.daysRemaining, 80, 'Days remaining should be 80');
  assert(result.isWithinLimit, 'Should be within limit');
}
console.log('');

// Test 2: Trip partially outside window (only overlap counts)
console.log('Test 2: Trip partially outside window');
{
  // Trip from Sept 1 to Sept 30 (30 days)
  // Eval date March 1, 2026
  // Window: Sept 3, 2025 to March 1, 2026
  // Only Sept 3-30 should count (28 days)
  const segments: TripSegment[] = [
    { entryDate: '2025-09-01', exitDate: '2025-09-30' },
  ];
  const result = calculateSchengenDays(segments, '2026-03-01');
  assertEquals(result.daysUsed, 28, 'Only days within window should count (28)');
}
console.log('');

// Test 3: Multiple trips non-overlapping
console.log('Test 3: Multiple trips non-overlapping');
{
  const segments: TripSegment[] = [
    { entryDate: '2026-01-01', exitDate: '2026-01-10' }, // 10 days
    { entryDate: '2026-02-01', exitDate: '2026-02-20' }, // 20 days
  ];
  const result = calculateSchengenDays(segments, '2026-03-01');
  assertEquals(result.daysUsed, 30, 'Total days should be 30');
  assertEquals(result.daysRemaining, 60, 'Days remaining should be 60');
}
console.log('');

// Test 4: Overlapping trips merged correctly
console.log('Test 4: Overlapping trips merged correctly');
{
  const segments: TripSegment[] = [
    { entryDate: '2026-01-01', exitDate: '2026-01-15' },
    { entryDate: '2026-01-10', exitDate: '2026-01-25' }, // Overlaps with first
  ];
  const errors = validateTrips(segments);
  assert(errors.length > 0, 'Validation should detect overlap');

  // Despite overlap, calculate should merge and count correctly
  // Merged: Jan 1 to Jan 25 = 25 days
  const result = calculateSchengenDays(segments, '2026-02-01');
  assertEquals(result.daysUsed, 25, 'Merged trip should count 25 days total');
}
console.log('');

// Test 5: Adjacent trips merged correctly
console.log('Test 5: Adjacent trips merged correctly');
{
  const segments: TripSegment[] = [
    { entryDate: '2026-01-01', exitDate: '2026-01-10' },
    { entryDate: '2026-01-11', exitDate: '2026-01-20' }, // Next day entry
  ];
  // Should merge into one segment: Jan 1 to Jan 20 = 20 days
  const result = calculateSchengenDays(segments, '2026-02-01');
  assertEquals(result.daysUsed, 20, 'Adjacent trips should merge to 20 days');
}
console.log('');

// Test 6: Inclusive day count correctness (same-day entry/exit = 1 day)
console.log('Test 6: Same-day entry and exit counts as 1 day');
{
  const segments: TripSegment[] = [
    { entryDate: '2026-01-15', exitDate: '2026-01-15' }, // Same day
  ];
  const result = calculateSchengenDays(segments, '2026-02-01');
  assertEquals(result.daysUsed, 1, 'Same-day visit should count as 1 day');
}
console.log('');

// Test 7: Days remaining computed correctly at limit
console.log('Test 7: Exactly at 90-day limit');
{
  const segments: TripSegment[] = [
    { entryDate: '2026-01-01', exitDate: '2026-03-31' }, // 90 days (Jan has 31, Feb has 28, March 1-31)
  ];
  const result = calculateSchengenDays(segments, '2026-03-31');
  assertEquals(result.daysUsed, 90, 'Should use exactly 90 days');
  assertEquals(result.daysRemaining, 0, 'Should have 0 days remaining');
  assert(result.isWithinLimit, 'Should still be within limit at exactly 90');
}
console.log('');

// Test 8: Earliest safe start date computation
console.log('Test 8: Find earliest safe entry date');
{
  // Already used 80 days in recent trips
  const segments: TripSegment[] = [
    { entryDate: '2026-01-01', exitDate: '2026-03-21' }, // 80 days
  ];

  // Want to take a 15-day trip starting from March 22
  // Current used on March 22: 80 days (all still in window)
  // Adding 15 days would be 95 > 90, so cannot start immediately
  const result = findEarliestEntryDate(segments, 15, '2026-03-22', 180);

  assert(!result.canEnter || result.earliestDate !== '2026-03-22',
    'Should not be able to enter immediately after using 80 days');
  console.log(`  Result: ${result.message}`);
}
console.log('');

// Additional Test: Real-world scenario from requirements
console.log('Test 9: Example from requirements');
{
  const segments: TripSegment[] = [
    { entryDate: '2026-01-01', exitDate: '2026-01-10' }, // 10 days
    { entryDate: '2026-02-01', exitDate: '2026-02-20' }, // 20 days
  ];
  const result = calculateSchengenDays(segments, '2026-03-01');
  console.log(`  Trips: Jan 1-10 (10 days) + Feb 1-20 (20 days)`);
  console.log(`  Evaluation: March 1, 2026`);
  console.log(`  Days used: ${result.daysUsed}`);
  console.log(`  Days remaining: ${result.daysRemaining}`);
  console.log(`  Window: ${result.windowStart} to ${result.windowEnd}`);

  assertEquals(result.daysUsed, 30, 'Should use 30 days total');
  assertEquals(result.daysRemaining, 60, 'Should have 60 days remaining');
}
console.log('');

// Test 10: Over limit scenario
console.log('Test 10: Over 90-day limit');
{
  const segments: TripSegment[] = [
    { entryDate: '2026-01-01', exitDate: '2026-04-10' }, // 100 days
  ];
  const result = calculateSchengenDays(segments, '2026-04-10');
  assert(result.daysUsed > 90, 'Should exceed 90 days');
  assert(!result.isWithinLimit, 'Should not be within limit');
  assertEquals(result.daysRemaining, 0, 'Should have 0 days remaining when over limit');
}
console.log('');

// Summary
console.log('═══════════════════════════════════════');
console.log('📊 Test Summary');
console.log('═══════════════════════════════════════');
console.log(`✅ Passed: ${passCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`📈 Total:  ${passCount + failCount}`);
console.log('═══════════════════════════════════════');

if (failCount === 0) {
  console.log('🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('💥 Some tests failed!');
  process.exit(1);
}
