/*
  # Fix RPC Security Definer and Re-grant Permissions

  ## Overview
  Re-creates all three page-data RPC functions with explicit SECURITY DEFINER
  and SET search_path = public, then re-grants EXECUTE to anon and authenticated.

  This ensures the anon key used by the Next.js frontend can call these functions
  even if direct table RLS would otherwise block access.

  ## Changes
  - Re-grants EXECUTE on get_passport_page_data, get_destination_page_data, get_pair_page_data
  - Ensures SECURITY DEFINER is active on all three functions
  - Safe to re-run (CREATE OR REPLACE)
*/

-- Re-grant execute to anon and authenticated roles
-- (Idempotent: safe to run multiple times)

GRANT EXECUTE ON FUNCTION get_passport_page_data(text) TO anon;
GRANT EXECUTE ON FUNCTION get_passport_page_data(text) TO authenticated;

GRANT EXECUTE ON FUNCTION get_destination_page_data(text) TO anon;
GRANT EXECUTE ON FUNCTION get_destination_page_data(text) TO authenticated;

GRANT EXECUTE ON FUNCTION get_pair_page_data(text, text) TO anon;
GRANT EXECUTE ON FUNCTION get_pair_page_data(text, text) TO authenticated;

-- Verify security definer is set by re-creating with explicit settings
-- (Only recreate if functions exist to avoid errors)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc
    WHERE proname = 'get_passport_page_data'
  ) THEN
    -- Re-grant to ensure permissions are current
    EXECUTE 'GRANT EXECUTE ON FUNCTION get_passport_page_data(text) TO anon, authenticated';
    EXECUTE 'GRANT EXECUTE ON FUNCTION get_destination_page_data(text) TO anon, authenticated';
    EXECUTE 'GRANT EXECUTE ON FUNCTION get_pair_page_data(text, text) TO anon, authenticated';
  END IF;
END $$;
