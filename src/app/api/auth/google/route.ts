import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { createSessionToken, getSessionCookieOptions, SESSION_COOKIE_NAME } from '@/lib/session';
import { upsertUser } from '@/lib/user-store';

// ── Route segment config ─────────────────────────────────────────────────────
// MUST use Node.js runtime (NOT Edge) — google-auth-library requires Node crypto
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ── Rate limiter (in-memory, per-instance) ───────────────────────────────────
// 5 auth attempts per minute per IP — prevents brute-force token submission
const _rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

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
function _startCleanup() {
  if (_cleanupStarted) return;
  _cleanupStarted = true;
  if (typeof setInterval !== 'undefined') {
    setInterval(() => {
      const now = Date.now();
      for (const [ip, entry] of _rateLimitMap) {
        if (now > entry.resetAt) _rateLimitMap.delete(ip);
      }
    }, 300_000);
  }
}
_startCleanup();

// ── Origin validation ────────────────────────────────────────────────────────
function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  // No origin = same-origin request from our own pages (curl, server-to-server)
  if (!origin) return true;
  const host = request.headers.get('host');
  const forwardedHost = request.headers.get('x-forwarded-host');
  const effectiveHost = forwardedHost || host;
  if (!effectiveHost) return false;
  try {
    const originUrl = new URL(origin);
    return originUrl.host === effectiveHost;
  } catch {
    return false;
  }
}

// ── POST /api/auth/google ────────────────────────────────────────────────────
// Receives a Google ID token from the frontend, verifies it with Google,
// creates or updates the user record in KV, and sets a session cookie.
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  // Origin check — reject cross-origin requests
  if (!isValidOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Rate limit check
  if (!_checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait a minute and try again.' },
      { status: 429 }
    );
  }

  // Check GOOGLE_CLIENT_ID is configured
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error('[auth/google] GOOGLE_CLIENT_ID not configured');
    return NextResponse.json(
      { error: 'Authentication not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const credential = body?.credential;

    if (!credential || typeof credential !== 'string') {
      return NextResponse.json(
        { error: 'Missing credential.' },
        { status: 400 }
      );
    }

    // ── Verify the Google ID token ───────────────────────────────────────────
    // verifyIdToken checks: signature (via Google's public keys), iss, aud, exp
    const client = new OAuth2Client(clientId);
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId,
      });
    } catch (err) {
      console.warn('[auth/google] Token verification failed:', err instanceof Error ? err.message : err);
      return NextResponse.json(
        { error: 'Invalid Google token. Please try again.' },
        { status: 401 }
      );
    }

    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token payload.' },
        { status: 401 }
      );
    }

    // ── Validate required fields ─────────────────────────────────────────────
    if (!payload.sub || !payload.email) {
      return NextResponse.json(
        { error: 'Incomplete token payload.' },
        { status: 401 }
      );
    }

    // Check email is verified by Google
    if (!payload.email_verified) {
      return NextResponse.json(
        { error: 'Please verify your Google email before signing in.' },
        { status: 401 }
      );
    }

    // ── Upsert user in KV ────────────────────────────────────────────────────
    const googleData = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name || payload.email.split('@')[0],
      picture: payload.picture || '',
    };

    let user;
    try {
      user = await upsertUser(googleData);
    } catch (err) {
      console.error('[auth/google] User storage error:', err);
      return NextResponse.json(
        { error: 'Server error. Please try again.' },
        { status: 500 }
      );
    }

    // ── Create session JWT ───────────────────────────────────────────────────
    let sessionToken: string;
    try {
      sessionToken = await createSessionToken({
        sub: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
      });
    } catch (err) {
      console.error('[auth/google] Session creation error:', err);
      return NextResponse.json(
        { error: 'Server error. Please try again.' },
        { status: 500 }
      );
    }

    // ── Set session cookie and return user profile ───────────────────────────
    const response = NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });

    response.cookies.set(
      SESSION_COOKIE_NAME,
      sessionToken,
      getSessionCookieOptions()
    );

    return response;

  } catch (err) {
    console.error('[auth/google] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}

// ── OPTIONS — CORS preflight ─────────────────────────────────────────────────
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  const forwardedHost = request.headers.get('x-forwarded-host');
  const effectiveHost = forwardedHost || host;

  let allowOrigin = '';
  if (origin && effectiveHost) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host === effectiveHost) {
        allowOrigin = origin;
      }
    } catch {}
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin || 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
}
