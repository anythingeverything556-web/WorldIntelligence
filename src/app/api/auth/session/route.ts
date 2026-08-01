import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, createSessionToken, getSessionCookieOptions, SESSION_COOKIE_NAME } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return NextResponse.json({ user: null });
  const payload = await verifySessionToken(sessionCookie);
  if (!payload) return NextResponse.json({ user: null });

  let response = NextResponse.json({ user: { name: payload.name, email: payload.email, picture: payload.picture } });

  // Sliding renewal: if session is older than half its lifetime, issue fresh token
  if (payload.iat && payload.exp) {
    const now = Math.floor(Date.now() / 1000);
    const sessionAge = now - payload.iat;
    const halfLife = (payload.exp - payload.iat) / 2;
    if (sessionAge > halfLife) {
      try {
        const newToken = await createSessionToken({ sub: payload.sub, email: payload.email, name: payload.name, picture: payload.picture });
        response.cookies.set(SESSION_COOKIE_NAME, newToken, getSessionCookieOptions());
      } catch (err) {
        console.warn('[auth/session] Sliding renewal failed:', err);
      }
    }
  }

  return response;
}
