// src/app/api/user/data/route.ts — User data CRUD with auth + rate limiting
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/session';
import { getUserData, getAllUserData, setUserData, isValidDataType, MAX_DATA_SIZE } from '@/lib/user-data-store';

export const dynamic = 'force-dynamic';

// ── Rate limiter (in-memory, per-instance) ───────────────────────────────────
// 30 requests per minute per IP — prevents KV quota exhaustion
const _rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

function _checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = _rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    _rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX;
}

// Periodic cleanup
let _cleanupStarted = false;
if (!_cleanupStarted && typeof setInterval !== 'undefined') {
  _cleanupStarted = true;
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of _rateLimitMap) {
      if (now > entry.resetAt) _rateLimitMap.delete(ip);
    }
  }, 300_000);
}

async function authenticate(request: NextRequest): Promise<{ sub: string } | NextResponse> {
  const c = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!c) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  const p = await verifySessionToken(c);
  if (!p) return NextResponse.json({ error: 'Session expired.' }, { status: 401 });
  return { sub: p.sub };
}

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!_checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429, headers: { 'Retry-After': '60' } });
  }
  const auth = await authenticate(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const type = new URL(request.url).searchParams.get('type');
    if (type) {
      if (!isValidDataType(type)) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
      return NextResponse.json({ data: await getUserData(auth.sub, type) });
    }
    return NextResponse.json({ data: await getAllUserData(auth.sub) });
  } catch { return NextResponse.json({ error: 'Failed to load data.' }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!_checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429, headers: { 'Retry-After': '60' } });
  }
  const auth = await authenticate(request);
  if (auth instanceof NextResponse) return auth;
  // Reject oversized payloads before parsing
  const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
  if (contentLength > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }
  try {
    const { type, data } = await request.json();
    if (!type || !isValidDataType(type)) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    if (data === undefined) return NextResponse.json({ error: 'Data required' }, { status: 400 });
    await setUserData(auth.sub, type, data);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg.includes('too large') ? msg : 'Failed to save' }, { status: msg.includes('too large') ? 413 : 500 });
  }
}
