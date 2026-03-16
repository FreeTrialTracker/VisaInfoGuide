export const dynamic = 'force-dynamic';

const BUILD_TIME = new Date().toISOString();

export async function GET() {
  return Response.json(
    {
      status: 'ok',
      build_time: BUILD_TIME,
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
