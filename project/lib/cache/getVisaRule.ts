import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { VisaRule } from "@/lib/supabase";

let supabase: ReturnType<typeof createClient> | null = null;
function getSupabaseServerClient() {
  if (!supabase) {
    const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url) throw new Error("Missing SUPABASE_URL");
    if (!key) throw new Error("Missing SUPABASE_ANON_KEY");
    supabase = createClient(url, key);
  }
  return supabase;
}

async function fetchVisaRules(passport: string, destination: string): Promise<VisaRule[]> {
  const db = getSupabaseServerClient();

  const { data, error } = await db
    .from("visa_rules")
    .select(
      "id,passport_slug,destination_slug,visa_type,visa_subtype,max_stay_days,stay_rule,stay_window_days,passport_validity_requirement,passport_validity_months,return_ticket_required,sufficient_funds_required,insurance_required,notes,updated_at"
    )
    .eq("passport_slug", passport)
    .eq("destination_slug", destination);

  if (error) {
    throw new Error(`db_error:${error.code ?? "unknown"}:${error.message}`);
  }

  return data ?? [];
}

const fetchVisaRulesCached = (passport: string, destination: string) =>
  unstable_cache(
    async () => fetchVisaRules(passport, destination),
    ["visa-rules", passport, destination],
    { revalidate: 86400, tags: ["visa-rules"] }
  )();

export async function getAllVisaRules(passport: string, destination: string) {
  return fetchVisaRulesCached(passport, destination);
}

const visaTypePriority: Record<string, number> = {
  visa_free: 1,
  visa_free_eta: 2,
  visa_on_arrival: 3,
  evisa: 4,
  visa_required: 5,
  restricted: 6,
};

export async function getVisaRule(passport: string, destination: string) {
  const rules = await fetchVisaRulesCached(passport, destination);
  if (!rules.length) return null;

  const sorted = [...rules].sort((a, b) => {
    const pa = visaTypePriority[a.visa_type] ?? 999;
    const pb = visaTypePriority[b.visa_type] ?? 999;
    return pa - pb;
  });

  return sorted[0];
}
