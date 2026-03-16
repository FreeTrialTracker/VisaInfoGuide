/*
  # Create Visa Database Schema

  1. New Tables
    - `passports`
      - `slug` (text, primary key) - URL-safe passport identifier
      - `name` (text, not null) - Display name of passport/country
      - `is_active` (boolean, default true) - Whether passport is active in the system
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `destinations`
      - `slug` (text, primary key) - URL-safe destination identifier
      - `name` (text, not null) - Display name of destination/country
      - `is_active` (boolean, default true) - Whether destination is active in the system
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `visa_rules`
      - `id` (uuid, primary key) - Unique identifier for each visa rule
      - `passport_slug` (text, not null) - References passports table
      - `destination_slug` (text, not null) - References destinations table
      - `visa_type` (text, not null) - Type of visa requirement (constrained)
      - `max_stay_days` (int, nullable) - Maximum allowed stay in days
      - `stay_rule` (text, nullable) - Human-readable stay rule (e.g., "90 days within 180 days")
      - `passport_validity_months` (int, nullable) - Required passport validity in months
      - `transit_required` (boolean, default false) - Transit visa requirement
      - `insurance_required` (boolean, default false) - Travel insurance requirement
      - `return_ticket_required` (boolean, default false) - Return ticket requirement
      - `sufficient_funds_required` (boolean, default false) - Proof of funds requirement
      - `official_source_url` (text, nullable) - Link to official government source
      - `last_verified` (date, not null) - Date when info was last verified
      - `notes` (text, nullable) - Additional notes and requirements
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Constraints
    - Unique constraint on (passport_slug, destination_slug) in visa_rules
    - Check constraint on visa_type values
    - Foreign key constraints with cascading deletes

  3. Security
    - Enable RLS on all tables
    - Add policies for public read access (authenticated users can read)
*/

-- Create passports table
CREATE TABLE IF NOT EXISTS passports (
  slug text PRIMARY KEY,
  name text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  slug text PRIMARY KEY,
  name text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create visa_rules table
CREATE TABLE IF NOT EXISTS visa_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_slug text NOT NULL REFERENCES passports(slug) ON DELETE CASCADE,
  destination_slug text NOT NULL REFERENCES destinations(slug) ON DELETE CASCADE,
  visa_type text NOT NULL CHECK (visa_type IN (
    'visa_free',
    'visa_free_eta',
    'evisa',
    'visa_on_arrival',
    'visa_required',
    'restricted'
  )),
  max_stay_days int,
  stay_rule text,
  passport_validity_months int,
  transit_required boolean DEFAULT false NOT NULL,
  insurance_required boolean DEFAULT false NOT NULL,
  return_ticket_required boolean DEFAULT false NOT NULL,
  sufficient_funds_required boolean DEFAULT false NOT NULL,
  official_source_url text,
  last_verified date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(passport_slug, destination_slug)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_visa_rules_passport ON visa_rules(passport_slug);
CREATE INDEX IF NOT EXISTS idx_visa_rules_destination ON visa_rules(destination_slug);
CREATE INDEX IF NOT EXISTS idx_visa_rules_visa_type ON visa_rules(visa_type);

-- Enable Row Level Security
ALTER TABLE passports ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_rules ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (data is public)
CREATE POLICY "Allow public read access to passports"
  ON passports FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to destinations"
  ON destinations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to visa_rules"
  ON visa_rules FOR SELECT
  TO anon, authenticated
  USING (true);