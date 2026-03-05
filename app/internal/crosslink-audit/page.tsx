import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { COUNTRIES } from '@/lib/countries';

export const metadata = {
  robots: { index: false, follow: false },
};

interface CrosslinkRow {
  country_code: string;
  country_name: string;
  visa_url: string;
  immigration_url: string;
  is_active: boolean;
  updated_at: string;
}

async function getCrosslinks(): Promise<CrosslinkRow[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('country_crosslinks')
    .select('country_code, country_name, visa_url, immigration_url, is_active, updated_at')
    .order('country_name');
  return (data ?? []) as CrosslinkRow[];
}

export default async function CrosslinkAuditPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const auditToken = process.env.INTERNAL_AUDIT_TOKEN;
  if (!auditToken || searchParams.token !== auditToken) {
    notFound();
  }

  const crosslinks = await getCrosslinks();
  const crosslinkCodes = new Set(crosslinks.map(r => r.country_code));

  const mappedCountries = COUNTRIES.filter(c => crosslinkCodes.has(c.country_code));
  const unmappedCountries = COUNTRIES.filter(c => !crosslinkCodes.has(c.country_code));
  const inactiveRows = crosslinks.filter(r => !r.is_active);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Cross-Domain Link Audit
          </h1>
          <p className="text-sm text-gray-500">
            Internal tool — not indexed. Shows mapping status between visainfoguide.com and
            immigrationinfoguide.com.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-white border border-gray-200 p-5">
            <p className="text-3xl font-bold text-green-600">{mappedCountries.length}</p>
            <p className="text-sm text-gray-600 mt-1">Fully mapped (both URLs)</p>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-5">
            <p className="text-3xl font-bold text-amber-500">{unmappedCountries.length}</p>
            <p className="text-sm text-gray-600 mt-1">Missing from crosslinks table</p>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-5">
            <p className="text-3xl font-bold text-gray-400">{inactiveRows.length}</p>
            <p className="text-sm text-gray-600 mt-1">Inactive (suppressed) links</p>
          </div>
        </div>

        {unmappedCountries.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-amber-700 mb-3">
              Missing Mappings ({unmappedCountries.length})
            </h2>
            <div className="rounded-xl border border-amber-200 bg-amber-50 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-200 bg-amber-100">
                    <th className="text-left px-4 py-3 font-semibold text-amber-900">Country</th>
                    <th className="text-left px-4 py-3 font-semibold text-amber-900">ISO2</th>
                    <th className="text-left px-4 py-3 font-semibold text-amber-900">Slug</th>
                    <th className="text-left px-4 py-3 font-semibold text-amber-900">Expected Visa URL</th>
                  </tr>
                </thead>
                <tbody>
                  {unmappedCountries.map((c, i) => (
                    <tr key={c.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50/50'}>
                      <td className="px-4 py-2.5 text-gray-900">{c.name}</td>
                      <td className="px-4 py-2.5 font-mono text-amber-700">{c.country_code}</td>
                      <td className="px-4 py-2.5 font-mono text-gray-600">{c.slug}</td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs">
                        https://www.visainfoguide.com/destination/{c.slug}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Active Mappings ({mappedCountries.length})
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Country</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">ISO2</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Visa URL</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Immigration URL</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Updated</th>
                </tr>
              </thead>
              <tbody>
                {crosslinks
                  .filter(r => r.is_active)
                  .map((r, i) => (
                    <tr key={r.country_code} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2.5 text-gray-900 font-medium">{r.country_name}</td>
                      <td className="px-4 py-2.5 font-mono text-gray-500">{r.country_code}</td>
                      <td className="px-4 py-2.5">
                        <a
                          href={r.visa_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs truncate max-w-[200px] block"
                        >
                          {r.visa_url}
                        </a>
                      </td>
                      <td className="px-4 py-2.5">
                        <a
                          href={r.immigration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 hover:underline text-xs truncate max-w-[200px] block"
                        >
                          {r.immigration_url}
                        </a>
                      </td>
                      <td className="px-4 py-2.5 text-gray-400 text-xs">
                        {new Date(r.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {inactiveRows.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-400 mb-3">
              Inactive / Suppressed ({inactiveRows.length})
            </h2>
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Country</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">ISO2</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Visa URL</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Immigration URL</th>
                  </tr>
                </thead>
                <tbody>
                  {inactiveRows.map((r, i) => (
                    <tr key={r.country_code} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} opacity-60`}>
                      <td className="px-4 py-2.5 text-gray-600">{r.country_name}</td>
                      <td className="px-4 py-2.5 font-mono text-gray-400">{r.country_code}</td>
                      <td className="px-4 py-2.5 text-gray-400 text-xs">{r.visa_url}</td>
                      <td className="px-4 py-2.5 text-gray-400 text-xs">{r.immigration_url}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <p className="mt-8 text-xs text-gray-400">
          Access this page with <code>?token=YOUR_INTERNAL_AUDIT_TOKEN</code> env var.
          Set <code>INTERNAL_AUDIT_TOKEN</code> in your .env to enable.
        </p>
      </div>
    </div>
  );
}
