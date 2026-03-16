/*
  # Fix visa_pair_content security issues and unused indexes

  ## Changes

  ### 1. Drop unused single-column indexes
  - `idx_visa_pair_content_passport` — superseded by the composite index
    `idx_visa_pair_content_pair (passport_slug, destination_slug)` which covers
    prefix lookups on `passport_slug` already.
  - `idx_visa_pair_content_destination` — single-column index on `destination_slug`
    is unused; the composite unique index covers the primary access pattern.

  ### 2. Fix overly-permissive RLS policies
  The existing INSERT and UPDATE policies used `WITH CHECK (true)` / `USING (true)`,
  which bypassed row-level security for all authenticated users.

  This table is a curated reference dataset with no per-user ownership column.
  Writes should only be performed by the service role (migrations / admin scripts),
  not by regular authenticated users. The corrected approach:
    - DROP the two permissive authenticated-user write policies.
    - Replace them with service-role-only equivalents using a JWT role check so
      that only the Supabase service role key can insert or update rows.
    - Public SELECT policy is correct and left untouched.

  ### Security
  - INSERT: restricted to service role only (auth.jwt() ->> 'role' = 'service_role')
  - UPDATE: restricted to service role only
  - DELETE: no policy — no one (outside service role) can delete rows
  - SELECT: public read remains unchanged
*/

-- 1. Drop unused single-column indexes
DROP INDEX IF EXISTS public.idx_visa_pair_content_passport;
DROP INDEX IF EXISTS public.idx_visa_pair_content_destination;

-- 2. Drop the permissive write policies
DROP POLICY IF EXISTS "Authenticated users can insert visa pair content" ON public.visa_pair_content;
DROP POLICY IF EXISTS "Authenticated users can update visa pair content" ON public.visa_pair_content;

-- 3. Create restrictive service-role-only INSERT policy
CREATE POLICY "Service role can insert visa pair content"
  ON public.visa_pair_content
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() ->> 'role') = 'service_role'
  );

-- 4. Create restrictive service-role-only UPDATE policy
CREATE POLICY "Service role can update visa pair content"
  ON public.visa_pair_content
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() ->> 'role') = 'service_role'
  )
  WITH CHECK (
    (auth.jwt() ->> 'role') = 'service_role'
  );
