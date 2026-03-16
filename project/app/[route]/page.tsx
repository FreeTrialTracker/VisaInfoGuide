import { permanentRedirect, notFound } from 'next/navigation';

function parseRoute(route: string): { passport: string; destination: string } | null {
  const match = route.match(/^([a-z0-9-]+)-to-([a-z0-9-]+)$/);
  if (!match) return null;
  return { passport: match[1], destination: match[2] };
}

export default async function LegacyRoutePage({
  params,
}: {
  params: { route: string };
}) {
  const slug = params.route.toLowerCase();
  const parsed = parseRoute(slug);

  if (!parsed) notFound();

  const { passport, destination } = parsed;

  if (passport === destination) notFound();

  permanentRedirect(`/passport/${passport}/destination/${destination}`);
}
