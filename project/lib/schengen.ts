/**
 * Schengen 90/180 Rule Calculator
 *
 * The Schengen Area allows non-EU visitors to stay up to 90 days within any 180-day period.
 * This is a ROLLING window - for any given day, we look back 180 days and count days present.
 *
 * Rules:
 * - Both entry and exit days count as days in Schengen (inclusive)
 * - The 180-day window rolls backward from the evaluation date
 * - Maximum 90 days allowed in any rolling 180-day period
 */

export const SCHENGEN_COUNTRIES = [
  'Austria',
  'Belgium',
  'Croatia',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Italy',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
] as const;

export type SchengenCountry = typeof SCHENGEN_COUNTRIES[number];

export interface TripSegment {
  entryDate: string;   // YYYY-MM-DD format
  exitDate: string;    // YYYY-MM-DD format
  country?: string;    // Country name (Schengen or custom)
  isSchengen?: boolean; // true = counts toward 90-day limit
}

export interface ValidationError {
  index: number;
  message: string;
}

export interface SchengenResult {
  daysUsed: number;
  daysRemaining: number;
  isWithinLimit: boolean;
  evaluationDate: string;
  windowStart: string;
  windowEnd: string;
  segmentsInWindow: Array<{
    entryDate: string;
    exitDate: string;
    daysInWindow: number;
    country?: string;
    isSchengen?: boolean;
  }>;
}

export interface EarliestEntryResult {
  canEnter: boolean;
  earliestDate: string | null;
  message: string;
}

/**
 * Parse YYYY-MM-DD string to Date object at UTC midnight
 * This ensures consistent date handling without timezone issues
 */
function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Format Date object to YYYY-MM-DD string
 */
function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Add days to a date
 */
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

/**
 * Calculate number of days between two dates (inclusive of both dates)
 */
function daysBetween(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / msPerDay) + 1; // +1 for inclusive counting
}

/**
 * Validate a single trip segment
 */
function validateSegment(segment: TripSegment, index: number): ValidationError | null {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(segment.entryDate)) {
    return { index, message: 'Entry date must be in YYYY-MM-DD format' };
  }

  if (!dateRegex.test(segment.exitDate)) {
    return { index, message: 'Exit date must be in YYYY-MM-DD format' };
  }

  const entryDate = parseDate(segment.entryDate);
  const exitDate = parseDate(segment.exitDate);

  if (isNaN(entryDate.getTime())) {
    return { index, message: 'Invalid entry date' };
  }

  if (isNaN(exitDate.getTime())) {
    return { index, message: 'Invalid exit date' };
  }

  if (exitDate < entryDate) {
    return { index, message: 'Exit date must be after or equal to entry date' };
  }

  return null;
}

/**
 * Validate all trip segments and check for overlaps
 */
export function validateTrips(segments: TripSegment[]): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate each segment
  for (let i = 0; i < segments.length; i++) {
    const error = validateSegment(segments[i], i);
    if (error) {
      errors.push(error);
    }
  }

  if (errors.length > 0) return errors;

  // Check for overlaps
  const sorted = [...segments]
    .map((seg, idx) => ({ ...seg, originalIndex: idx }))
    .sort((a, b) => a.entryDate.localeCompare(b.entryDate));

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];

    if (next.entryDate <= current.exitDate) {
      errors.push({
        index: next.originalIndex,
        message: `Trip overlaps with trip ${current.originalIndex + 1}`,
      });
    }
  }

  return errors;
}

/**
 * Merge overlapping or adjacent trip segments
 * Adjacent means exit day + 1 = next entry day
 */
function mergeSegments(segments: TripSegment[]): TripSegment[] {
  if (segments.length === 0) return [];

  // Sort by entry date
  const sorted = [...segments].sort((a, b) =>
    a.entryDate.localeCompare(b.entryDate)
  );

  const merged: TripSegment[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = merged[merged.length - 1];
    const next = sorted[i];

    const currentExit = parseDate(current.exitDate);
    const nextEntry = parseDate(next.entryDate);
    const nextExit = parseDate(next.exitDate);

    // Check if overlapping or adjacent (exit day + 1 day = next entry)
    const dayAfterExit = addDays(currentExit, 1);

    if (nextEntry <= currentExit || nextEntry.getTime() === dayAfterExit.getTime()) {
      // Merge: extend current exit to the later of the two exits
      const laterExit = currentExit > nextExit ? currentExit : nextExit;
      current.exitDate = formatDate(laterExit);
    } else {
      // No overlap, add as new segment
      merged.push(next);
    }
  }

  return merged;
}

/**
 * Calculate the intersection of a trip segment with a date range
 * Returns the number of days in the intersection (0 if no overlap)
 */
function calculateIntersectionDays(
  segmentEntry: Date,
  segmentExit: Date,
  windowStart: Date,
  windowEnd: Date
): number {
  // Find the overlap
  const overlapStart = segmentEntry > windowStart ? segmentEntry : windowStart;
  const overlapEnd = segmentExit < windowEnd ? segmentExit : windowEnd;

  // No overlap
  if (overlapStart > overlapEnd) {
    return 0;
  }

  return daysBetween(overlapStart, overlapEnd);
}

/**
 * Calculate Schengen days for a given evaluation date
 *
 * @param segments - Array of trip segments (entry/exit date pairs)
 * @param evaluationDate - Date to evaluate (defaults to today)
 * @returns Result object with days used, remaining, and details
 */
export function calculateSchengenDays(
  segments: TripSegment[],
  evaluationDate?: string
): SchengenResult {
  const evalDateStr = evaluationDate || formatDate(new Date());
  const evalDate = parseDate(evalDateStr);

  const windowStart = addDays(evalDate, -179);
  const windowEnd = evalDate;

  // Only Schengen trips count toward the 90-day limit
  // isSchengen defaults to true if the field is not set (backwards compat)
  const schengenOnly = segments.filter(s => s.isSchengen !== false);
  const merged = mergeSegments(schengenOnly);

  // All segments (Schengen + non-Schengen) shown in the window summary
  const allMergedByCountry = segments
    .filter(s => {
      const entry = parseDate(s.entryDate);
      const exit = parseDate(s.exitDate);
      return exit >= windowStart && entry <= windowEnd;
    })
    .sort((a, b) => a.entryDate.localeCompare(b.entryDate));

  let totalDaysUsed = 0;
  const segmentsInWindow: SchengenResult['segmentsInWindow'] = [];

  // Build per-segment detail (all trips in window)
  for (const segment of allMergedByCountry) {
    const entryDate = parseDate(segment.entryDate);
    const exitDate = parseDate(segment.exitDate);
    const isSchengen = segment.isSchengen !== false;

    const daysInWindow = calculateIntersectionDays(
      entryDate,
      exitDate,
      windowStart,
      windowEnd
    );

    if (daysInWindow > 0) {
      segmentsInWindow.push({
        entryDate: segment.entryDate,
        exitDate: segment.exitDate,
        daysInWindow,
        country: segment.country,
        isSchengen,
      });
    }
  }

  // Only Schengen days count
  for (const segment of merged) {
    const entryDate = parseDate(segment.entryDate);
    const exitDate = parseDate(segment.exitDate);
    totalDaysUsed += calculateIntersectionDays(entryDate, exitDate, windowStart, windowEnd);
  }

  const daysRemaining = Math.max(0, 90 - totalDaysUsed);

  return {
    daysUsed: totalDaysUsed,
    daysRemaining,
    isWithinLimit: totalDaysUsed <= 90,
    evaluationDate: evalDateStr,
    windowStart: formatDate(windowStart),
    windowEnd: formatDate(windowEnd),
    segmentsInWindow,
  };
}

/**
 * Find the earliest date when a trip of given length can start
 *
 * @param existingSegments - Existing trip segments
 * @param plannedLength - Length of planned trip in days (inclusive)
 * @param desiredStartDate - Desired start date (defaults to today)
 * @param maxSearchDays - Maximum days to search forward (default 365)
 * @returns Result with earliest possible start date
 */
export function findEarliestEntryDate(
  existingSegments: TripSegment[],
  plannedLength: number,
  desiredStartDate?: string,
  maxSearchDays: number = 365
): EarliestEntryResult {
  if (plannedLength < 1) {
    return {
      canEnter: false,
      earliestDate: null,
      message: 'Planned trip length must be at least 1 day',
    };
  }

  if (plannedLength > 90) {
    return {
      canEnter: false,
      earliestDate: null,
      message: 'Cannot stay more than 90 days in Schengen area',
    };
  }

  const startDateStr = desiredStartDate || formatDate(new Date());
  const startDate = parseDate(startDateStr);

  // Try each potential start date
  for (let daysOffset = 0; daysOffset < maxSearchDays; daysOffset++) {
    const candidateStart = addDays(startDate, daysOffset);
    const candidateEnd = addDays(candidateStart, plannedLength - 1); // -1 because inclusive

    // Check each day of the planned trip
    let isValid = true;

    for (let dayOffset = 0; dayOffset < plannedLength; dayOffset++) {
      const checkDate = addDays(candidateStart, dayOffset);

      // Create hypothetical trip up to this day (Schengen)
      const hypotheticalSegment: TripSegment = {
        entryDate: formatDate(candidateStart),
        exitDate: formatDate(checkDate),
        isSchengen: true,
      };

      // Only count Schengen segments for the hypothetical calculation
      const schengenSegments = existingSegments.filter(s => s.isSchengen !== false);
      const result = calculateSchengenDays(
        [...schengenSegments, hypotheticalSegment],
        formatDate(checkDate)
      );

      if (result.daysUsed > 90) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      return {
        canEnter: true,
        earliestDate: formatDate(candidateStart),
        message: daysOffset === 0
          ? `You can enter on ${formatDate(candidateStart)} for ${plannedLength} days`
          : `You can enter on ${formatDate(candidateStart)} (${daysOffset} days from desired date)`,
      };
    }
  }

  return {
    canEnter: false,
    earliestDate: null,
    message: `No valid entry date found within ${maxSearchDays} days. You may need to wait longer for days to expire from the 180-day window.`,
  };
}

/**
 * Get a breakdown of days by month for visualization
 */
export function getDaysBreakdownByMonth(
  segments: TripSegment[],
  evaluationDate?: string
): Array<{ month: string; daysUsed: number }> {
  const evalDateStr = evaluationDate || formatDate(new Date());
  const evalDate = parseDate(evalDateStr);
  const windowStart = addDays(evalDate, -179);

  const merged = mergeSegments(segments);
  const monthlyBreakdown: Map<string, number> = new Map();

  // Initialize all months in the window
  let currentMonth = new Date(windowStart);
  while (currentMonth <= evalDate) {
    const key = `${currentMonth.getUTCFullYear()}-${String(currentMonth.getUTCMonth() + 1).padStart(2, '0')}`;
    monthlyBreakdown.set(key, 0);
    currentMonth = new Date(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() + 1, 1);
  }

  // Count days for each segment
  for (const segment of merged) {
    const entryDate = parseDate(segment.entryDate);
    const exitDate = parseDate(segment.exitDate);

    // Only process segments that overlap with window
    if (exitDate < windowStart || entryDate > evalDate) continue;

    const start = entryDate > windowStart ? entryDate : windowStart;
    const end = exitDate < evalDate ? exitDate : evalDate;

    let current = new Date(start);
    while (current <= end) {
      const key = `${current.getUTCFullYear()}-${String(current.getUTCMonth() + 1).padStart(2, '0')}`;
      monthlyBreakdown.set(key, (monthlyBreakdown.get(key) || 0) + 1);
      current = addDays(current, 1);
    }
  }

  return Array.from(monthlyBreakdown.entries())
    .map(([month, daysUsed]) => ({ month, daysUsed }))
    .sort((a, b) => a.month.localeCompare(b.month));
}
