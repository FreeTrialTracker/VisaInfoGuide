/*
  # Add visa pair content table for detailed travel information

  ## Summary
  Creates a new table to store detailed, human-readable content for each passport-destination pair.
  This content includes comprehensive information about entry requirements, border controls, 
  long-stay options, compliance rules, and practical logistics.

  ## New Tables
  - `visa_pair_content`
    - `id` (uuid, primary key) - Unique identifier
    - `passport_slug` (text) - References passports table
    - `destination_slug` (text) - References destinations table
    - `entry_visa_pathway` (text) - Main entry pathway (e.g., "Visa-free entry", "eVisa required")
    - `entry_visa_summary` (text) - Detailed summary of visa requirements
    - `entry_visa_max_stay` (text) - Maximum stay duration description
    - `entry_visa_pre_auth` (text) - Pre-authorization requirements
    - `entry_conditions_summary` (text) - Border control and entry conditions
    - `long_stay_summary` (text) - Long-term stay and residence options
    - `compliance_summary` (text) - Overstay penalties and compliance rules
    - `logistics_summary` (text) - Processing times, flights, and practical information
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Record last update timestamp

  ## Security
  - Enable RLS on visa_pair_content table
  - Add policy for public read access (authenticated and anonymous)
  - Add policy for authenticated insert/update (for admin use)

  ## Notes
  - Unique constraint on (passport_slug, destination_slug) to prevent duplicates
  - Foreign keys ensure data integrity with passports and destinations tables
  - Text fields allow unlimited length for comprehensive content
*/

-- Create visa_pair_content table
CREATE TABLE IF NOT EXISTS visa_pair_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_slug text NOT NULL REFERENCES passports(slug) ON DELETE CASCADE,
  destination_slug text NOT NULL REFERENCES destinations(slug) ON DELETE CASCADE,
  
  -- Entry and visa requirements segment
  entry_visa_pathway text,
  entry_visa_summary text,
  entry_visa_max_stay text,
  entry_visa_pre_auth text,
  
  -- Entry conditions and border controls segment
  entry_conditions_summary text,
  
  -- Long stay and residence options segment
  long_stay_summary text,
  
  -- Compliance and overstay rules segment
  compliance_summary text,
  
  -- Processing and practical logistics segment
  logistics_summary text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Ensure one record per passport-destination pair
  UNIQUE(passport_slug, destination_slug)
);

-- Enable Row Level Security
ALTER TABLE visa_pair_content ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read visa pair content
CREATE POLICY "Public read access to visa pair content"
  ON visa_pair_content
  FOR SELECT
  TO public
  USING (true);

-- Policy: Authenticated users can insert visa pair content
CREATE POLICY "Authenticated users can insert visa pair content"
  ON visa_pair_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update visa pair content
CREATE POLICY "Authenticated users can update visa pair content"
  ON visa_pair_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_visa_pair_content_passport 
  ON visa_pair_content(passport_slug);

CREATE INDEX IF NOT EXISTS idx_visa_pair_content_destination 
  ON visa_pair_content(destination_slug);

CREATE INDEX IF NOT EXISTS idx_visa_pair_content_pair 
  ON visa_pair_content(passport_slug, destination_slug);
