import { NextRequest, NextResponse } from 'next/server';

// GET /api/config — Provides frontend config
// Google Client ID is safe to expose (public by design).
// Cesium/Mapillary/Maptiler tokens require same-origin check.
export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  const host = request.headers.get('host') || '';
  const forwardedHost = request.headers.get('x-forwarded-host') || '';
  const effectiveHost = forwardedHost || host;

  // Only return tokens to same-origin requests
  let isSameOrigin = false;
  if (origin && effectiveHost) {
    try {
      const originUrl = new URL(origin);
      isSameOrigin = originUrl.host === effectiveHost;
    } catch {}
  }

  const referer = request.headers.get('referer') || '';
  let isRefererSameOrigin = false;
  if (referer && effectiveHost) {
    try {
      const refererUrl = new URL(referer);
      isRefererSameOrigin = refererUrl.host === effectiveHost;
    } catch {}
  }

  const response: Record<string, unknown> = {
    googleClientId: process.env.GOOGLE_CLIENT_ID || null,
  };

  if (isSameOrigin || isRefererSameOrigin) {
    response.cesiumToken = process.env.CESIUM_ION_TOKEN || process.env.CESIUM_TOKEN || null;
    response.mapillaryTokens = process.env.MAPILLARY_TOKENS || process.env.MAPILLARY_TOKEN || '';
    response.maptilerToken = process.env.MAPTILER_TOKEN || '';
  }

  return NextResponse.json(response, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
