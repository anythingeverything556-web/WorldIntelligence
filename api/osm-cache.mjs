// ─────────────────────────────────────────────────────────────────────────────
// /api/osm-cache — Standalone Vercel Serverless Function
// SELF-CONTAINED: No external imports. All logic inlined.
// This is the proven approach that worked in v6 — Next.js App Router routes
// were returning 404 on Vercel, but standalone api/ functions work reliably.
// ─────────────────────────────────────────────────────────────────────────────

import { timingSafeEqual } from 'node:crypto';

const TTL_SECONDS = 60 * 60 * 24 * 8;
const CHUNK_BYTES = 500 * 1024;
const KEY_PREFIX = 'osm:v1:';
const MAX_DISCOVER_CHUNKS = 64;

// ── Rate Limiter (inlined — no external imports) ───────────────────────────
const RL_WINDOW_MS = 60 * 1000;
const RL_MAX_REQUESTS = 60;
let rlMemoryStore = new Map();

async function rlGetKV() {
  const baseUrl = process.env.KV_REST_API_URL || process.env.KV_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN;
  if (!baseUrl || !token) return null;
  return {
    async get(key) {
      try {
        const r = await fetch(`${baseUrl}/get/${encodeURIComponent(key)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok) return null;
        const d = await r.json();
        return d.result;
      } catch { return null; }
    },
    async set(key, value, ttlSec) {
      try {
        const r = await fetch(baseUrl, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(['SET', key, JSON.stringify(value), 'EX', String(ttlSec)]),
        });
        return r.ok;
      } catch { return false; }
    },
  };
}

async function rateLimit(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'unknown';
  const now = Date.now();
  const key = `rate:${ip}`;
  try {
    const kv = await rlGetKV();
    if (kv) {
      let entry = null;
      try { const raw = await kv.get(key); entry = raw ? JSON.parse(raw) : null; } catch { entry = null; }
      if (!entry || now > entry.resetAt) {
        entry = { count: 1, resetAt: now + RL_WINDOW_MS };
        await kv.set(key, JSON.stringify(entry), Math.ceil(RL_WINDOW_MS / 1000));
        return false;
      }
      entry.count++;
      await kv.set(key, JSON.stringify(entry), Math.ceil((entry.resetAt - now) / 1000));
      if (entry.count > RL_MAX_REQUESTS) {
        res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1000));
        res.status(429).json({ ok: false, error: 'rate-limit-exceeded', message: 'Too many requests', retryAfter: Math.ceil((entry.resetAt - now) / 1000) });
        return true;
      }
      return false;
    } else {
      if (!rlMemoryStore.has(key)) { rlMemoryStore.set(key, { count: 1, resetAt: now + RL_WINDOW_MS }); return false; }
      const entry = rlMemoryStore.get(key);
      if (now > entry.resetAt) { rlMemoryStore.set(key, { count: 1, resetAt: now + RL_WINDOW_MS }); return false; }
      entry.count++;
      if (entry.count > RL_MAX_REQUESTS) {
        res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1000));
        res.status(429).json({ ok: false, error: 'rate-limit-exceeded', message: 'Too many requests' });
        return true;
      }
      return false;
    }
  } catch (e) {
    console.error('[rateLimit] Error:', e.message);
    return false;
  }
}

// ── Helper functions ────────────────────────────────────────────────────────

function cacheKey(id) { return KEY_PREFIX + id; }

function isFiniteCoord(value) { return typeof value === 'number' && Number.isFinite(value); }

function slim(els) {
  if (!Array.isArray(els)) return [];
  const out = [];
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    const hasDirect = isFiniteCoord(el.lat) && isFiniteCoord(el.lon);
    const hasCenter = el.center && isFiniteCoord(el.center.lat) && isFiniteCoord(el.center.lon);
    if (!hasDirect && !hasCenter) continue;
    const slimmed = { id: el.id, type: el.type };
    const tags = el.tags;
    if (tags && typeof tags === 'object') {
      const keys = Object.keys(tags);
      if (keys.length > 0) slimmed.tags = tags;
    }
    if (hasDirect) { slimmed.lat = el.lat; slimmed.lon = el.lon; }
    if (hasCenter) { slimmed.center = { lat: el.center.lat, lon: el.center.lon }; }
    out.push(slimmed);
  }
  return out;
}

function splitIntoChunks(items) {
  const chunks = [];
  let start = 0;
  while (start < items.length) {
    let end = start;
    const sampleSize = Math.min(10, items.length - start);
    let avgItemSize = 0;
    if (sampleSize > 0) {
      let sampleTotal = 0;
      for (let i = start; i < start + sampleSize; i++) { sampleTotal += JSON.stringify(items[i]).length + 1; }
      avgItemSize = sampleTotal / sampleSize;
    }
    const estimatedFit = Math.floor(CHUNK_BYTES / Math.max(avgItemSize, 100));
    end = Math.min(start + estimatedFit, items.length);
    let actualSize = 0;
    while (end > start) {
      actualSize = 0;
      for (let i = start; i < end; i++) { actualSize += JSON.stringify(items[i]).length + 1; }
      if (actualSize <= CHUNK_BYTES || end === start + 1) break;
      end--;
    }
    chunks.push(items.slice(start, end));
    start = end;
  }
  return chunks;
}

function safeJsonParse(raw) { try { return JSON.parse(raw); } catch { return null; } }

function unwrapValue(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === 'string') { const parsed = safeJsonParse(raw); return parsed === null ? raw : unwrapValue(parsed); }
  if (Array.isArray(raw)) {
    if (raw.length === 1) {
      const only = raw[0];
      if (typeof only === 'string') return unwrapValue(only);
      if (only && typeof only === 'object' && (only.result !== undefined || only.data !== undefined)) return unwrapValue(only);
      return raw;
    }
    if (raw.length >= 2 && typeof raw[1] === 'string' && /^(EX|PX|EXAT|PXAT|NX|XX|KEEPTTL|GET)$/i.test(raw[1])) return unwrapValue(raw[0]);
    return raw;
  }
  if (typeof raw === 'object') {
    if (raw.result !== undefined) return unwrapValue(raw.result);
    if (raw.data !== undefined) return unwrapValue(raw.data);
    if (Array.isArray(raw.elements) || Array.isArray(raw.els)) return raw;
  }
  return raw;
}

function parseChunkCount(raw) {
  const value = unwrapValue(raw);
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (Array.isArray(value) && value.length === 1) return parseChunkCount(value[0]);
  if (typeof value === 'string') { const parsed = Number.parseInt(value, 10); if (Number.isFinite(parsed)) return parsed; }
  return 0;
}

function parseEls(raw) {
  const value = unwrapValue(raw);
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value.filter((el) => (isFiniteCoord(el.lat) && isFiniteCoord(el.lon)) || (el.center && isFiniteCoord(el.center.lat) && isFiniteCoord(el.center.lon)));
  if (value && Array.isArray(value.elements)) return slim(value.elements);
  if (value && Array.isArray(value.els)) return value.els.filter((el) => (isFiniteCoord(el.lat) && isFiniteCoord(el.lon)) || (el.center && isFiniteCoord(el.center.lat) && isFiniteCoord(el.center.lon)));
  return [];
}

async function readManifest(regionId, kvGet) {
  const rawChunkCount = await kvGet(cacheKey(`${regionId}:chunks`));
  const chunkCount = parseChunkCount(rawChunkCount);
  if (chunkCount > 0) return { count: chunkCount, storage: chunkCount === 1 ? 'single' : 'chunked' };
  const directEls = parseEls(await kvGet(cacheKey(regionId)));
  if (directEls.length > 0) return { count: 1, storage: 'single', directEls };
  const discovered = [];
  for (let index = 0; index < MAX_DISCOVER_CHUNKS; index++) {
    const chunkEls = parseEls(await kvGet(cacheKey(`${regionId}:${index}`)));
    if (!chunkEls.length) break;
    discovered.push(chunkEls);
  }
  if (discovered.length > 0) return { count: discovered.length, storage: 'chunked', discovered };
  return { count: 0, storage: 'none' };
}

function setCacheHeaders(res, type) {
  if (type === 'chunk') res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  else if (type === 'manifest') res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  else if (type === 'write') res.setHeader('Cache-Control', 'no-store');
  else res.setHeader('Cache-Control', 'public, max-age=300');
}

// ── Main handler ────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS — configure via CORS_ORIGINS env var (comma-separated)
  const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const origin = req.headers.origin;
  // Strict allow-list only — no wildcard matching
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0] || 'null');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ ok: false });

  // Rate-limit only POST (admin) requests
  if (req.method === 'POST') {
    const isLimited = await rateLimit(req, res);
    if (isLimited) return;
  }

  const id = String(req.query.id || '').replace(/[^a-z0-9_-]/gi, '');
  if (!id) return res.status(400).json({ ok: false });
  if (id === 'ping') return res.status(200).json({ ok: true, ts: Date.now() });

  // ── Health endpoint — public, returns only boolean connectivity (no infra details) ────
  if (id === 'health') {
    const kvUrl = process.env.KV_REST_API_URL || process.env.KV_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN;
    if (!kvUrl || !kvToken) {
      return res.status(200).json({ ok: false, kvConnected: false });
    }
    try {
      const resp = await fetch(`${kvUrl}/get/osm:v1:mena:chunks`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      return res.status(200).json({ ok: resp.ok, kvConnected: resp.ok });
    } catch {
      return res.status(200).json({ ok: false, kvConnected: false });
    }
  }

  // ── Diagnostic endpoint — requires ADMIN_SECRET (timing-safe) ────────────
  if (id === 'diag') {
    const adminSecret = req.headers.authorization?.replace('Bearer ', '') || '';
    const expectedSecret = process.env.ADMIN_SECRET || '';
    const isAdmin = adminSecret.length === expectedSecret.length && expectedSecret.length > 0 && timingSafeEqual(Buffer.from(adminSecret), Buffer.from(expectedSecret));
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const baseUrl = process.env.KV_REST_API_URL || process.env.KV_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN;
    const altUrl = process.env.KV_URL;
    const altToken = process.env.KV_TOKEN;
    // Only return SET/MISSING — never leak prefixes
    const envStatus = {
      KV_REST_API_URL: baseUrl ? 'SET' : 'MISSING',
      KV_REST_API_TOKEN: token ? 'SET' : 'MISSING',
      KV_URL: altUrl ? 'SET' : 'MISSING',
      KV_TOKEN: altToken ? 'SET' : 'MISSING',
      ADMIN_SECRET: process.env.ADMIN_SECRET ? 'SET' : 'MISSING',
    };
    let kvTest = {};
    const effectiveUrl = baseUrl || altUrl;
    const effectiveToken = token || altToken;
    if (effectiveUrl && effectiveToken) {
      try {
        const resp = await fetch(`${effectiveUrl}/get/osm:v1:mena:chunks`, {
          headers: { Authorization: `Bearer ${effectiveToken}` },
        });
        kvTest.status = resp.status;
        kvTest.ok = resp.ok;
      } catch (err) { kvTest.error = 'KV fetch failed'; }
    } else {
      kvTest.error = 'No KV credentials available';
    }
    return res.status(200).json({ ok: true, diag: true, env: envStatus, kvTest });
  }

  // CRITICAL FIX: Fall back to KV_URL/KV_TOKEN (Vercel KV may use either naming convention)
  const baseUrl = process.env.KV_REST_API_URL || process.env.KV_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN;

  if (!baseUrl || !token) {
    console.error('[osm-cache] KV env vars missing:', { hasRestUrl: !!process.env.KV_REST_API_URL, hasRestToken: !!process.env.KV_REST_API_TOKEN, hasKvUrl: !!process.env.KV_URL, hasKvToken: !!process.env.KV_TOKEN });
    return res.status(200).json({ ok: false, error: 'cache-unavailable' });
  }

  async function kvGet(key) {
    const response = await fetch(`${baseUrl}/get/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`kv-get:${response.status}`);
    const payload = await response.json();
    return payload.result;
  }

  async function kvSet(key, value) {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['SET', key, JSON.stringify(value), 'EX', String(TTL_SECONDS)]),
    });
    if (!response.ok) throw new Error(`kv-set:${response.status}`);
    return response.json();
  }

  async function saveToKV(regionId, els) {
    const slimmed = slim(els);
    if (!slimmed.length) return false;
    const chunks = splitIntoChunks(slimmed);
    if (chunks.length === 1) {
      await Promise.all([kvSet(cacheKey(regionId), chunks[0]), kvSet(cacheKey(`${regionId}:0`), chunks[0])]);
    } else {
      await Promise.all(chunks.map((chunk, index) => kvSet(cacheKey(`${regionId}:${index}`), chunk)));
    }
    await kvSet(cacheKey(`${regionId}:chunks`), chunks.length);
    return true;
  }

  try {
    // Handle POST requests - MUST be authenticated
    if (req.method === 'POST') {
      const authHeader = req.headers['authorization'] || '';
      const secret = process.env.ADMIN_SECRET;
      if (!secret || typeof secret !== 'string' || secret.length < 32) {
        console.error('[osm-cache] ADMIN_SECRET not configured or too short - rejecting POST');
        return res.status(503).json({ ok: false, error: 'service-unavailable', message: 'Admin operations not configured' });
      }
      const expectedAuth = `Bearer ${secret}`;
      const isAuth = authHeader.length === expectedAuth.length && timingSafeEqual(Buffer.from(authHeader), Buffer.from(expectedAuth));
      if (!isAuth) {
        console.warn('[osm-cache] Unauthorized POST attempt');
        return res.status(401).json({ ok: false, error: 'unauthorized' });
      }
      if (!req.body || !Array.isArray(req.body.els) || req.body.els.length === 0) {
        return res.status(400).json({ ok: false, error: 'invalid-request-body' });
      }
      setCacheHeaders(res, 'write');
      const requestEls = req.body.els;
      const cached = await saveToKV(id, requestEls);
      return res.status(200).json({ ok: true, cached, count: requestEls.length });
    }

    const chunk = req.query.c;
    if (chunk === undefined) {
      // ── Debug endpoint — requires ADMIN_SECRET (timing-safe) ────────────
      if (req.query.debug === '1') {
        const adminSecret = req.headers.authorization?.replace('Bearer ', '') || '';
        const expectedSecret = process.env.ADMIN_SECRET || '';
        const isAdmin = adminSecret.length === expectedSecret.length && expectedSecret.length > 0 && timingSafeEqual(Buffer.from(adminSecret), Buffer.from(expectedSecret));
        if (!isAdmin) {
          return res.status(403).json({ error: 'Unauthorized' });
        }
        const [rawChunks, rawDirect, rawChunk0] = await Promise.all([
          kvGet(cacheKey(`${id}:chunks`)).catch(() => null),
          kvGet(cacheKey(id)).catch(() => null),
          kvGet(cacheKey(`${id}:0`)).catch(() => null),
        ]);
        return res.status(200).json({
          ok: true, debug: true, region: id,
          chunksKey: { value: rawChunks, parsedCount: parseChunkCount(rawChunks) },
          directKey: { type: typeof rawDirect, size: typeof rawDirect === 'string' ? rawDirect.length : null, preview: String(rawDirect || '').substring(0, 300), parsedEls: parseEls(rawDirect).length },
          chunk0Key: { type: typeof rawChunk0, size: typeof rawChunk0 === 'string' ? rawChunk0.length : null, preview: String(rawChunk0 || '').substring(0, 300), parsedEls: parseEls(rawChunk0).length },
        });
      }

      // Manifest request
      const manifest = await readManifest(id, kvGet);
      if (!manifest.count) {
        setCacheHeaders(res, 'manifest');
        return res.status(200).json({ ok: false });
      }

      const response = { ok: true, chunks: manifest.count, storage: manifest.storage };

      // Fetch chunk 0 inline with manifest
      let chunk0Els = [];
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
        } catch { /* Non-fatal */ }
      }

      if (chunk0Els.length) response.els = chunk0Els;

      setCacheHeaders(res, 'manifest');
      return res.status(200).json(response);
    }

    // Chunk request
    const chunkIndex = Number.parseInt(String(chunk), 10);
    if (!Number.isInteger(chunkIndex) || chunkIndex < 0) {
      return res.status(200).json({ ok: false, els: [] });
    }

    let els = [];
    els = parseEls(await kvGet(cacheKey(`${id}:${chunkIndex}`)));
    if (!els.length && chunkIndex === 0) els = parseEls(await kvGet(cacheKey(id)));

    if (!els.length) {
      const manifest = await readManifest(id, kvGet);
      if (!manifest.count || chunkIndex >= manifest.count) {
        setCacheHeaders(res, 'chunk');
        return res.status(200).json({ ok: false, els: [] });
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

    setCacheHeaders(res, 'chunk');
    return res.status(200).json({ ok: els.length > 0, els });
  } catch (error) {
    console.error('[osm-cache]', error?.message || error);
    return res.status(200).json({ ok: false, els: [] });
  }
}
