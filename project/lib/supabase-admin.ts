import { createClient } from '@supabase/supabase-js';

/*
SERVER-ONLY SUPABASE CLIENT

This client uses the Supabase service role key.
It bypasses RLS and is intended ONLY for server-side usage.

IMPORTANT:
- Never import this file into client components.
- Never expose this key to the browser.
*/

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
