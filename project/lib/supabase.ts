import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export interface Passport {
  slug: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  slug: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type VisaType =
  | 'visa_free'
  | 'visa_free_eta'
  | 'evisa'
  | 'visa_on_arrival'
  | 'visa_required'
  | 'restricted';

export type RequirementStatus =
  | 'required'
  | 'may_be_requested'
  | 'not_typically_requested'
  | 'unknown';

export type PassportValidityRequirement =
  | 'valid_for_stay'
  | '3_months_beyond_departure'
  | '6_months_beyond_entry'
  | '6_months_beyond_departure'
  | 'unknown'
  | 'other';

export interface VisaRule {
  id: string;
  passport_slug: string;
  destination_slug: string;
  visa_type: VisaType;
  max_stay_days: number | null;
  stay_rule: string | null;
  stay_window_days: number | null;
  passport_validity_months: number | null;
  passport_validity_requirement: PassportValidityRequirement | null;
  transit_required: boolean | null;
  insurance_required: boolean | null;
  return_ticket_required: boolean | null;
  sufficient_funds_required: boolean | null;
  official_source_url: string | null;
  last_verified: string;
  notes: string | null;
  visa_subtype: string | null;
  created_at: string;
  updated_at: string;
}

export interface VisaRuleWithNames extends VisaRule {
  passport_name?: string;
  destination_name?: string;
}

export const getVisaTypeBadgeColor = (visaType: VisaType): string => {
  switch (visaType) {
    case 'visa_free':
      return 'bg-green-100 text-green-800';
    case 'visa_free_eta':
      return 'bg-blue-100 text-blue-800';
    case 'evisa':
      return 'bg-cyan-100 text-cyan-800';
    case 'visa_on_arrival':
      return 'bg-yellow-100 text-yellow-800';
    case 'visa_required':
      return 'bg-orange-100 text-orange-800';
    case 'restricted':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getVisaTypeLabel = (visaType: VisaType): string => {
  switch (visaType) {
    case 'visa_free':
      return 'Visa Free';
    case 'visa_free_eta':
      return 'Visa Free (eTA Required)';
    case 'evisa':
      return 'eVisa';
    case 'visa_on_arrival':
      return 'Visa on Arrival';
    case 'visa_required':
      return 'Visa Required';
    case 'restricted':
      return 'Restricted';
    default:
      return visaType;
  }
};
