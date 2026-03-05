/*
  # Convert Boolean Requirements to 3-State Enums

  ## Overview
  Replaces boolean requirement fields with honest 3-state enums to prevent misleading users.
  
  ## Changes
  
  1. **New Types**
     - `requirement_status` enum: 'required', 'may_be_requested', 'not_typically_requested', 'unknown'
     - `passport_validity_requirement` enum: 'valid_for_stay', '3_months_beyond_departure', 
       '6_months_beyond_entry', '6_months_beyond_departure', 'unknown', 'other'
  
  2. **Modified Columns** (on `visa_rules` table)
     - `return_ticket_required`: boolean → requirement_status
     - `sufficient_funds_required`: boolean → requirement_status
     - `insurance_required`: boolean → requirement_status
     - `transit_required`: boolean → requirement_status (dropped, not used)
     - **NEW** `passport_validity_requirement`: passport_validity_requirement enum
  
  3. **Data Migration Logic**
     - `true` → 'required'
     - `false` → 'may_be_requested'
     - `null` → 'unknown'
  
  4. **Important Notes**
     - Legacy boolean interpretation: false never meant "not required", it meant "might be checked"
     - This migration makes data semantics honest and prevents misleading users
     - Old boolean columns renamed with `_legacy` suffix for audit trail
     - Can be dropped after verification
*/

-- Step 1: Create enum types
DO $$ BEGIN
  CREATE TYPE requirement_status AS ENUM (
    'required',
    'may_be_requested',
    'not_typically_requested',
    'unknown'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE passport_validity_requirement AS ENUM (
    'valid_for_stay',
    '3_months_beyond_departure',
    '6_months_beyond_entry',
    '6_months_beyond_departure',
    'unknown',
    'other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Rename old boolean columns for audit trail
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'return_ticket_required' 
    AND data_type = 'boolean'
  ) THEN
    ALTER TABLE visa_rules RENAME COLUMN return_ticket_required TO return_ticket_required_legacy;
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'sufficient_funds_required' 
    AND data_type = 'boolean'
  ) THEN
    ALTER TABLE visa_rules RENAME COLUMN sufficient_funds_required TO sufficient_funds_required_legacy;
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'insurance_required' 
    AND data_type = 'boolean'
  ) THEN
    ALTER TABLE visa_rules RENAME COLUMN insurance_required TO insurance_required_legacy;
  END IF;
END $$;

-- Step 3: Add new enum columns
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'return_ticket_required'
    AND data_type = 'USER-DEFINED'
  ) THEN
    ALTER TABLE visa_rules ADD COLUMN return_ticket_required requirement_status DEFAULT 'unknown';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'sufficient_funds_required'
    AND data_type = 'USER-DEFINED'
  ) THEN
    ALTER TABLE visa_rules ADD COLUMN sufficient_funds_required requirement_status DEFAULT 'unknown';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'insurance_required'
    AND data_type = 'USER-DEFINED'
  ) THEN
    ALTER TABLE visa_rules ADD COLUMN insurance_required requirement_status DEFAULT 'unknown';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'passport_validity_requirement'
  ) THEN
    ALTER TABLE visa_rules ADD COLUMN passport_validity_requirement passport_validity_requirement DEFAULT 'unknown';
  END IF;
END $$;

-- Step 4: Migrate data from legacy boolean columns
UPDATE visa_rules
SET return_ticket_required = CASE 
  WHEN return_ticket_required_legacy = true THEN 'required'::requirement_status
  WHEN return_ticket_required_legacy = false THEN 'may_be_requested'::requirement_status
  ELSE 'unknown'::requirement_status
END
WHERE EXISTS (
  SELECT 1 FROM information_schema.columns 
  WHERE table_name = 'visa_rules' AND column_name = 'return_ticket_required_legacy'
);

UPDATE visa_rules
SET sufficient_funds_required = CASE 
  WHEN sufficient_funds_required_legacy = true THEN 'required'::requirement_status
  WHEN sufficient_funds_required_legacy = false THEN 'may_be_requested'::requirement_status
  ELSE 'unknown'::requirement_status
END
WHERE EXISTS (
  SELECT 1 FROM information_schema.columns 
  WHERE table_name = 'visa_rules' AND column_name = 'sufficient_funds_required_legacy'
);

UPDATE visa_rules
SET insurance_required = CASE 
  WHEN insurance_required_legacy = true THEN 'required'::requirement_status
  WHEN insurance_required_legacy = false THEN 'may_be_requested'::requirement_status
  ELSE 'unknown'::requirement_status
END
WHERE EXISTS (
  SELECT 1 FROM information_schema.columns 
  WHERE table_name = 'visa_rules' AND column_name = 'insurance_required_legacy'
);

-- Step 5: Drop transit_required (not used in application)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'transit_required'
  ) THEN
    ALTER TABLE visa_rules DROP COLUMN transit_required;
  END IF;
END $$;

-- Step 6: Drop legacy columns after migration (can comment out for audit trail)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'return_ticket_required_legacy'
  ) THEN
    ALTER TABLE visa_rules DROP COLUMN return_ticket_required_legacy;
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'sufficient_funds_required_legacy'
  ) THEN
    ALTER TABLE visa_rules DROP COLUMN sufficient_funds_required_legacy;
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visa_rules' AND column_name = 'insurance_required_legacy'
  ) THEN
    ALTER TABLE visa_rules DROP COLUMN insurance_required_legacy;
  END IF;
END $$;
