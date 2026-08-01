import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

// ─── Route segment config ──────────────────────────────────────────────────
export const maxDuration = 60;    // 60s function timeout for Vercel
export const dynamic = 'force-dynamic'; // Never cache this route — always fresh

// ─── Constants (identical to v6 osm-cache.js) ─────────────────────────────
const TTL_SECONDS = 60 * 60 * 24 * 8;
const CHUNK_BYTES = 500 * 1024;
const KEY_PREFIX = 'osm:v1:';
const MAX_DISCOVER_CHUNKS = 64;

// ─── Helper functions (ported 1:1 from v6) ────────────────────────────────
function cacheKey(id: string): string {
  return KEY_PREFIX + id;
}

function isFiniteCoord(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function slim(els: any[]): any[] {
  if (!Array.isArray(els)) return [];
  const out: any[] = [];
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    const hasDirect = isFiniteCoord(el.lat) && isFiniteCoord(el.lon);
    const hasCenter = el.center && isFiniteCoord(el.center.lat) && isFiniteCoord(el.center.lon);
    if (!hasDirect && !hasCenter) continue;
    const slimmed: any = { id: el.id, type: el.type };
    const tags = el.tags;
    if (tags && typeof tags === 'object') {
      const keys = Object.keys(tags);
      if (keys.length > 0) slimmed.tags = tags;
    }
    if (hasDirect) {
      slimmed.lat = el.lat;
      slimmed.lon = el.lon;
    }
    if (hasCenter) {
      slimmed.center = { lat: el.center.lat, lon: el.center.lon };
    }
    out.push(slimmed);
  }
  return out;
}

function splitIntoChunks(items: any[]): any[][] {
  const chunks: any[][] = [];
  let start = 0;

  while (start < items.length) {
    let end = start;

    // Pre-calculate approximate size using sampling
    const sampleSize = Math.min(10, items.length - start);
    let avgItemSize = 0;
    if (sampleSize > 0) {
      let sampleTotal = 0;
      for (let i = start; i < start + sampleSize; i++) {
        sampleTotal += JSON.stringify(items[i]).length + 1;
      }
      avgItemSize = sampleTotal / sampleSize;
    }

    // Estimate how many items we can fit
    const estimatedFit = Math.floor(CHUNK_BYTES / Math.max(avgItemSize, 100));
    end = Math.min(start + estimatedFit, items.length);

    // Fine-tune by checking actual sizes
    while (end > start) {
      let actualSize = 0;
      for (let i = start; i < end; i++) {
        actualSize += JSON.stringify(items[i]).length + 1;
      }
      if (actualSize <= CHUNK_BYTES || end === start + 1) break;
      end--;
    }

    chunks.push(items.slice(start, end));
    start = end;
  }

  return chunks;
}

function safeJsonParse(raw: string): any {
  try { return JSON.parse(raw); } catch { return null; }
}

function unwrapValue(raw: any): any {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === 'string') {
    const parsed = safeJsonParse(raw);
    return parsed === null ? raw : unwrapValue(parsed);
  }
  if (Array.isArray(raw)) {
    if (raw.length === 1) {
      const only = raw[0];
      if (typeof only === 'string') return unwrapValue(only);
      if (only && typeof only === 'object' && (only.result !== undefined || only.data !== undefined)) {
        return unwrapValue(only);
      }
      return raw;
    }
    if (
      raw.length >= 2 &&
      typeof raw[1] === 'string' &&
      /^(EX|PX|EXAT|PXAT|NX|XX|KEEPTTL|GET)$/i.test(raw[1])
    ) {
      return unwrapValue(raw[0]);
    }
    return raw;
  }
  if (typeof raw === 'object') {
    if (raw.result !== undefined) return unwrapValue(raw.result);
    if (raw.data !== undefined) return unwrapValue(raw.data);
    if (Array.isArray(raw.elements) || Array.isArray(raw.els)) return raw;
  }
  return raw;
}

function parseChunkCount(raw: any): number {
  const value = unwrapValue(raw);
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (Array.isArray(value) && value.length === 1) return parseChunkCount(value[0]);
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function parseEls(raw: any): any[] {
  const value = unwrapValue(raw);
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value.filter((el: any) => {
    return (isFiniteCoord(el.lat) && isFiniteCoord(el.lon)) ||
      (el.center && isFiniteCoord(el.center.lat) && isFiniteCoord(el.center.lon));
  });
  if (value && Array.isArray(value.elements)) return slim(value.elements);
  if (value && Array.isArray(value.els)) return value.els.filter((el: any) => {
    return (isFiniteCoord(el.lat) && isFiniteCoord(el.lon)) ||
      (el.center && isFiniteCoord(el.center.lat) && isFiniteCoord(el.center.lon));
  });
  return [];
}

async function readManifest(regionId: string, kvGet: (key: string) => Promise<any>) {
  const rawChunkCount = await kvGet(cacheKey(`${regionId}:chunks`));
  const chunkCount = parseChunkCount(rawChunkCount);

  if (chunkCount > 0) {
    return { count: chunkCount, storage: chunkCount === 1 ? 'single' : 'chunked' };
  }

  const directEls = parseEls(await kvGet(cacheKey(regionId)));
  if (directEls.length > 0) {
    return { count: 1, storage: 'single', directEls };
  }

  const discovered: any[] = [];
  for (let index = 0; index < MAX_DISCOVER_CHUNKS; index++) {
    const chunkEls = parseEls(await kvGet(cacheKey(`${regionId}:${index}`)));
    if (!chunkEls.length) break;
    discovered.push(chunkEls);
  }

  if (discovered.length > 0) {
    return { count: discovered.length, storage: 'chunked', discovered };
  }

  return { count: 0, storage: 'none' };
}

// ─── CORS helpers ──────────────────────────────────────────────────────────
function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin') || '';
  // Configure via CORS_ORIGINS env var (comma-separated)
  const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  // Strict allow-list only — no wildcard matching
  const allowOrigin = allowedOrigins.includes(origin)
    ? origin
    : '';
  return {
    'Access-Control-Allow-Origin': allowOrigin || 'null',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResp(data: any, status: number, extraHeaders: Record<string, string> = {}): NextResponse {
  return NextResponse.json(data, { status, headers: extraHeaders });
}

// ─── OPTIONS — CORS preflight ──────────────────────────────────────────────
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200, headers: corsHeaders(request) });
}

// ─── GET — manifest + chunk reads (the critical path for OSM data loading) ─
export async function GET(request: NextRequest) {
  const cors = corsHeaders(request);
  const url = request.nextUrl;
  const id = String(url.searchParams.get('id') || '').replace(/[^a-z0-9_-]/gi, '');

  if (!id) return jsonResp({ ok: false }, 400, cors);
  if (id === 'ping') return jsonResp({ ok: true, ts: Date.now() }, 200, cors);

  // Health endpoint — public, returns only boolean connectivity (no infra details)
  if (id === 'health') {
    const kvUrl = process.env.KV_REST_API_URL || process.env.KV_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN;
    if (!kvUrl || !kvToken) {
      return jsonResp({ ok: false, kvConnected: false }, 200, cors);
    }
    try {
      const resp = await fetch(`${kvUrl}/get/osm:v1:mena:chunks`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: 'no-store',
      });
      return jsonResp({ ok: resp.ok, kvConnected: resp.ok }, 200, cors);
    } catch {
      return jsonResp({ ok: false, kvConnected: false }, 200, cors);
    }
  }

  // Diagnostic endpoint — requires ADMIN_SECRET to prevent info leakage
  if (id === 'diag') {
    const adminSecret = request.headers.get('authorization')?.replace('Bearer ', '') || '';
    const expectedSecret = process.env.ADMIN_SECRET || '';
    const isAdmin = adminSecret.length === expectedSecret.length && expectedSecret.length > 0 && timingSafeEqual(Buffer.from(adminSecret), Buffer.from(expectedSecret));
    if (!isAdmin) {
      return jsonResp({ error: 'Unauthorized' }, 403, cors);
    }
    const baseUrl = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    const altUrl = process.env.KV_URL;
    const altToken = process.env.KV_TOKEN;
    // Only return SET/MISSING status — never leak prefixes
    const envStatus: Record<string, any> = {
      KV_REST_API_URL: baseUrl ? 'SET' : 'MISSING',
      KV_REST_API_TOKEN: token ? 'SET' : 'MISSING',
      KV_URL: altUrl ? 'SET' : 'MISSING',
      KV_TOKEN: altToken ? 'SET' : 'MISSING',
      ADMIN_SECRET: process.env.ADMIN_SECRET ? 'SET' : 'MISSING',
    };

    let kvTest: Record<string, any> = {};
    const effectiveUrl = baseUrl || altUrl;
    const effectiveToken = token || altToken;

    if (effectiveUrl && effectiveToken) {
      try {
        const resp = await fetch(`${effectiveUrl}/get/osm:v1:mena:chunks`, {
          headers: { Authorization: `Bearer ${effectiveToken}` },
          cache: 'no-store',
        });
        kvTest.status = resp.status;
        kvTest.ok = resp.ok;
      } catch (err: any) {
        kvTest.error = 'KV fetch failed';
      }
    } else {
      kvTest.error = 'No KV credentials available';
    }

    return jsonResp({ ok: true, diag: true, env: envStatus, kvTest }, 200, cors);
  }

  const baseUrl = process.env.KV_REST_API_URL || process.env.KV_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN;

  if (!baseUrl || !token) {
    console.error('[osm-cache] KV env vars missing:', { hasUrl: !!baseUrl, hasToken: !!token });
    return jsonResp({ ok: false, error: 'cache-unavailable' }, 200, cors);
  }

  // After the guard, these are definitely strings — assign to const for type narrowing
  const kvUrl: string = baseUrl;
  const kvToken: string = token;

  // kvGet closure — identical logic to v6, with no-store to prevent Next.js fetch cache
  async function kvGet(key: string): Promise<any> {
    const response = await fetch(`${kvUrl}/get/${key}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`kv-get:${response.status}`);
    }
    const payload = await response.json();
    return payload.result;
  }

  try {
    const chunk = url.searchParams.get('c');

    if (chunk === null) {
      // ── Debug endpoint — requires ADMIN_SECRET (timing-safe) ────────────
      if (url.searchParams.get('debug') === '1') {
        const adminSecret = request.headers.get('authorization')?.replace('Bearer ', '') || '';
        const expectedSecret = process.env.ADMIN_SECRET || '';
        const isAdmin = adminSecret.length === expectedSecret.length && expectedSecret.length > 0 && timingSafeEqual(Buffer.from(adminSecret), Buffer.from(expectedSecret));
        if (!isAdmin) {
          return jsonResp({ error: 'Unauthorized' }, 403, cors);
        }
        const [rawChunks, rawDirect, rawChunk0] = await Promise.all([
          kvGet(cacheKey(`${id}:chunks`)).catch(() => null),
          kvGet(cacheKey(id)).catch(() => null),
          kvGet(cacheKey(`${id}:0`)).catch(() => null),
        ]);
        return jsonResp({
          ok: true, debug: true, region: id,
          chunksKey: { value: rawChunks, parsedCount: parseChunkCount(rawChunks) },
          directKey: { type: typeof rawDirect, size: typeof rawDirect === 'string' ? rawDirect.length : null, preview: String(rawDirect || '').substring(0, 300), parsedEls: parseEls(rawDirect).length },
          chunk0Key: { type: typeof rawChunk0, size: typeof rawChunk0 === 'string' ? rawChunk0.length : null, preview: String(rawChunk0 || '').substring(0, 300), parsedEls: parseEls(rawChunk0).length },
        }, 200, cors);
      }

      // ── Manifest request ──────────────────────────────────────────────────
      const manifest = await readManifest(id, kvGet);
      if (!manifest.count) {
        return jsonResp({ ok: false }, 200, { ...cors, 'Cache-Control': 'public, max-age=3600, s-maxage=3600' });
      }

      const response: any = {
        ok: true,
        chunks: manifest.count,
        storage: manifest.storage,
      };

      // Fetch chunk 0 inline with the manifest to save a round-trip
      let chunk0Els: any[] = [];
      if (manifest.discovered && manifest.discovered[0]) {
        chunk0Els = manifest.discovered[0];
      } else if (manifest.directEls && manifest.directEls.length) {
        chunk0Els = manifest.directEls;
      } else {
        try {
          chunk0Els = parseEls(await kvGet(cacheKey(`${id}:0`)));
          if (!chunk0Els.length && manifest.count === 1) {
            chunk0Els = parseEls(await kvGet(cacheKey(id)));
          }
        } catch {
          // Non-fatal: client will request chunk 0 separately
        }
      }

      if (chunk0Els.length) {
        response.els = chunk0Els;
      }

      return jsonResp(response, 200, { ...cors, 'Cache-Control': 'public, max-age=3600, s-maxage=3600' });
    }

    // ── Chunk request ───────────────────────────────────────────────────────
    const chunkIndex = Number.parseInt(String(chunk), 10);
    if (!Number.isInteger(chunkIndex) || chunkIndex < 0) {
      return jsonResp({ ok: false, els: [] }, 200, cors);
    }

    let els: any[] = [];

    // Primary: read the chunk key directly
    els = parseEls(await kvGet(cacheKey(`${id}:${chunkIndex}`)));

    // Fallback for single-chunk regions stored under the bare key
    if (!els.length && chunkIndex === 0) {
      els = parseEls(await kvGet(cacheKey(id)));
    }

    // Fallback: use readManifest to validate bounds and discover
    if (!els.length) {
      const manifest = await readManifest(id, kvGet);
      if (!manifest.count || chunkIndex >= manifest.count) {
        return jsonResp({ ok: false, els: [] }, 200, { ...cors, 'Cache-Control': 'public, max-age=86400, s-maxage=86400' });
      }
      if (manifest.discovered && manifest.discovered[chunkIndex]) {
        els = manifest.discovered[chunkIndex];
      } else if (manifest.count === 1) {
        els = manifest.directEls && manifest.directEls.length ? manifest.directEls : [];
        if (!els.length) els = parseEls(await kvGet(cacheKey(id)));
        if (!els.length) els = parseEls(await kvGet(cacheKey(`${id}:0`)));
      } else {
        els = parseEls(await kvGet(cacheKey(`${id}:${chunkIndex}`)));
        if (!els.length && chunkIndex === 0) els = parseEls(await kvGet(cacheKey(id)));
      }
    }

    return jsonResp({ ok: els.length > 0, els }, 200, { ...cors, 'Cache-Control': 'public, max-age=86400, s-maxage=86400' });
  } catch (error: any) {
    console.error('[osm-cache]', error?.message || error);
    return jsonResp({ ok: false, els: [] }, 200, cors);
  }
}

// ─── POST — admin write (authenticated via ADMIN_SECRET) ───────────────────
export async function POST(request: NextRequest) {
  const cors = corsHeaders(request);
  const url = request.nextUrl;
  const id = String(url.searchParams.get('id') || '').replace(/[^a-z0-9_-]/gi, '');

  if (!id) return jsonResp({ ok: false }, 400, cors);

  const secret = process.env.ADMIN_SECRET;
  if (!secret || typeof secret !== 'string' || secret.length < 32) {
    console.error('[osm-cache] ADMIN_SECRET not configured or too short - rejecting POST');
    return jsonResp({ ok: false, error: 'service-unavailable', message: 'Admin operations not configured' }, 503, cors);
  }

  const authHeader = request.headers.get('authorization') || '';
  const expectedAuth = `Bearer ${secret}`;
  const isAuth = authHeader.length === expectedAuth.length && timingSafeEqual(Buffer.from(authHeader), Buffer.from(expectedAuth));
  if (!isAuth) {
    console.warn('[osm-cache] Unauthorized POST attempt');
    return jsonResp({ ok: false, error: 'unauthorized' }, 401, cors);
  }

  const baseUrl = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!baseUrl || !token) {
    return jsonResp({ ok: false, error: 'cache-unavailable' }, 200, cors);
  }

  // After the guard above, TypeScript still sees these as possibly undefined.
  // Assign to const strings so the closures below type-check correctly.
  const kvUrl: string = baseUrl;
  const kvToken: string = token;

  async function kvGet(key: string): Promise<any> {
    const response = await fetch(`${kvUrl}/get/${key}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`kv-get:${response.status}`);
    const payload = await response.json();
    return payload.result;
  }

  async function kvSet(key: string, value: any): Promise<any> {
    const response = await fetch(kvUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', key, JSON.stringify(value), 'EX', String(TTL_SECONDS)]),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`kv-set:${response.status}`);
    return response.json();
  }

  async function saveToKV(regionId: string, els: any[]): Promise<boolean> {
    const slimmed = slim(els);
    if (!slimmed.length) return false;

    const chunks = splitIntoChunks(slimmed);

    if (chunks.length === 1) {
      await Promise.all([
        kvSet(cacheKey(regionId), chunks[0]),
        kvSet(cacheKey(`${regionId}:0`), chunks[0]),
      ]);
    } else {
      await Promise.all(
        chunks.map((chunk, index) => kvSet(cacheKey(`${regionId}:${index}`), chunk))
      );
    }

    await kvSet(cacheKey(`${regionId}:chunks`), chunks.length);
    return true;
  }

  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return jsonResp({ ok: false, error: 'invalid-request-body' }, 400, cors);
    }

    if (!body || !Array.isArray(body.els) || body.els.length === 0) {
      return jsonResp({ ok: false, error: 'invalid-request-body' }, 400, cors);
    }

    const requestEls = body.els;
    const cached = await saveToKV(id, requestEls);
    return jsonResp({ ok: true, cached, count: requestEls.length }, 200, { ...cors, 'Cache-Control': 'no-store' });
  } catch (error: any) {
    console.error('[osm-cache]', error?.message || error);
    return jsonResp({ ok: false, els: [] }, 200, cors);
  }
}
