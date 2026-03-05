export const IMMIGRATION_BASE_URL = 'https://immigrationinfoguide.com';
export const VISA_BASE_URL = 'https://www.visainfoguide.com';

export interface CrosslinkRow {
  visa_slug: string;
  visa_url: string;
  immigration_url: string;
  is_active: boolean;
}
