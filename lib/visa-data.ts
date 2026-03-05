import { getVisaRule as getCachedVisaRule, getAllVisaRules as getCachedAllVisaRules } from '@/lib/cache/getVisaRule';
import { VisaRule } from './supabase';

export async function getVisaRule(
  passportSlug: string,
  destinationSlug: string
): Promise<VisaRule | null> {
  return getCachedVisaRule(passportSlug, destinationSlug);
}

export async function getAllVisaRules(
  passportSlug: string,
  destinationSlug: string
): Promise<VisaRule[]> {
  return getCachedAllVisaRules(passportSlug, destinationSlug);
}

export function formatVisaType(visaType: string): string {
  switch (visaType) {
    case 'visa_free':
      return 'visa-free';
    case 'visa_free_eta':
      return 'visa-free (with eTA/electronic authorization)';
    case 'evisa':
      return 'eVisa';
    case 'visa_on_arrival':
      return 'visa on arrival';
    case 'visa_required':
      return 'visa required';
    case 'restricted':
      return 'restricted (entry not permitted)';
    default:
      return visaType;
  }
}

export function formatStayDuration(
  maxStayDays: number | null,
  stayRule: string | null,
  stayWindowDays: number | null
): string {
  if (!maxStayDays) {
    return stayRule || 'Duration varies';
  }

  let baseText = `${maxStayDays} days`;

  if (stayWindowDays) {
    baseText += ` per ${stayWindowDays} days`;
  } else if (stayRule) {
    baseText += ` ${stayRule}`;
  }

  return baseText;
}

export function formatPassportValidity(months: number | null): string {
  if (!months) {
    return 'Check with destination authorities';
  }
  return `${months} months beyond entry/departure date`;
}

export function getVisaTypeDescription(visaType: string): string {
  switch (visaType) {
    case 'visa_free':
      return 'You can enter without obtaining a visa in advance. Simply present your valid passport at the border.';
    case 'visa_free_eta':
      return 'You can enter visa-free, but must obtain an electronic travel authorization (eTA) or similar online approval before travel.';
    case 'evisa':
      return 'You must apply for an electronic visa (eVisa) online before travel. This is typically processed within a few days.';
    case 'visa_on_arrival':
      return 'You can obtain a visa upon arrival at the port of entry. Bring required documents and payment.';
    case 'visa_required':
      return 'You must obtain a visa from an embassy or consulate before travel. This typically requires an in-person appointment.';
    case 'restricted':
      return 'Entry is currently restricted or not permitted for this passport type.';
    default:
      return 'Contact the destination embassy for specific requirements.';
  }
}
