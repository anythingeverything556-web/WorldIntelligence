import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/health — KV connection health check (authenticated)
export async function GET(request: NextRequest) {
  // Require ADMIN_SECRET to prevent infrastructure info disclosure
  const secret = process.env.ADMIN_SECRET;
  const authHeader = request.headers.get('authorization') || '';
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const checks: Record<string, unknown> = {};

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  checks.kvEnvVars = (kvUrl && kvToken) ? 'SET' : 'MISSING';

  if (kvUrl && kvToken) {
    try {
      const resp = await fetch(`${kvUrl}/get/osm:v1:mena:chunks`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: 'no-store',
      });
      checks.kvConnectivity = resp.ok ? 'OK' : `HTTP_${resp.status}`;
    } catch {
      checks.kvConnectivity = 'FAILED';
    }
  }

  const hasError = Object.values(checks).some(
    v => typeof v === 'string' && v === 'FAILED'
  );

  return NextResponse.json({ ok: !hasError, checks }, { status: hasError ? 500 : 200 });
}
