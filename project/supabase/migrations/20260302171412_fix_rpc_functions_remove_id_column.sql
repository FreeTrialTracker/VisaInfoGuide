/*
  # Fix RPC functions: remove id column from passports and destinations

  ## Problem
  The passports and destinations tables use slug as the primary key and have no id column.
  The existing RPC functions were selecting id which does not exist, causing a column
  not found error and making all passport/destination pages show "Temporarily Unavailable".

  ## Changes
  - get_passport_page_data: remove id from passport SELECT
  - get_destination_page_data: remove id from destination SELECT
  - get_pair_page_data: remove id from both passport and destination SELECTs
  - Re-grant EXECUTE to anon and authenticated after recreation
*/

CREATE OR REPLACE FUNCTION get_passport_page_data(p_slug text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_passport RECORD;
  v_rules json;
BEGIN
  SELECT slug, name, is_active, updated_at
    INTO v_passport
    FROM passports
   WHERE slug = p_slug
     AND is_active = true
   LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT json_agg(r ORDER BY r.destination_slug)
    INTO v_rules
    FROM (
      SELECT
        vr.id,
        vr.passport_slug,
        vr.destination_slug,
        vr.visa_type,
        vr.max_stay_days,
        vr.stay_rule,
        vr.stay_window_days,
        vr.last_verified,
        vr.notes,
        vr.visa_subtype,
        d.name AS destination_name
      FROM visa_rules vr
      LEFT JOIN destinations d ON d.slug = vr.destination_slug
      WHERE vr.passport_slug = p_slug
        AND vr.destination_slug <> p_slug
    ) r;

  RETURN json_build_object(
    'passport', row_to_json(v_passport),
    'visa_rules', COALESCE(v_rules, '[]'::json)
  );
END;
$$;

CREATE OR REPLACE FUNCTION get_destination_page_data(p_slug text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_destination RECORD;
  v_rules json;
BEGIN
  SELECT slug, name, is_active, updated_at
    INTO v_destination
    FROM destinations
   WHERE slug = p_slug
     AND is_active = true
   LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT json_agg(r ORDER BY r.passport_slug)
    INTO v_rules
    FROM (
      SELECT
        vr.id,
        vr.passport_slug,
        vr.destination_slug,
        vr.visa_type,
        vr.max_stay_days,
        vr.stay_rule,
        vr.stay_window_days,
        vr.last_verified,
        vr.notes,
        p.name AS passport_name
      FROM visa_rules vr
      LEFT JOIN passports p ON p.slug = vr.passport_slug
      WHERE vr.destination_slug = p_slug
        AND vr.passport_slug <> p_slug
    ) r;

  RETURN json_build_object(
    'destination', row_to_json(v_destination),
    'visa_rules', COALESCE(v_rules, '[]'::json)
  );
END;
$$;

CREATE OR REPLACE FUNCTION get_pair_page_data(p_passport text, p_destination text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_passport RECORD;
  v_destination RECORD;
  v_rules json;
BEGIN
  SELECT slug, name, is_active, updated_at
    INTO v_passport
    FROM passports
   WHERE slug = p_passport
   LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT slug, name, is_active, updated_at
    INTO v_destination
    FROM destinations
   WHERE slug = p_destination
   LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT json_agg(r ORDER BY r.priority_order)
    INTO v_rules
    FROM (
      SELECT
        vr.*,
        CASE vr.visa_type
          WHEN 'visa_free'       THEN 1
          WHEN 'visa_free_eta'   THEN 2
          WHEN 'visa_on_arrival' THEN 3
          WHEN 'evisa'           THEN 4
          WHEN 'visa_required'   THEN 5
          WHEN 'restricted'      THEN 6
          ELSE 9
        END AS priority_order
      FROM visa_rules vr
      WHERE vr.passport_slug = p_passport
        AND vr.destination_slug = p_destination
    ) r;

  RETURN json_build_object(
    'passport', row_to_json(v_passport),
    'destination', row_to_json(v_destination),
    'visa_rules', COALESCE(v_rules, '[]'::json)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION get_passport_page_data(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_destination_page_data(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_pair_page_data(text, text) TO anon, authenticated;
