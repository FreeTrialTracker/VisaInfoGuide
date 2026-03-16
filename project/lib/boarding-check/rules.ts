import type {
  DestinationVisaRule,
  PassportValidityPolicy,
  TransitRule,
  OnwardTicketRule,
} from './types';

// ---------------------------------------------------------------------------
// DESTINATION VISA RULES
// passport → destination requirement
// Coverage: top 10 passport countries × top 20 destination countries
// ---------------------------------------------------------------------------
export const DESTINATION_VISA_RULES: DestinationVisaRule[] = [
  // United States passport
  { passportSlug: 'united-states', destinationSlug: 'japan', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-states', destinationSlug: 'france', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule applies' },
  { passportSlug: 'united-states', destinationSlug: 'germany', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule applies' },
  { passportSlug: 'united-states', destinationSlug: 'italy', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule applies' },
  { passportSlug: 'united-states', destinationSlug: 'spain', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule applies' },
  { passportSlug: 'united-states', destinationSlug: 'united-kingdom', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'united-states', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 60 },
  { passportSlug: 'united-states', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-states', destinationSlug: 'australia', requirement: 'eta_required', maxStayDays: 90, notes: 'eTA (Electronic Travel Authority) required' },
  { passportSlug: 'united-states', destinationSlug: 'mexico', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'united-states', destinationSlug: 'china', requirement: 'visa_free', maxStayDays: 10, notes: '10-day unilateral visa-free policy as of Jan 2025; verify current status' },
  { passportSlug: 'united-states', destinationSlug: 'india', requirement: 'evisa', notes: 'eVisa available online before travel' },
  { passportSlug: 'united-states', destinationSlug: 'vietnam', requirement: 'evisa', notes: 'eVisa available online, or visa-free for ≤45 days per new 2023 policy' },
  { passportSlug: 'united-states', destinationSlug: 'indonesia', requirement: 'visa_free', maxStayDays: 30, notes: 'Visa-free 30 days; can extend once to 60 days' },
  { passportSlug: 'united-states', destinationSlug: 'turkey', requirement: 'evisa', notes: 'eVisa required, obtained online' },
  { passportSlug: 'united-states', destinationSlug: 'united-arab-emirates', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-states', destinationSlug: 'south-korea', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-states', destinationSlug: 'canada', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'united-states', destinationSlug: 'brazil', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-states', destinationSlug: 'egypt', requirement: 'visa_on_arrival', notes: 'Visa on arrival available at major airports' },
  { passportSlug: 'united-states', destinationSlug: 'portugal', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule applies' },
  { passportSlug: 'united-states', destinationSlug: 'netherlands', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule applies' },

  // United Kingdom passport
  { passportSlug: 'united-kingdom', destinationSlug: 'united-states', requirement: 'visa_free', maxStayDays: 90, notes: 'ESTA required for visa-waiver program' },
  { passportSlug: 'united-kingdom', destinationSlug: 'france', requirement: 'visa_free', maxStayDays: 90, notes: 'Post-Brexit: Schengen 90/180 rule applies' },
  { passportSlug: 'united-kingdom', destinationSlug: 'germany', requirement: 'visa_free', maxStayDays: 90, notes: 'Post-Brexit: Schengen 90/180 rule applies' },
  { passportSlug: 'united-kingdom', destinationSlug: 'italy', requirement: 'visa_free', maxStayDays: 90, notes: 'Post-Brexit: Schengen 90/180 rule applies' },
  { passportSlug: 'united-kingdom', destinationSlug: 'spain', requirement: 'visa_free', maxStayDays: 90, notes: 'Post-Brexit: Schengen 90/180 rule applies' },
  { passportSlug: 'united-kingdom', destinationSlug: 'japan', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-kingdom', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 60 },
  { passportSlug: 'united-kingdom', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-kingdom', destinationSlug: 'australia', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'united-kingdom', destinationSlug: 'canada', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'united-kingdom', destinationSlug: 'china', requirement: 'visa_free', maxStayDays: 30, notes: 'Visa-free since Feb 17, 2026 for up to 30 days' },
  { passportSlug: 'united-kingdom', destinationSlug: 'india', requirement: 'evisa', notes: 'eVisa required' },
  { passportSlug: 'united-kingdom', destinationSlug: 'united-arab-emirates', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-kingdom', destinationSlug: 'vietnam', requirement: 'visa_free', maxStayDays: 45, notes: '45-day visa-free as of 2023' },
  { passportSlug: 'united-kingdom', destinationSlug: 'turkey', requirement: 'evisa', notes: 'eVisa required' },
  { passportSlug: 'united-kingdom', destinationSlug: 'south-korea', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-kingdom', destinationSlug: 'new-zealand', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-kingdom', destinationSlug: 'south-africa', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'united-kingdom', destinationSlug: 'brazil', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'united-kingdom', destinationSlug: 'mexico', requirement: 'visa_free', maxStayDays: 180 },

  // India passport
  { passportSlug: 'india', destinationSlug: 'united-states', requirement: 'visa_required', notes: 'B1/B2 visitor visa required' },
  { passportSlug: 'india', destinationSlug: 'united-kingdom', requirement: 'visa_required', notes: 'UK Standard Visitor Visa required' },
  { passportSlug: 'india', destinationSlug: 'canada', requirement: 'visa_required', notes: 'Canada TRV required; can apply for eTA if previously held Canadian visa' },
  { passportSlug: 'india', destinationSlug: 'australia', requirement: 'visa_required', notes: 'Australian visa required' },
  { passportSlug: 'india', destinationSlug: 'france', requirement: 'visa_required', notes: 'Schengen visa required' },
  { passportSlug: 'india', destinationSlug: 'germany', requirement: 'visa_required', notes: 'Schengen visa required' },
  { passportSlug: 'india', destinationSlug: 'italy', requirement: 'visa_required', notes: 'Schengen visa required' },
  { passportSlug: 'india', destinationSlug: 'spain', requirement: 'visa_required', notes: 'Schengen visa required' },
  { passportSlug: 'india', destinationSlug: 'japan', requirement: 'visa_required', notes: 'Japanese visa required' },
  { passportSlug: 'india', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 30, notes: 'Free visa on arrival / visa exemption for 30 days' },
  { passportSlug: 'india', destinationSlug: 'singapore', requirement: 'visa_required', notes: 'Singapore visa required' },
  { passportSlug: 'india', destinationSlug: 'netherlands', requirement: 'visa_required', notes: 'Schengen visa required' },
  { passportSlug: 'india', destinationSlug: 'switzerland', requirement: 'visa_required', notes: 'Schengen visa required' },
  { passportSlug: 'india', destinationSlug: 'china', requirement: 'visa_required', notes: 'Chinese visa required' },
  { passportSlug: 'india', destinationSlug: 'united-arab-emirates', requirement: 'visa_on_arrival', notes: 'Visa on arrival available; or apply online in advance' },
  { passportSlug: 'india', destinationSlug: 'south-korea', requirement: 'visa_required', notes: 'Korean visa required; some groups may have exemption' },
  { passportSlug: 'india', destinationSlug: 'indonesia', requirement: 'visa_on_arrival', maxStayDays: 30, notes: 'Visa on arrival at major airports' },
  { passportSlug: 'india', destinationSlug: 'vietnam', requirement: 'evisa', notes: 'eVisa available online' },
  { passportSlug: 'india', destinationSlug: 'malaysia', requirement: 'visa_free', maxStayDays: 30, notes: '30-day visa-free access' },
  { passportSlug: 'india', destinationSlug: 'new-zealand', requirement: 'visa_required', notes: 'New Zealand visa required' },

  // Germany passport
  { passportSlug: 'germany', destinationSlug: 'united-states', requirement: 'visa_free', maxStayDays: 90, notes: 'ESTA required via Visa Waiver Program' },
  { passportSlug: 'germany', destinationSlug: 'united-kingdom', requirement: 'visa_free', maxStayDays: 180, notes: 'Post-Brexit rules apply' },
  { passportSlug: 'germany', destinationSlug: 'japan', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'germany', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 60 },
  { passportSlug: 'germany', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'germany', destinationSlug: 'australia', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'germany', destinationSlug: 'canada', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'germany', destinationSlug: 'china', requirement: 'visa_free', maxStayDays: 30, notes: 'Visa-free up to 30 days' },
  { passportSlug: 'germany', destinationSlug: 'india', requirement: 'evisa', notes: 'eVisa available; or traditional visa' },
  { passportSlug: 'germany', destinationSlug: 'vietnam', requirement: 'visa_free', maxStayDays: 45, notes: '45-day visa-free' },
  { passportSlug: 'germany', destinationSlug: 'indonesia', requirement: 'visa_free', maxStayDays: 30, notes: 'Visa-free 30 days' },
  { passportSlug: 'germany', destinationSlug: 'turkey', requirement: 'evisa', notes: 'eVisa required' },
  { passportSlug: 'germany', destinationSlug: 'united-arab-emirates', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'germany', destinationSlug: 'south-korea', requirement: 'visa_free', maxStayDays: 90 },

  // Canada passport
  { passportSlug: 'canada', destinationSlug: 'united-states', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'canada', destinationSlug: 'united-kingdom', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'canada', destinationSlug: 'france', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule applies' },
  { passportSlug: 'canada', destinationSlug: 'germany', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule applies' },
  { passportSlug: 'canada', destinationSlug: 'japan', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'canada', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 60 },
  { passportSlug: 'canada', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'canada', destinationSlug: 'australia', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'canada', destinationSlug: 'china', requirement: 'visa_free', maxStayDays: 30, notes: 'Visa-free up to 30 days; added Feb 2026' },
  { passportSlug: 'canada', destinationSlug: 'india', requirement: 'evisa', notes: 'eVisa available' },
  { passportSlug: 'canada', destinationSlug: 'mexico', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'canada', destinationSlug: 'brazil', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'canada', destinationSlug: 'south-korea', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'canada', destinationSlug: 'vietnam', requirement: 'visa_free', maxStayDays: 45, notes: '45-day visa-free as of 2023' },

  // Australia passport
  { passportSlug: 'australia', destinationSlug: 'united-states', requirement: 'visa_free', maxStayDays: 90, notes: 'ESTA via Visa Waiver Program' },
  { passportSlug: 'australia', destinationSlug: 'united-kingdom', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'australia', destinationSlug: 'france', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule' },
  { passportSlug: 'australia', destinationSlug: 'japan', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'australia', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 60 },
  { passportSlug: 'australia', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'australia', destinationSlug: 'china', requirement: 'visa_free', maxStayDays: 15, notes: '15-day visa-free policy' },
  { passportSlug: 'australia', destinationSlug: 'india', requirement: 'evisa', notes: 'eVisa available' },
  { passportSlug: 'australia', destinationSlug: 'new-zealand', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'australia', destinationSlug: 'indonesia', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'australia', destinationSlug: 'vietnam', requirement: 'visa_free', maxStayDays: 45 },
  { passportSlug: 'australia', destinationSlug: 'south-korea', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'australia', destinationSlug: 'canada', requirement: 'eta_required', notes: 'eTA required' },

  // Japan passport
  { passportSlug: 'japan', destinationSlug: 'united-states', requirement: 'visa_free', maxStayDays: 90, notes: 'ESTA required' },
  { passportSlug: 'japan', destinationSlug: 'united-kingdom', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'japan', destinationSlug: 'france', requirement: 'visa_free', maxStayDays: 90, notes: 'Schengen 90/180 rule' },
  { passportSlug: 'japan', destinationSlug: 'germany', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'japan', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'japan', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'japan', destinationSlug: 'australia', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'japan', destinationSlug: 'canada', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'japan', destinationSlug: 'china', requirement: 'visa_required', notes: 'Standard Chinese visa required; pilot exemption for some groups does not include Japan' },
  { passportSlug: 'japan', destinationSlug: 'india', requirement: 'evisa', notes: 'eVisa available' },
  { passportSlug: 'japan', destinationSlug: 'south-korea', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'japan', destinationSlug: 'vietnam', requirement: 'visa_free', maxStayDays: 45 },
  { passportSlug: 'japan', destinationSlug: 'indonesia', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'japan', destinationSlug: 'united-arab-emirates', requirement: 'visa_free', maxStayDays: 90 },

  // China passport
  { passportSlug: 'china', destinationSlug: 'united-states', requirement: 'visa_required', notes: 'B1/B2 visa required' },
  { passportSlug: 'china', destinationSlug: 'united-kingdom', requirement: 'visa_required', notes: 'UK Standard Visitor Visa required' },
  { passportSlug: 'china', destinationSlug: 'france', requirement: 'visa_required', notes: 'Schengen visa required' },
  { passportSlug: 'china', destinationSlug: 'germany', requirement: 'visa_required', notes: 'Schengen visa required' },
  { passportSlug: 'china', destinationSlug: 'japan', requirement: 'visa_required', notes: 'Japanese visa required' },
  { passportSlug: 'china', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'china', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'china', destinationSlug: 'australia', requirement: 'visa_required', notes: 'Australian visa required' },
  { passportSlug: 'china', destinationSlug: 'canada', requirement: 'visa_required', notes: 'Canadian visa required' },
  { passportSlug: 'china', destinationSlug: 'south-korea', requirement: 'visa_free', maxStayDays: 15, notes: '15-day visa-free under new 2024 policy' },
  { passportSlug: 'china', destinationSlug: 'indonesia', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'china', destinationSlug: 'malaysia', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'china', destinationSlug: 'united-arab-emirates', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'china', destinationSlug: 'russia', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'china', destinationSlug: 'turkey', requirement: 'evisa', notes: 'eVisa available' },

  // France passport
  { passportSlug: 'france', destinationSlug: 'united-states', requirement: 'visa_free', maxStayDays: 90, notes: 'ESTA required' },
  { passportSlug: 'france', destinationSlug: 'united-kingdom', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'france', destinationSlug: 'japan', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'france', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 60 },
  { passportSlug: 'france', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'france', destinationSlug: 'australia', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'france', destinationSlug: 'china', requirement: 'visa_free', maxStayDays: 15, notes: 'Visa-free up to 15 days' },
  { passportSlug: 'france', destinationSlug: 'india', requirement: 'evisa', notes: 'eVisa available' },
  { passportSlug: 'france', destinationSlug: 'canada', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'france', destinationSlug: 'vietnam', requirement: 'visa_free', maxStayDays: 45 },

  // South Korea passport
  { passportSlug: 'south-korea', destinationSlug: 'united-states', requirement: 'visa_free', maxStayDays: 90, notes: 'ESTA required' },
  { passportSlug: 'south-korea', destinationSlug: 'united-kingdom', requirement: 'visa_free', maxStayDays: 180 },
  { passportSlug: 'south-korea', destinationSlug: 'france', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'south-korea', destinationSlug: 'germany', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'south-korea', destinationSlug: 'japan', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'south-korea', destinationSlug: 'thailand', requirement: 'visa_free', maxStayDays: 30 },
  { passportSlug: 'south-korea', destinationSlug: 'singapore', requirement: 'visa_free', maxStayDays: 90 },
  { passportSlug: 'south-korea', destinationSlug: 'australia', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'south-korea', destinationSlug: 'canada', requirement: 'eta_required', notes: 'eTA required' },
  { passportSlug: 'south-korea', destinationSlug: 'china', requirement: 'visa_free', maxStayDays: 15, notes: '15-day visa-free policy' },
  { passportSlug: 'south-korea', destinationSlug: 'vietnam', requirement: 'visa_free', maxStayDays: 45 },
  { passportSlug: 'south-korea', destinationSlug: 'indonesia', requirement: 'visa_free', maxStayDays: 30 },
];

// ---------------------------------------------------------------------------
// PASSPORT VALIDITY POLICIES (per destination)
// ---------------------------------------------------------------------------
export const PASSPORT_VALIDITY_POLICIES: PassportValidityPolicy[] = [
  { destinationSlug: 'united-states', rule: { type: 'valid_for_duration' }, notes: 'Passport must be valid for the entire duration of stay' },
  { destinationSlug: 'united-kingdom', rule: { type: 'valid_for_duration' }, notes: 'Must be valid for intended stay' },
  { destinationSlug: 'australia', rule: { type: 'valid_for_duration' }, notes: 'Passport valid for entire stay required' },
  { destinationSlug: 'new-zealand', rule: { type: 'valid_for_duration' }, notes: 'Passport valid for entire stay' },
  { destinationSlug: 'canada', rule: { type: 'valid_for_duration' }, notes: 'Must be valid for stay' },
  { destinationSlug: 'japan', rule: { type: 'valid_for_duration' }, notes: 'Passport valid for duration of intended stay' },
  { destinationSlug: 'south-korea', rule: { type: 'valid_for_duration' }, notes: 'Valid for duration of stay' },
  { destinationSlug: 'singapore', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6, notes: '6 months validity beyond intended stay required' },
  { destinationSlug: 'malaysia', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'indonesia', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'vietnam', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'thailand', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'china', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'india', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6, notes: 'Passport must be valid for 6 months from date of arrival' },
  { destinationSlug: 'france', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3, notes: 'Schengen: must be valid 3 months beyond planned departure' },
  { destinationSlug: 'germany', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3, notes: 'Schengen: must be valid 3 months beyond planned departure' },
  { destinationSlug: 'italy', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3, notes: 'Schengen: must be valid 3 months beyond planned departure' },
  { destinationSlug: 'spain', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3, notes: 'Schengen: must be valid 3 months beyond planned departure' },
  { destinationSlug: 'netherlands', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3, notes: 'Schengen: must be valid 3 months beyond planned departure' },
  { destinationSlug: 'portugal', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3, notes: 'Schengen: must be valid 3 months beyond planned departure' },
  { destinationSlug: 'greece', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3, notes: 'Schengen: must be valid 3 months beyond planned departure' },
  { destinationSlug: 'austria', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3 },
  { destinationSlug: 'belgium', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3 },
  { destinationSlug: 'switzerland', rule: { type: 'three_months_beyond_stay' }, minimumMonthsRequired: 3 },
  { destinationSlug: 'turkey', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'united-arab-emirates', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'egypt', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'mexico', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'brazil', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
  { destinationSlug: 'south-africa', rule: { type: 'six_months_beyond_stay' }, minimumMonthsRequired: 6 },
];

// ---------------------------------------------------------------------------
// TRANSIT VISA RULES
// passport → transit country requirement
// ---------------------------------------------------------------------------
export const TRANSIT_RULES: TransitRule[] = [
  // Transit through UK
  { passportSlug: 'india', transitCountrySlug: 'united-kingdom', requirement: 'airside_transit_visa', notes: 'Direct Airside Transit Visa (DATV) required for most Indian passport holders' },
  { passportSlug: 'china', transitCountrySlug: 'united-kingdom', requirement: 'airside_transit_visa', notes: 'DATV required unless exempt' },
  { passportSlug: 'nigeria', transitCountrySlug: 'united-kingdom', requirement: 'airside_transit_visa', notes: 'DATV required' },
  { passportSlug: 'pakistan', transitCountrySlug: 'united-kingdom', requirement: 'airside_transit_visa' },
  { passportSlug: 'bangladesh', transitCountrySlug: 'united-kingdom', requirement: 'airside_transit_visa' },
  { passportSlug: 'united-states', transitCountrySlug: 'united-kingdom', requirement: 'visa_free' },
  { passportSlug: 'canada', transitCountrySlug: 'united-kingdom', requirement: 'visa_free' },
  { passportSlug: 'australia', transitCountrySlug: 'united-kingdom', requirement: 'visa_free' },
  { passportSlug: 'germany', transitCountrySlug: 'united-kingdom', requirement: 'visa_free' },
  { passportSlug: 'japan', transitCountrySlug: 'united-kingdom', requirement: 'visa_free' },
  { passportSlug: 'france', transitCountrySlug: 'united-kingdom', requirement: 'visa_free' },
  { passportSlug: 'south-korea', transitCountrySlug: 'united-kingdom', requirement: 'visa_free' },

  // Transit through Schengen (France, Germany, Netherlands) — EU Short Stay
  { passportSlug: 'india', transitCountrySlug: 'france', requirement: 'airside_transit_visa', notes: 'Airport Transit Visa required for airside transit' },
  { passportSlug: 'india', transitCountrySlug: 'germany', requirement: 'airside_transit_visa', notes: 'Airport Transit Visa required' },
  { passportSlug: 'india', transitCountrySlug: 'netherlands', requirement: 'airside_transit_visa', notes: 'Airport Transit Visa required' },
  { passportSlug: 'china', transitCountrySlug: 'france', requirement: 'visa_free', notes: 'Chinese passport holders can transit Schengen airside without visa' },
  { passportSlug: 'china', transitCountrySlug: 'germany', requirement: 'visa_free', notes: 'Transit without visa permitted' },
  { passportSlug: 'china', transitCountrySlug: 'netherlands', requirement: 'visa_free' },
  { passportSlug: 'united-states', transitCountrySlug: 'france', requirement: 'visa_free' },
  { passportSlug: 'united-states', transitCountrySlug: 'germany', requirement: 'visa_free' },
  { passportSlug: 'united-states', transitCountrySlug: 'netherlands', requirement: 'visa_free' },
  { passportSlug: 'united-kingdom', transitCountrySlug: 'france', requirement: 'visa_free' },
  { passportSlug: 'united-kingdom', transitCountrySlug: 'germany', requirement: 'visa_free' },
  { passportSlug: 'canada', transitCountrySlug: 'france', requirement: 'visa_free' },
  { passportSlug: 'canada', transitCountrySlug: 'germany', requirement: 'visa_free' },
  { passportSlug: 'australia', transitCountrySlug: 'france', requirement: 'visa_free' },
  { passportSlug: 'australia', transitCountrySlug: 'germany', requirement: 'visa_free' },

  // Transit through USA
  { passportSlug: 'india', transitCountrySlug: 'united-states', requirement: 'transit_visa_required', notes: 'C-1/D transit visa or US B visa required for connecting through USA' },
  { passportSlug: 'china', transitCountrySlug: 'united-states', requirement: 'transit_visa_required', notes: 'C-1/D or B visa required' },
  { passportSlug: 'vietnam', transitCountrySlug: 'united-states', requirement: 'transit_visa_required', notes: 'US transit/visitor visa required' },
  { passportSlug: 'indonesia', transitCountrySlug: 'united-states', requirement: 'transit_visa_required', notes: 'US visa required for transit' },
  { passportSlug: 'thailand', transitCountrySlug: 'united-states', requirement: 'transit_visa_required', notes: 'US visa required for transit' },
  { passportSlug: 'united-kingdom', transitCountrySlug: 'united-states', requirement: 'visa_free', notes: 'ESTA required' },
  { passportSlug: 'canada', transitCountrySlug: 'united-states', requirement: 'visa_free' },
  { passportSlug: 'australia', transitCountrySlug: 'united-states', requirement: 'visa_free', notes: 'ESTA required' },
  { passportSlug: 'germany', transitCountrySlug: 'united-states', requirement: 'visa_free', notes: 'ESTA required' },
  { passportSlug: 'japan', transitCountrySlug: 'united-states', requirement: 'visa_free', notes: 'ESTA required' },
  { passportSlug: 'france', transitCountrySlug: 'united-states', requirement: 'visa_free', notes: 'ESTA required' },
  { passportSlug: 'south-korea', transitCountrySlug: 'united-states', requirement: 'visa_free', notes: 'ESTA required' },

  // Transit through UAE (Dubai)
  { passportSlug: 'india', transitCountrySlug: 'united-arab-emirates', requirement: 'visa_free', notes: 'Indians can transit Dubai airside without a visa' },
  { passportSlug: 'pakistan', transitCountrySlug: 'united-arab-emirates', requirement: 'visa_free', notes: 'Airside transit permitted' },
  { passportSlug: 'china', transitCountrySlug: 'united-arab-emirates', requirement: 'visa_free' },
  { passportSlug: 'united-states', transitCountrySlug: 'united-arab-emirates', requirement: 'visa_free' },
  { passportSlug: 'united-kingdom', transitCountrySlug: 'united-arab-emirates', requirement: 'visa_free' },

  // Transit through Singapore
  { passportSlug: 'india', transitCountrySlug: 'singapore', requirement: 'visa_free', notes: 'Visa-free transit in Singapore; check Transit Without Visa (TWOV) eligibility' },
  { passportSlug: 'china', transitCountrySlug: 'singapore', requirement: 'visa_free' },
  { passportSlug: 'united-states', transitCountrySlug: 'singapore', requirement: 'visa_free' },
  { passportSlug: 'united-kingdom', transitCountrySlug: 'singapore', requirement: 'visa_free' },
  { passportSlug: 'india', transitCountrySlug: 'singapore', requirement: 'visa_free' },

  // Transit through Canada
  { passportSlug: 'india', transitCountrySlug: 'canada', requirement: 'transit_visa_required', notes: 'Canadian Transit Visa required unless exempt' },
  { passportSlug: 'china', transitCountrySlug: 'canada', requirement: 'transit_visa_required', notes: 'Canadian Transit Visa required' },
  { passportSlug: 'philippines', transitCountrySlug: 'canada', requirement: 'transit_visa_required' },
  { passportSlug: 'vietnam', transitCountrySlug: 'canada', requirement: 'transit_visa_required' },
  { passportSlug: 'united-states', transitCountrySlug: 'canada', requirement: 'visa_free' },
  { passportSlug: 'united-kingdom', transitCountrySlug: 'canada', requirement: 'visa_free', notes: 'eTA required' },
  { passportSlug: 'australia', transitCountrySlug: 'canada', requirement: 'visa_free', notes: 'eTA required' },
  { passportSlug: 'germany', transitCountrySlug: 'canada', requirement: 'visa_free', notes: 'eTA required' },
  { passportSlug: 'japan', transitCountrySlug: 'canada', requirement: 'visa_free', notes: 'eTA required' },
];

// ---------------------------------------------------------------------------
// ONWARD TICKET RULES (per destination)
// ---------------------------------------------------------------------------
export const ONWARD_TICKET_RULES: OnwardTicketRule[] = [
  { destinationSlug: 'united-states', policy: 'strongly_enforced', notes: 'Airlines and CBP routinely verify onward/return travel for non-immigrant visa holders' },
  { destinationSlug: 'united-kingdom', policy: 'strongly_enforced', notes: 'Border Force may require evidence of return or onward travel and funds' },
  { destinationSlug: 'australia', policy: 'strongly_enforced', notes: 'Required for visitor visa holders' },
  { destinationSlug: 'canada', policy: 'strongly_enforced', notes: 'CBSA may require onward travel evidence' },
  { destinationSlug: 'thailand', policy: 'commonly_required', notes: 'Airlines and immigration frequently ask for proof of onward travel' },
  { destinationSlug: 'indonesia', policy: 'commonly_required', notes: 'Commonly checked, especially by airlines' },
  { destinationSlug: 'vietnam', policy: 'commonly_required', notes: 'Proof of onward travel often requested' },
  { destinationSlug: 'malaysia', policy: 'commonly_required', notes: 'May be checked at immigration' },
  { destinationSlug: 'singapore', policy: 'commonly_required', notes: 'Immigration often checks onward travel' },
  { destinationSlug: 'japan', policy: 'commonly_required', notes: 'Immigration may request proof of return/onward travel' },
  { destinationSlug: 'south-korea', policy: 'commonly_required', notes: 'Onward ticket may be requested' },
  { destinationSlug: 'china', policy: 'commonly_required', notes: 'Especially for visa-free travelers' },
  { destinationSlug: 'india', policy: 'rarely_checked', notes: 'Less commonly enforced but technically required' },
  { destinationSlug: 'germany', policy: 'rarely_checked', notes: 'Less scrutiny within Schengen for EU/VWP travelers' },
  { destinationSlug: 'france', policy: 'rarely_checked', notes: 'Schengen; less common to check' },
  { destinationSlug: 'italy', policy: 'rarely_checked' },
  { destinationSlug: 'spain', policy: 'rarely_checked' },
  { destinationSlug: 'netherlands', policy: 'rarely_checked' },
  { destinationSlug: 'united-arab-emirates', policy: 'rarely_checked', notes: 'Less enforced for short transits' },
  { destinationSlug: 'turkey', policy: 'rarely_checked' },
  { destinationSlug: 'egypt', policy: 'rarely_checked' },
  { destinationSlug: 'mexico', policy: 'rarely_checked', notes: 'Less commonly checked' },
  { destinationSlug: 'brazil', policy: 'rarely_checked' },
  { destinationSlug: 'new-zealand', policy: 'commonly_required', notes: 'Onward travel document required' },
  { destinationSlug: 'philippines', policy: 'strongly_enforced', notes: 'Philippine immigration is strict about onward/return tickets' },
  { destinationSlug: 'south-africa', policy: 'commonly_required' },
];

export function findDestinationVisaRule(passportSlug: string, destinationSlug: string): DestinationVisaRule | undefined {
  return DESTINATION_VISA_RULES.find(
    r => r.passportSlug === passportSlug && r.destinationSlug === destinationSlug
  );
}

export function findPassportValidityPolicy(destinationSlug: string): PassportValidityPolicy | undefined {
  return PASSPORT_VALIDITY_POLICIES.find(p => p.destinationSlug === destinationSlug);
}

export function findTransitRule(passportSlug: string, transitCountrySlug: string): TransitRule | undefined {
  return TRANSIT_RULES.find(
    r => r.passportSlug === passportSlug && r.transitCountrySlug === transitCountrySlug
  );
}

export function findOnwardTicketRule(destinationSlug: string): OnwardTicketRule | undefined {
  return ONWARD_TICKET_RULES.find(r => r.destinationSlug === destinationSlug);
}
