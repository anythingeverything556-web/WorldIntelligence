/**
 * /api/config — Cesium + MapTiler + Mapillary Configuration API
 * Standalone Vercel Serverless Function (no external imports)
 * Securely serves tokens from environment variables to the client.
 *
 * SECURITY: Same-origin check before returning tokens.
 * Only Google Client ID (public by design) is returned to any caller.
 */
export default function handler(req, res) {
  // ── CORS ──
  const origin = req.headers.origin || '';
  const host = req.headers.host || '';
  const forwardedHost = req.headers['x-forwarded-host'] || '';
  const effectiveHost = forwardedHost || host;

  let isSameOrigin = false;
  if (origin && effectiveHost) {
    try { isSameOrigin = new URL(origin).host === effectiveHost; } catch {}
  }
  // Also check Referer as fallback (same as Next.js route)
  const referer = req.headers.referer || '';
  if (!isSameOrigin && referer && effectiveHost) {
    try { isSameOrigin = new URL(referer).host === effectiveHost; } catch {}
  }

  const allowOrigin = isSameOrigin ? origin : '';
  res.setHeader('Access-Control-Allow-Origin', allowOrigin || 'null');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Google Client ID is safe to expose (public by design)
  const googleClientId = process.env.GOOGLE_CLIENT_ID || null;

  const response = { googleClientId };

  // Only return tokens to same-origin requests
  if (isSameOrigin) {
    response.cesiumToken = process.env.CESIUM_ION_TOKEN || process.env.CESIUM_TOKEN || null;
    response.maptilerToken = process.env.MAPTILER_TOKEN || null;

    const mapillaryTokensRaw = process.env.MAPILLARY_TOKENS || process.env.MAPILLARY_TOKEN || '';
    const mapillaryTokens = mapillaryTokensRaw
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    response.mapillaryToken = mapillaryTokens.length > 0 ? mapillaryTokens[0] : null;
    response.mapillaryTokens = mapillaryTokens.length > 0 ? mapillaryTokens : null;
  }

  res.status(200).json(response);
}
