/*
  # Add stay_window_days column to visa_rules
  
  1. Changes
    - Add `stay_window_days` (int, nullable) column to `visa_rules` table
    - This field captures the time window within which max_stay_days applies
    - Example: "90 days within 180 days" means max_stay_days=90, stay_window_days=180
  
  2. Notes
    - Field is nullable for backward compatibility with existing data
    - Useful for Schengen-style rules and other rolling window policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'visa_rules' AND column_name = 'stay_window_days'
  ) THEN
    ALTER TABLE visa_rules ADD COLUMN stay_window_days int;
  END IF;
END $$;
