import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, getSessionCookieOptions } from '@/lib/session';

// ── Route segment config ─────────────────────────────────────────────────────
export const dynamic = 'force-dynamic';

// ── POST /api/auth/signout ───────────────────────────────────────────────────
// Clears the session cookie. The frontend also calls
// google.accounts.id.disableAutoSelect() to prevent auto-sign-in on next visit.
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  // Clear the session cookie by setting it with maxAge: 0
  // We use the same options (httpOnly, secure, sameSite, path) so the browser
  // correctly identifies and deletes the existing cookie
  const cookieOptions = getSessionCookieOptions();
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    ...cookieOptions,
    maxAge: 0, // immediately expire
  });

  return response;
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
