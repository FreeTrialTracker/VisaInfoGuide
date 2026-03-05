/*
  # Add Entry Condition Fields to visa_pair_content Table

  1. Schema Changes
    - Add `return_ticket_required` (requirement_status enum)
    - Add `insurance_required` (requirement_status enum)
    - Add `sufficient_funds_required` (requirement_status enum)
    - Add `transit_visa_required` (requirement_status enum)
    - Add `accommodation_proof_required` (requirement_status enum)
    - Add `health_declaration_required` (requirement_status enum)
    - Add `biometric_data_collected` (requirement_status enum)
    
  2. Notes
    - These fields enable structured display of entry conditions in the UI
    - Uses the existing requirement_status enum (required, recommended, not_required, unknown)
    - Allows NULL values (default) when data not yet populated
*/

-- Add entry condition fields to visa_pair_content table
ALTER TABLE visa_pair_content
ADD COLUMN IF NOT EXISTS return_ticket_required requirement_status,
ADD COLUMN IF NOT EXISTS insurance_required requirement_status,
ADD COLUMN IF NOT EXISTS sufficient_funds_required requirement_status,
ADD COLUMN IF NOT EXISTS transit_visa_required requirement_status,
ADD COLUMN IF NOT EXISTS accommodation_proof_required requirement_status,
ADD COLUMN IF NOT EXISTS health_declaration_required requirement_status,
ADD COLUMN IF NOT EXISTS biometric_data_collected requirement_status;
